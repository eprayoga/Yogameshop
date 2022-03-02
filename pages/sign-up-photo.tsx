import Image from "next/image";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { setLogin, setSignUp } from "../services/auth";
import { getGameCategory } from "../services/player";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { CategoryTypes } from "../services/data-types";
import Cookies from "js-cookie";

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState("");
  const [image, setImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [localForm, setLocalForm] = useState({
    name: "",
    email: "",
  });
  const [uploaded, setUploaded] = useState(0);
  const router = useRouter();

  const getGameCategoryAPI = useCallback(async () => {
    const data = await getGameCategory();

    setCategories(data);
    setFavorite(data[0]._id);
  }, [getGameCategory]);

  useEffect(() => {
    getGameCategoryAPI();
  }, []);

  useEffect(() => {
    const getLocalForm = localStorage.getItem("user-form");
    setLocalForm(JSON.parse(getLocalForm!));
  }, []);

  const onSubmit = async () => {
    const uploadInterval = setInterval(() => {
      let uploadedProgress = localStorage.getItem("upload-progress");
      setUploaded(parseInt(uploadedProgress!));
    }, 500);
    const getLocalForm = await localStorage.getItem("user-form");
    const form = JSON.parse(getLocalForm!);
    const data = new FormData();

    data.append("image", image);
    data.append("email", form.email);
    data.append("name", form.name);
    data.append("password", form.password);
    data.append("username", form.name);
    data.append("phoneNumber", form.phoneNumber);
    data.append("role", "user");
    data.append("status", "Y");
    data.append("favorite", favorite);

    const result = await setSignUp(data);
    if (result.error) {
      clearInterval(uploadInterval);
      toast.error(result?.message);
      router.push("/sign-up");
    } else {
      clearInterval(uploadInterval);
      const dataLogin = {
        email: form.email,
        password: form.password,
      };
      toast.success("Register Berhasil");
      const response = await setLogin(dataLogin);
      if (response.error) {
        toast.error(response.message);
      } else {
        const token = response.data.token;
        const tokenBase64 = btoa(token);
        Cookies.set("token", tokenBase64, { expires: 2 });
        router.push("/sign-up-success");
        localStorage.removeItem("user-form");
      }
    }
  };
  return (
    <>
      <Head>
        <title>Sign Up - Yogameshop</title>
        <meta
          name="description"
          content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati"
        />
      </Head>
      <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
        <div className="container mx-auto">
          <form action="">
            <div className="form-input d-md-block d-flex flex-column">
              <div>
                <div className="mb-20">
                  <div className="image-upload text-center">
                    <label htmlFor="avatar">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          className="img-upload"
                          alt="upload"
                        />
                      ) : (
                        <Image
                          src="/icon/upload.svg"
                          width={120}
                          height={120}
                          alt="upload"
                        />
                      )}
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      onChange={(event) => {
                        const img = event.target.files![0];
                        setImagePreview(URL.createObjectURL(img));
                        return setImage(img);
                      }}
                    />
                  </div>
                </div>
                <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                  {localForm.name}
                </h2>
                <p className="text-lg text-center color-palette-1 m-0">
                  {localForm.email}
                </p>
                <div className="pt-50 pb-50">
                  <label
                    htmlFor="category"
                    className="form-label text-lg fw-medium color-palette-1 mb-10"
                  >
                    Favorite Game
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select d-block w-100 rounded-pill text-lg"
                    aria-label="Favorite Game"
                    value={favorite}
                    onChange={(event) => setFavorite(event.target.value)}
                  >
                    {categories.map((category: CategoryTypes) => (
                      <option key={category._id} value={category._id} selected>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="button-group d-flex flex-column mx-auto">
                <button
                  type="button"
                  className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                  onClick={onSubmit}
                >
                  Create My Account
                </button>
                <a
                  className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                  href="#"
                  role="button"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
      {uploaded > 0 ? (
        <div className="progress fixed-top">
          <div
            className={
              uploaded === 100
                ? "progress-bar progress-bar-striped progress-bar-animated bg-success"
                : "progress-bar progress-bar-striped progress-bar-animated"
            }
            role="progressbar"
            style={{ width: `${uploaded}%` }}
            aria-valuenow={uploaded}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {uploaded}%
          </div>
        </div>
      ) : (
        <div></div>
      )}
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
