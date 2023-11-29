import React, { Fragment, useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  _dialog: {
    "& .MuiPaper-root": {
      backgroundColor: '#525252', borderRadius: '0px', color: 'white',
      fontFamily: 'roboto !important',

    }
  }
});
const defaultOptions = {
  description: "",
  confirmationText: "Yes",
  cancellationText: "No",
  dialogProps: {},
  onClose: () => { },
  onCancel: () => { },
};

const withConfirm = (WrappedComponent) => (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [onConfirm, setOnConfirm] = useState(null);
  const [options, setOptions] = useState(defaultOptions);
  const {
    description,
    confirmationText,
    cancellationText,
    dialogProps,
    onClose,
    onCancel,
  } = options;

  const handleClose = useCallback(() => {
    onClose();
    setOnConfirm(null);
  }, [onClose]);

  const handleCancel = useCallback(() => {
    onCancel();
    handleClose();
  }, [onCancel, handleClose]);

  const handleConfirm = useCallback(
    (...args) => {
      onConfirm(...args);
      handleClose();
    },
    [onConfirm, handleClose]
  );

  function confirm(onConfirm, options = {}) {
    setOnConfirm(() => onConfirm);
    setOptions({ ...defaultOptions, ...options });
  }

  return (
    <Fragment>
      <WrappedComponent {...props} confirm={confirm} />
      <Dialog
        className={classes._dialog}
        fullWidth
        {...dialogProps}
        open={!!onConfirm}
        onClose={handleCancel}
      >
        <DialogTitle><Typography>{t("Confirm")}</Typography></DialogTitle>
        {description && (
          <DialogContent>
            <Typography component="p"
              style={{ fontSize: "18px", color: "white", margin: 0, fontFamily: 'roboto !important' }}
              dangerouslySetInnerHTML={{ __html: t(description) }}
            />
          </DialogContent>
        )}

        <DialogActions>
          <Button style={{ color: "#6F9CEB", fontFamily: 'roboto !important' }} onClick={handleCancel}>
            {t(cancellationText)}
          </Button>
          <Button
            style={{ color: "#6F9CEB", fontFamily: 'roboto !important' }}
            color="secondary"
            className="anti-bootstrap-button"
            onClick={handleConfirm}
            autoFocus={true}
          >
            {t(confirmationText)}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default withConfirm;
