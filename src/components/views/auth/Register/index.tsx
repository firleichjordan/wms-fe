import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import { authServices } from "@/services/auth";
import { useRouter } from "next/router";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };

    // console.log(data);

    const result = await authServices.registerAccount(data);

    if (result.status == 200) {
      setIsLoading(false);
      form.reset();
      push("/auth/login");
    } else {
      setIsLoading(false);
      setIsError("User register failed");
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="have an account? Sign in "
    >
      <form onSubmit={handleSubmit}>
        <Input label="Username" name="username" type="text" />
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit" className={styles.register__button}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
