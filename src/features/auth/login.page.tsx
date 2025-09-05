import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { LoginForm } from "./ui/login-form";

function LoginPage() {
  return (
    <AuthLayout
      title="Login"
      description="Input email and password"
      form={<LoginForm />}
      footerText={
        <>
          No account? <Link to={ROUTES.REGISTER}>Register</Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
