import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PATHS } from 'util/appConstants';
import { addCustomer } from 'redux/slices/customerSlice';
import { getTours, selectTours, selectTourStatus } from 'redux/slices/tourSlice';
import CustomerForm from 'components/Customers/form';
import Navbar from 'components/Navbar';
import CustomersNavbar from 'components/Masterbar/CustomersBar';
import LightLayout from 'components/Shared/LightLayout';

const currentAction = "ADD";
const AddCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectTourStatus);
  const tours = useSelector(selectTours);

  useEffect(() => {
    if (!tours.length && !loading) {
      dispatch(getTours());
    }
  }, [dispatch, tours]);

  const onSubmit = async (payload) => {
    await dispatch(addCustomer(payload)).then((res) =>
      res !== undefined ? history.push(PATHS.customers.root) : ""
    );
  };

  return (
    <>
      <Navbar />
      <CustomersNavbar />
      <LightLayout doublebar>
        <CustomerForm
          action={currentAction}
          onSubmit={onSubmit}
          tourList={tours}
        />
      </LightLayout>
    </>
  );
};

export default AddCustomer;
