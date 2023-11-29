import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { PATHS } from 'util/appConstants';
import {
  selectTour,
  selectTourStatus,
  getTour,
  editTour,
} from 'redux/slices/tourSlice';
import TourForm from 'components/Tours/form';
import Navbar from 'components/Navbar';
import LightLayout from 'components/Shared/LightLayout';
import CustomersNavbar from 'components/Masterbar/CustomersBar';

const currentAction = 'EDIT';

const EditTour = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const loading = useSelector(selectTourStatus);
  const tour = useSelector(selectTour);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (payload) => {
    await dispatch(editTour(id, payload));

    history.push(PATHS.tours.root);
  };

  return (
    <>
      <Navbar />
      <CustomersNavbar />
      <LightLayout doublebar loading={loading || !tour}>
        <TourForm
          initialValues={tour}
          onSubmit={onSubmit}
          action={currentAction}
        />
      </LightLayout>
    </>

  );
};

export default EditTour;
