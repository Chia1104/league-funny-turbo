import { type NextPage } from "next";
import { LoginModel } from "@/components";

const LoginPage: NextPage = () => {
  return <LoginModel isOpen={true} activityModal={() => null} />;
};

export default LoginPage;
