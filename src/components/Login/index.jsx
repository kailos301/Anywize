import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import BackgroundImage from "../../assets/img/video.mp4";
import Logo from "../../assets/img/logo.png";
import Form from "./form";

const styles = makeStyles((theme) => ({
  logo: {
    height: "48px",
    width: "243px",
    marginBottom: "46px",
  },
  video: {
    position: "fixed",
    right: 0,
    bottom: 0,
    minWidth: "100%",
    minHeight: "100%",
    zIndex: "-1",
  },
  grid: {
    height: "100%",
    width: "100%",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    maxWidth: "242px",
    minWidth: "242px",
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));

const LoginIndex = ({ onSubmit, error }) => {
  const classes = styles();
  const { t } = useTranslation();

  return (
    <Box height="100vh">
      <video autoPlay muted loop className={classes.video}>
        <source src={BackgroundImage} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <Grid
        container
        spacing={2}
        className={classes.grid}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          className={classes.gridContainer}
        >
          <Box textAlign="center" className={classes.container}>
            <img src={Logo} alt="logo" className={classes.logo} />
            <Box mt={2} p={2} className={classes.container}>
              <Form onSubmit={onSubmit} />
              {!!error && <Alert severity="error">{t(error)}</Alert>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

LoginIndex.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default LoginIndex;
