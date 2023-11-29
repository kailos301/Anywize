import React from "react";
import { action } from "@storybook/addon-actions";
import LoginFormComponent from "../form";
import LoginComponent from "../index";

export default {
  title: "Login components",
};

export const LoginForm = () => (
  <LoginFormComponent onSubmit={action("submit")} />
);
export const LoginFormContainer = () => (
  <LoginComponent onSubmit={action("submit 2")} />
);
export const LoginFormContainerWithError = () => (
  <LoginComponent onSubmit={action("submit 2")} error="Invalid account" />
);
