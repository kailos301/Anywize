import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, Password } from "../Shared/mui-formik-inputs";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({

  formInput: {
    background: "rgba(150, 147, 147, 0.1)",
    borderRadius: "0px",
    height: "32px",
    color: "#FFFFFF",
    marginBottom: "15px",
    "& .MuiOutlinedInput-root": {
      borderRadius: '0px'
    }
  },
  loginButton: {
    background: "#6F9CEB",
    borderRadius: "0px",
    color: "#FFFFFF",
    fontSize: "14px",
    height: "32px",
    width: "100%",
    textTransform: "capitalize",
    border: "4px solid #6F9CEB",
    "&:hover, &:focus": {
      background: "#6F9CEB",
    },
  },
  input: {
    color: "#FFFFFF",
    height: "32px",
  },
  placeholder: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#FFFFFF",
      opacity: 1,
    },
  },
}));

const LoginForm = ({ onSubmit }) => {
  const classes = styles();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required("Required"),
      password: yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await onSubmit(values);
      } catch (err) {
        console.log(err);
      }
      setSubmitting(false);
    },
  });

  const { handleSubmit, values, handleChange, handleBlur } = formik;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Input
        placeholder={t("E-mail address")}
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        // errors={errors}
        className={classes.formInput}
        variant={"outlined"}
        InputProps={{
          className: classes.input,
          classes: { input: classes.placeholder },
        }}
      />
      <Password
        placeholder={t("Password")}
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        // errors={errors}
        className={classes.formInput}
        variant={"outlined"}
        InputProps={{
          className: classes.input,
          classes: { input: classes.placeholder },
        }}
        inputProps={{
          autoComplete: "new-password",
          form: {
            autoComplete: "off",
          },
        }}
      />
      <Box py={2}>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          className={classes.loginButton}
        >
          {t("Log in")}
        </Button>
      </Box>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
