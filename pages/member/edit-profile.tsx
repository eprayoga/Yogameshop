import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/atoms/Input";
import SideBar from "../../components/organisms/SideBar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import { updateProfile } from "../../services/member";

interface UserStateTypes {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: any;
}
export default function EditProfile() {
  const [user, setUser] = useState<UserStateTypes>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  });
  const [imagePreview, setImagePreview] = useState("/");
  const [uploaded, setUploaded] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      const IMG = process.env.NEXT_PUBLIC_IMG;
      userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
      setUser(userFromPayload);
    }
  }, []);

  const onSubmit = async () => {
    const uploadInterval = setInterval(() => {
      let uploadedProgress = localStorage.getItem("upload-progress");
      setUploaded(parseInt(uploadedProgress!));
    }, 500);
    toast.info("Sedang mengupdate perubahan, silahkan tunggu beberapa saat!");
    const data = new FormData();

    data.append("image", user.avatar);
    data.append("name", user.name);
    data.append("phoneNumber", user.phoneNumber);
    const response = await updateProfile(data, user.id);
    if (response.error) {
      clearInterval(uploadInterval);
      toast.error(response.message);
    } else {
      clearInterval(uploadInterval);
      Cookies.remove("token");
      toast.success("Edit profile berhasil, silahkan login kembali");
      router.push("/sign-in");
    }
  };
  return (
    <section className="edit-profile overflow-auto">
      <SideBar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview === "/" ? (
                      <img
                        src={user.avatar}
                        alt="icon upload"
                        width={90}
                        height={90}
                        style={{ borderRadius: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        src={imagePreview}
                        alt="icon upload"
                        width={90}
                        height={90}
                        style={{ borderRadius: "100%", objectFit: "cover" }}
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
                      return setUser({
                        ...user,
                        avatar: img,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.name}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="pt-30">
                <Input label="Email Address" disabled value={user.email} />
              </div>
              <div className="pt-30">
                <Input
                  label="Phone"
                  value={user.phoneNumber}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      phoneNumber: event.target.value,
                    })
                  }
                />
              </div>
              {uploaded > 0 ? (
                <div className="progress mt-5">
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
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
