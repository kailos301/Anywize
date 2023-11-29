import React from 'react';
import { MASTER_DATA_BAR, MASTER_ADMIN_DATA_BAR } from 'constants/ui-constants';
import Masterbar from './Masterbar';
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/slices/userSlice";

export default () => {
  const user = useSelector(selectUser);
  console.log(user)
  const getMasterDataBar = () => {
    if (user && user.admin) {
      return {...MASTER_ADMIN_DATA_BAR}
    } else {
      return {...MASTER_DATA_BAR}
    }
  }
  return (<Masterbar {...getMasterDataBar()} />)
}
