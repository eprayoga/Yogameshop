import Head from "next/head";
import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent";
import {
  HistoryTransactionTypes,
  JWTPayloadTypes,
  UserTypes,
} from "../../../services/data-types";
import jwtDecode from "jwt-decode";
import { getTransactionDetail } from "../../../services/member";

interface TransactionsDetailProps {
  transactionDetail: HistoryTransactionTypes;
}
export default function TransactionsDetail(props: TransactionsDetailProps) {
  const { transactionDetail } = props;
  return (
    <>
      <Head>
        <title>Transaction Detail</title>
        <meta
          name="description"
          content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati"
        />
      </Head>
      <section className="transactions-detail overflow-auto">
        <TransactionDetailContent data={transactionDetail} />
      </section>
    </>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
  params: {
    idTrx: string;
  };
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { idTrx } = params;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const userFromPayload: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  const response = await getTransactionDetail(idTrx, jwtToken);
  return {
    props: {
      transactionDetail: response.data,
    },
  };
}
