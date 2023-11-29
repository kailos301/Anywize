import React from "react";
import { action } from "@storybook/addon-actions";
import NewForm from "../form";

export default {
  title: "Tour components",
};
export const Form = () => (
  <NewForm initialValues={{}} onSubmit={action("submit")} />
);
