import React from "react";
import {Grid, Typography, Box} from "@material-ui/core";
import * as pick from "lodash/pick";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {
  Input,
  Select,
  InputOnlyNumbers,
  Autocomplete,
} from "../Shared/mui-formik-inputs";
import {TextField} from "@material-ui/core";
import {OrderSchema} from "constants/validation-schemas";
import {OrderFormAllowedFields} from "constants/forms-submit-allowed-fields";
import {PATHS} from "util/appConstants";
import FormCancelSaveButton from "components/Shared/FormCancelSaveButtons";

const useStyles = makeStyles({
  _heading: {
    font: "normal normal normal 28px/40px Questrial",
    color: "#121212",
  },
  _icons: {
    color: "#ADADAD",
    fontSize: "35px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    margin: "0 16px 0 0px",
  },
  _save: {
    "&:hover": {
      transform: "scale(1.3)",
      color: "#6F9CEB",
    },
  },
  _close: {
    "&:hover": {
      transform: "scale(1.3)",
      color: "#525252",
    },
  },
  _subheading: {
    font: "normal normal 500 22px/32px Roboto",
    color: " #121212",
    marginTop: "44px",
  },
});

const OrderForm = ({initialValues, onSubmit, action, customerList}) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: OrderSchema,
    initialValues: {
      customer_id: "",
      description: "",
      number: "",
      packages: 0,
      departure: null,
      ...initialValues,
    },
    onSubmit: async (values, {setSubmitting}) => {
      try {
        onSubmit(pick(values, OrderFormAllowedFields));
      } catch (err) {
        setSubmitting(false);
      }
    },
  });
  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    setFieldValue,
    submitCount,
    isValid,
    isSubmitting,
  } = formik;
  let {handleBlur} = formik;

  if (!submitCount) {
    handleBlur = null;
  }

  const closeOrderHandler = () => {
    history.push(PATHS.orders.root);
  };

  return (
    <Box height="100%">
      <Box display="flex" mb={4}>
        <Box flex={2}>
          <Typography className={classes._heading} variant="h4">
            {action === "ADD" ? t("New Order") : t("Edit Order")}
          </Typography>
        </Box>
        <Box flex={2} textAlign="right" position="relative">
          <Box position="absolute" right={0}>
            <FormCancelSaveButton
              disabled={!isValid || isSubmitting}
              onCancel={closeOrderHandler}
              onSave={handleSubmit}
            />
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={5}>
          <Autocomplete
            onBlur={handleBlur}
            name="customer_id"
            label="Customer"
            errors={errors}
            value={values.customer_id}
            settings={{
              disableClearable: true,
              valueProp: "id",
              // labelProp: "alias",
              labelProp: (option) => `${option.alias} : ${option.name} ${option.street} ${option.zipcode} ${option.city} ${option.country}`,
              filterOptions: (options, state) => {
                return options.filter((option) =>
                  option.alias
                    .toLowerCase()
                    .trim()
                    .includes(state.inputValue.toLowerCase().trim()),
                )
              }
            }}
            onChange={(selected) => {
              setFieldValue("customer_id", selected.id);
            }}
            options={customerList}
            required
          />
        </Grid>
        {/*<Grid item xs={12} sm={6} md={4} lg={2}>*/}
        {/*  <Input*/}
        {/*    label={t("Description")}*/}
        {/*    name="description"*/}
        {/*    onChange={handleChange}*/}
        {/*    onBlur={handleBlur}*/}
        {/*    value={values.description}*/}
        {/*    errors={errors}*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <InputOnlyNumbers
            label={t("Order Number")}
            name="number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.number}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={1}>
          <InputOnlyNumbers
            label={t("Packages")}
            name="packages"
            positive={true}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.packages}
            errors={errors}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Select
            label={t("Departure")}
            name="departure"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.departure}
            errors={errors}
            options={["MORNING", "MIDDAY", "EVENING", "NIGHT"].map((o) => ({
              label: t(o),
              value: o,
            }))}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default OrderForm;
