import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { RegisterForm } from "./ui/register-form";

function RegisterPage() {
  return (
    <AuthLayout
      title="Registration"
      description="Input email and password"
      form={<RegisterForm />}
      footerText={
        <>
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
