import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { PATHS } from "util/appConstants";
import {
  selectCustomer,
  selectCustomerStatus,
  getCustomer,
  editCustomer,
} from "redux/slices/customerSlice";
import { getTours, selectTours } from "redux/slices/tourSlice";
import CustomerForm from "components/Customers/form";
import Navbar from 'components/Navbar';
import LightLayout from 'components/Shared/LightLayout';
import CustomersNavbar from 'components/Masterbar/CustomersBar';

const currentAction = "EDIT";

const EditCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const loading = useSelector(selectCustomerStatus);
  const customer = useSelector(selectCustomer);
  const tours = useSelector(selectTours);

  useEffect(() => {
    if (id && !loading) {
      dispatch(getCustomer(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!tours.length) {
      dispatch(getTours());
    }
  }, [dispatch, tours]);

  const onSubmit = async (payload) => {
    await dispatch(editCustomer(id, payload));

    history.push(PATHS.customers.detail.replace(':id', id));
  };

  return (
    <>
      <Navbar />
      <CustomersNavbar />
      <LightLayout doublebar loading={loading || !customer}>
        <CustomerForm
          initialValues={customer}
          onSubmit={onSubmit}
          action={currentAction}
          tourList={tours}
        />
      </LightLayout>
    </>
  );
};
export default EditCustomer;
