import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { sessionContext } from "@/context/AuthContext";
import { authServices } from "@/services/auth";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "./Login.module.scss";

const LoginView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginContext } = sessionContext();
  const { push } = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };
    try {
      const result = await authServices.signIn(data);
      // console.log(result);
      if (result.status == 200) {
        setLoading(false);
        loginContext(result.data.dataToken, result.data.userData);
        form.reset();
        if (result.data.userData.role == "warehouse") {
          push("/wh_access/products");
        } else {
          push("/production/products");
        }
      }
    } catch (error) {
      setLoading(false);
      setError("Email or password incorrect");
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? Sign up "
      error={error}
    >
      <form onSubmit={handleLogin}>
        <Input label="Email" name="email" type="text" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit" className={styles.login__button}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginView;
