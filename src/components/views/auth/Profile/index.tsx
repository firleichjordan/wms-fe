import { sessionContext } from "@/context/AuthContext";
import {
  getDetailUser,
  updateAvatar,
  updatePassword,
  updateUser,
  uploadAvatar,
} from "@/services/auth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const ProfileView = () => {
  const [user, setUser] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | any>("");
  const [dataProfile, setDataProfile] = useState<any>({});
  const { data } = sessionContext();
  const token = data.userToken?.accessToken;

  const detailUser = async () => {
    const result = await getDetailUser(token);
    setUser(result.data);
  };

  useEffect(() => {
    detailUser();
  }, []);

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // const file = e.target.files;
    const file = (e.target as HTMLInputElement).files;
    const test = file?.[0];
    setSelectedFile(test);
  };

  // console.log(selectedFile);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile) {
      const result = await uploadAvatar(
        token,
        selectedFile,
        (status: boolean, res: string) => {
          console.log(status);
          if (status) {
            alert("File uploaded successfully");
            window.location.reload();
          } else {
            alert("Failed to upload file");
          }
        }
      );
      // console.log(result);
      return result;
    } else {
      return null;
    }
  };

  const handleUpdateAvatar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      const result = await updateAvatar(token, selectedFile);
      if (result) {
        alert("Avatar updated successfully");
        window.location.reload();
      } else {
        alert("Failed to update avatar");
      }
    } else {
      alert("Please select an image");
    }
  };

  const handleChangeDataProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const dataForm = {
      username: form.username.value,
      email: form.email.value,
    };
    await updateUser(token, dataForm, (status: boolean, res: string) => {
      if (status) {
        setDataProfile({
          ...dataProfile,
          username: dataForm.username,
          email: dataForm.email,
        });
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    });
  };

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const dataForm = {
      password: form["old-password"].value,
      new_password: form["new-password"].value,
    };

    try {
      const result = await updatePassword(token, dataForm);
      if (result) {
        alert("Password updated successfully");
        form.reset();
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      alert("Something wrong");
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <h2>Your Profile</h2>

        <div className={styles.profile__data}>
          <div className={styles.profile__data__img}>
            <h2 className={styles.profile__data__img__title}>Avatar</h2>
            <form
              onSubmit={user.image ? handleUpdateAvatar : handleUpload}
              className={styles.profile__data__img__form}
            >
              <img
                src={user.image}
                alt="avatar"
                className={styles.profile__data__img__form__avatar}
                width={200}
                height={200}
              />
              <label
                htmlFor="upload-avatar"
                className={styles.profile__data__img__form__label}
              >
                {selectedFile ? (
                  <p>{selectedFile.name}</p>
                ) : (
                  <>
                    <p>
                      {user.image
                        ? "Change avatar & please re-login"
                        : "Upload avatar"}
                    </p>
                    <p>
                      maximum: <b>1 MB</b>
                    </p>
                  </>
                )}
              </label>
              <input
                type="file"
                id="upload-avatar"
                onChange={handleUploadFile}
                className={styles.profile__data__img__form__input}
              />
              <Button
                type="submit"
                className={styles.profile__data__img__form__btn}
              >
                Upload
              </Button>
            </form>
          </div>
          <div className={styles.profile__data__text}>
            <h2>Personal Information</h2>
            <form onSubmit={handleChangeDataProfile}>
              <Input
                label="Username"
                name="username"
                type="text"
                defaultValue={user.username}
              />
              <Input
                label="Email"
                name="email"
                type="text"
                defaultValue={user.email}
              />
              <Input
                label="Role"
                name="role"
                type="text"
                disable
                defaultValue={user.role}
              />
              <Button type="submit" className={styles.profile__data__text__btn}>
                Update
              </Button>
            </form>
          </div>

          <div className={styles.profile__data__password}>
            <h2>Change password</h2>
            <form onSubmit={handleUpdatePassword}>
              <Input
                name="old-password"
                label="Old Password"
                type="password"
                placeholder="Enter your current password"
              />
              <Input
                name="new-password"
                label="New Password"
                type="password"
                placeholder="Enter new password"
              />
              <Button type="submit">Change Password</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
