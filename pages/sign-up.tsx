import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import SignUpForm from "../components/organisms/SignUpForm";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up - Yogameshop</title>
        <meta
          name="description"
          content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati"
        />
      </Head>
      <section className="sign-up mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47">
        <div className="container mx-auto">
          <form action="">
            <div className="pb-50">
              <Link href="/">
                <a className="navbar-brand">
                  <Image
                    src="/icon/logo.svg"
                    width={60}
                    height={60}
                    alt="logo"
                  />
                </a>
              </Link>
            </div>
            <SignUpForm />
          </form>
        </div>
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
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (token) {
    return {
      redirect: {
        destination: "/member",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
