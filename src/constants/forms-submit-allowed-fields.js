export const TourFormAllowedFields = [
  'transport_agent_id',
  'name',
  'description',
  'active',
];

export const CustomerFormAllowedFields = [
  'number',
  'tour_id',
  'tour_position',
  'name',
  'alias',
  'street',
  'street_number',
  'city',
  'zipcode',
  'country',
  'email',
  'phone',
  'latitude',
  'longitude',
  'deposit_agreement',
  'keybox_code',
  'contact_name',
  'contact_surname',
  'contact_salutation',
  'email_notifications',
];

export const OrderFormAllowedFields = ['customer_id', 'description', 'number', 'departure', 'packages'];
