import * as yup from "yup";

export const TourSchema = yup.object().shape({
  transport_agent_id: yup.number().required('Required'),
  name: yup.string().required('Required'),
  description: yup.string().nullable(),
  active: yup.bool(),
});

export const CustomerSchema = yup.object().shape({
  tour_id: yup.string().required("Required"),
  tour_position: yup.string().required("Required"),
  name: yup.string().required("Required"),
  alias: yup.string().required("Required"),
  street: yup.string().required("Required"),
  street_number: yup.string().required("Required"),
  city: yup.string().required("Required"),
  zipcode: yup.string().required("Required"),
  country: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required").typeError('Required'),
  phone: yup.string().required("Required").typeError('Required'),
  latitude: yup.string().required("Required"),
  longitude: yup.string().required("Required"),
  deposit_agreement: yup.string().required('Required'),
  contact_salutation: yup.string().nullable(),
  contact_name: yup.string().nullable(),
  contact_surname: yup.string().nullable(),
  keybox_code: yup.mixed().when('deposit_agreement', {
    is: 'KEY_BOX',
    then: yup.string().required('Required'),
    otherwise: yup.string().nullable(),
  }),
});

export const OrderSchema = yup.object().shape({
  customer_id: yup.number().required('Required'),
  description: yup.string().nullable(),
  number: yup.string().nullable(),
});
