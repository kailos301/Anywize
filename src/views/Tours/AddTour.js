import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PATHS } from 'util/appConstants';
import { selectTourStatus, addTour } from 'redux/slices/tourSlice';
import { setShowMessage } from 'redux/slices/uiSlice';
import TourForm from 'components/Tours/form';
import Navbar from 'components/Navbar';
import LightLayout from 'components/Shared/LightLayout';
import CustomersNavbar from 'components/Masterbar/CustomersBar';

const currentAction = 'ADD';

const AddTour = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectTourStatus);

  const onSubmit = async (payload) => {
    await dispatch(addTour(payload));

    dispatch(
      setShowMessage({
        description: 'Tour created successfully',
        type: 'success',
      })
    );

    history.push(PATHS.tours.root);
  };

  return (
    <>
      <Navbar />
      <CustomersNavbar />
      <LightLayout doublebar loading={loading}>
        <TourForm
          onSubmit={onSubmit}
          action={currentAction}
        />
      </LightLayout>
    </>
  );
};

export default AddTour;
