import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PATHS } from "util/appConstants";
import { getCustomers, selectCustomers } from "redux/slices/customerSlice";
import { selectOrderStatus, addOrder } from "redux/slices/orderSlice";
import { setShowMessage } from "redux/slices/uiSlice";
import OrderForm from "components/Orders/form";
import LightLayout from 'components/Shared/LightLayout';
import Navbar from 'components/Navbar';

const currentAction = "ADD";

const AddOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectOrderStatus);
  const customers = useSelector(selectCustomers);

  useEffect(() => {
    console.log('customers->', customers)
    if (!customers.length) {
      dispatch(getCustomers());
    }
  }, [dispatch, customers]);

  const onSubmit = async (payload) => {
    await dispatch(addOrder(payload));

    dispatch(
      setShowMessage({
        description: "Order created successfully",
        type: "success",
      })
    );

    history.push(PATHS.orders.add);
  };

  return (
    <>
      <Navbar />
      <LightLayout loading={loading}>
        <OrderForm
          onSubmit={onSubmit}
          action={currentAction}
          customerList={customers}
        />
      </LightLayout>
    </>
  );
};

export default AddOrder;
