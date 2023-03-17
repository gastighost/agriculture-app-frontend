import { Fragment, useState } from "react";

import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const activateLogin = () => {
    setIsLogin(true);
  };

  const deactivateLogin = () => {
    setIsLogin(false);
  };

  return (
    <Fragment>
      {isLogin && <LoginForm deactivateLogin={deactivateLogin} />}
      {!isLogin && <SignupForm activateLogin={activateLogin} />}
    </Fragment>
  );
};

export default LoginPage;
