import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { PATHS } from "util/appConstants";
import {
  selectOrder,
  selectOrderStatus,
  getOrder,
  editOrder,
} from "redux/slices/orderSlice";
import { getCustomers, selectCustomers } from "redux/slices/customerSlice";
import OrderForm from "components/Orders/form";
import Navbar from 'components/Navbar';
import LightLayout from 'components/Shared/LightLayout';

const currentAction = "EDIT";

const EditOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const loading = useSelector(selectOrderStatus);
  const order = useSelector(selectOrder);
  const customers = useSelector(selectCustomers);

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id));
    }
  }, []);

  useEffect(() => {
    if (!customers.length) {
      dispatch(getCustomers());
    }
  }, [dispatch, customers]);

  const onSubmit = async (payload) => {
    await dispatch(editOrder(id, payload));

    history.push(PATHS.orders.root);
  };

  return (
    <>
      <Navbar />
      <LightLayout loading={loading || !order}>
        <OrderForm
          initialValues={order}
          onSubmit={onSubmit}
          action={currentAction}
          customerList={customers}
        />
      </LightLayout>
    </>
  );
};
export default EditOrder;
