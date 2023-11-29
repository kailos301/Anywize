import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import * as pick from "lodash/pick";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { Input } from "../Shared/mui-formik-inputs";
import { TourSchema } from "constants/validation-schemas";
import { TourFormAllowedFields } from "constants/forms-submit-allowed-fields";
import { PATHS } from "util/appConstants";
import FormCancelSaveButton from 'components/Shared/FormCancelSaveButtons';

const useStyles = makeStyles({
  _editbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  _heading: {
    font: "normal normal normal 28px/40px Questrial",
    color: "#121212",
  },
  _icons: {
    color: "#ADADAD",
    fontSize: '35px',
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    margin: '0 16px 0 0px',
  },
  _dflex: {
    display: "flex",
    alignItems: "center",
  },
  _save: {
    "&:hover": {
      transform: "scale(1.3)",
      color: "#6F9CEB",
    },
    "&:hover + span": {
      display: 'block',
    }
  },
  _close: {
    "&:hover": {
      transform: "scale(1.3)",
      color: "#525252",
    },
    "&:hover + span": {
      display: 'block',
    }
  },
  _subheading: {
    font: "normal normal 500 22px/32px Roboto",
    color: " #121212",
    marginTop: "44px",
  },
  _edittext: {
    // width: '24px',
    height: '16px',
    font: 'normal normal normal 14px / 20px Roboto',
    padding: '4px 8px'
  },
  _cancel: {
    color: '#525252',
    font: ' normal normal normal 14px/20px Roboto',
    display: 'none',
    position: 'absolute',
    marginLeft: '-55px',
    transition: "all 0.3s ease-in-out",
  },
  _savetext: {
    color: "#6F9CEB",
    font: ' normal normal normal 14px/20px Roboto',
    display: 'none',
    position: 'absolute',
    marginLeft: '35px',
    transition: "all 0.3s ease-in-out",
  }
});

const TourForm = ({ initialValues, onSubmit, action }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: TourSchema,
    initialValues: {
      name: '',
      description: '',
      transport_agent_id: 1,
      active: true,
      ...initialValues,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(pick(values, TourFormAllowedFields));
      } catch (err) {
        setSubmitting(false);
      }
    },
  });
  const { values, handleChange, errors, handleSubmit, submitCount, isValid, isSubmitting } = formik;
  let { handleBlur } = formik;

  if (!submitCount) {
    handleBlur = null;
  }

  const closeTourHandler = () => {
    action === "ADD"
      ? history.push(PATHS.tours.root)
      : history.push(PATHS.tours.detail.replace(":id", id));
  };

  return (
    <Box>
      <Box display="flex" mb={4}>
        <Box flex={2}>
          <Typography className={classes._heading} variant="h4">
            {action === "ADD" ? t("New Tour") : t("Edit Tour")}
          </Typography>
        </Box>
        <Box flex={2} textAlign="right" position="relative">
          <Box position="absolute" right={0}>
            <FormCancelSaveButton
              disabled={!isValid || isSubmitting}
              onCancel={closeTourHandler}
              onSave={handleSubmit}
            />
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("Tour Name")}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            errors={errors}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("Remark")}
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            errors={errors}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
TourForm.propTypes = {
  initialValues: PropTypes.shape({}),
  handleAddTour: PropTypes.func,
  // handleEditCompany: PropTypes.func,
};
export default TourForm;
