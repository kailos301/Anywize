import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginWithRedirect } from "redux/slices/authSlice";
import { PATHS } from "util/appConstants";

import { selectAuthenticated } from "redux/slices/authSlice";
import { setShowMessage } from "redux/slices/uiSlice";
import { fetchUserInfo } from "redux/slices/userSlice";
import LoginComponent from "components/Login";

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);

  const loginCallback = () => {
    dispatch(fetchUserInfo());
    history.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("token") && authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  const onSubmit = async (values) => {
    try {
      await dispatch(loginWithRedirect(values, loginCallback));
    } catch (err) {
      dispatch(
        setShowMessage({
          type: "error",
          description: t("Email or password incorrect"),
        })
      );
    }
  };

  return <LoginComponent onSubmit={onSubmit} />;
};

export default Login;
