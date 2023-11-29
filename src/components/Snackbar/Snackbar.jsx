import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Snackbar as MuiSnackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { selectMessage, setHideMessage } from "redux/slices/uiSlice";
import PropTypes from "prop-types";
import clsx from "clsx";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },

  },
  alert: {
    borderRadius: '0px',
  },
  alerterror: {
    backgroundColor: '#E30425'
  }
}));

const Snackbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const { description, type } = useSelector(selectMessage);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setHideMessage());
  };

  return (
    <div className={classes.root}>
      <MuiSnackbar
        open={type === "success"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert className={classes.alert} onClose={handleClose} severity="success">
          <div
            style={{ fontSize: "16px" }}
            dangerouslySetInnerHTML={{ __html: t(description) }}
          />
        </Alert>
      </MuiSnackbar>
      <MuiSnackbar
        open={type === "error"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert className={clsx(classes.alert, classes.alerterror)} onClose={handleClose} severity="error">
          <div
            style={{ fontSize: "16px" }}
            dangerouslySetInnerHTML={{ __html: t(description) }}
          />
        </Alert>
      </MuiSnackbar>
    </div>
  );
};

Snackbar.propTypes = {
  message: PropTypes.shape({
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default Snackbar;
