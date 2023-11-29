import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EmptyCircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import FilledCircleIcon from '@material-ui/icons/RadioButtonChecked';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import { ORDERS_TABLE_COLUMNS } from 'constants/ui-constants';
import { getColumns, getActions, getLocalization } from "util/table-utils";
import { mapTableData } from 'util/helpers';
import { PATHS } from 'util/appConstants';
import {
  selectOrders,
  selectOrderStatus,
  getOrders,
  deleteOrder,
  selectOrdersTimestamp,
} from 'redux/slices/orderSlice';
import { setShowMessage } from 'redux/slices/uiSlice';
import { createRoute } from 'redux/slices/routeSlice';
import { selectUser } from 'redux/slices/userSlice';
import withConfirm from 'components/dialogs/delete';
import DarkLayout from 'components/Shared/DarkLayout';
import Navbar from 'components/Navbar';
import pen from '../../assets/img/pen.svg';

const useStyles = makeStyles({
  _1F1F1F: {
    background: '#1F1F1F',
  },
  _525252: {
    background: '#525252',
  },
  _edit: {
    background: '#6F9CEB ',
    borderRadius: '50%',
    padding: '2px',
    width: '13px',
    height: '13px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  _pointer: {
    cursor: 'pointer'
  },
});

const tableTitle = 'ORDERS';

const OrderList = ({ confirm }) => {
  const tableRef = useRef();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const loading = useSelector(selectOrderStatus);
  const orders = useSelector(selectOrders);
  const timestamp = useSelector(selectOrdersTimestamp);
  const user = useSelector(selectUser);
  const [jsonData, setjsonData] = useState(orders);

  const fetchOrders = async () => {
    await dispatch(getOrders());
  };

  useEffect(() => {
    if (!orders.length && !loading && !timestamp) {
      fetchOrders();
    }

    setjsonData(orders);
  }, [orders, loading]);

  const callbackOnDelete = (e, order) => {
    e.stopPropagation();
    confirm(() => dispatch(deleteOrder(order.id)), {
      description: "Are you sure?",
    });
  };

  const actions = getActions(
    tableTitle,
    (e, rowData) => callbackOnDelete(e, rowData),
    () => addHandler(),
    (e, rowData) => editHandler(rowData),
    () => startTourCheck(),
    (v = null) => startTour(v),
    t,
    user
  );
  const addHandler = () => {
    history.push(PATHS.orders.add);
  };
  const editHandler = (rowData) => {
    history.push(PATHS.orders.edit.replace(':id', rowData.id));
  };

  const checkChangeHandler = (e, clickedRow) => {
    e.stopPropagation();
    console.log('aca', clickedRow);
    const newData = tableRef.current.state.data.map((row) => {
      if (row.id !== clickedRow.id) {
        return {
          ...row,
        };
      }

      return {
        ...row,
        mainCheck: e.target.checked,
        orders: row.orders.map((o) => ({
          ...o,
          checked: e.target.checked,
        })),
      };
    });

    setjsonData(newData)
  };

  const startTourCheck = () => {
    return !!jsonData.find((row) => {
      return row.orders.some((o) => o.checked);
    });
  };

  const startTour = async (type = null) => {
    if (!startTourCheck()) {
      return;
    }

    const rows = jsonData.filter((row) => {
      return row.orders.some((o) => o.checked);
    });

    confirm(async () => {
      let i = 0;

      while (i < rows.length) {
        await dispatch(createRoute({
          order_ids: rows[i].orders.filter((o) => o.checked).map((o) => o.id),
          tour_id: rows[i].Tour.id,
          type,
        }));

        i += 1;
      }

      dispatch(setShowMessage({
        description: 'The routes where created successfully',
        type: 'success',
      }));

      fetchOrders();
    }, {
      description: `${t('Create Route(s) for the selected Orders from')} ${rows.length} ${t('Tours_create')}?`
    });
  };

  const innerChangeHandler = (order) => {
    // when an order is selected we go over the rows
    // each row being a Tour that groups orders
    const newData = tableRef.current.state.data.map((row) => {
      // if the row (Tour) is not the same as the Order's
      // we keep it as is
      if (row.Tour.id !== order.Customer.Tour.id) {
        return {
          ...row,
        };
      }

      // if the row (Tour) is the same as the Order we clicked
      // we go over it's Orders. Changing the status of the clicked, leaving the
      // rest as they were
      return {
        ...row,
        orders: row.orders.map((o) => ({
          ...o,
          checked: o.id === order.id ? !o.checked : o.checked,
        })),
      };
    });

    setjsonData(newData);
  };

  return (
    <>
      <Navbar />
      <DarkLayout loading={loading}>
        <MaterialTable
          tableRef={tableRef}
          data={mapTableData(jsonData)}
          title={t(tableTitle)}
          columns={getColumns(ORDERS_TABLE_COLUMNS((e, rowData) => checkChangeHandler(e, rowData), t, user), t)}
          actions={actions}
          localization={getLocalization(t)}
          options={{
            pageSize: 50,
            pageSizeOptions: [50, 100],
            detailPanelColumnAlignment: 'right',
            paging: false,
            actionsColumnIndex: -1,
            search: false,
            headerStyle: {
              backgroundColor: '#121212',
              color: 'white',
              borderBottom: '1px solid #525252',
              font: 'normal normal normal 12px/24px Roboto',
              fontWeight: 'bold',
            },
            cellStyle: {
              color: 'white',
              border: 'none',
              font: 'normal normal normal 12px/24px Roboto',
            },
            showTitle: false,
            header: false,
            showTextRowsSelected: false,
            showSelectAllCheckbox: false,
            rowStyle: rowData => {
              if (rowData.tableData.id % 2 === 0) {
                return { backgroundColor: ' #1F1F1F ', height: '71px' };
              }
              else {
                return { backgroundColor: '#525252', height: '71px' };
              }
            }
          }}
          detailPanel={[
            {
              icon: () => <ExpandMoreIcon />,
              openIcon: () => <ExpandLessIcon />,
              render: rowData => {
                return (
                  <>
                    {rowData.orders.map((order, i) =>
                      <Box className={clsx(rowData.tableData.id % 2 === 0 ? classes._1F1F1F : classes._525252)} key={i}>
                        <Box display="flex" py={2}>
                          <Box flex={2} pl={8}>
                            {order.Customer.name}
                          </Box>
                          <Box flex={1}>
                            {order.number}
                          </Box>
                          <Box flex={2} style={{ textAlign: 'right', display: 'flex', alignItems: 'center' }}>
                            <Box flex={1} display="flex" alignItems="center">
                              <div onClick={() => editHandler(order)} className={clsx(classes._edit, classes._pointer)}>
                                <img alt="icon" src={pen} style={{ height: '10px' }} />
                              </div>
                            </Box>
                            {
                              (user?.permissions?.routesCreateForDriver || user?.permissions?.routesCreateDeliveryOrder) && (
                                <Box flex={1} pr={1.6} textAlign="center">
                                  <input
                                    onChange={(e) => {
                                      e.stopPropagation();

                                      innerChangeHandler(order);
                                    }}
                                    className={'radio-checkbox'}
                                    id={`panel${order.id}`}
                                    type="checkbox"
                                    name="field"
                                    checked={!!order.checked} />
                                  <label className="radio-checkbox-label" htmlFor={`panel${order.id}`}>
                                    {order.checked ? <FilledCircleIcon /> : <EmptyCircleIcon />}
                                  </label>
                                </Box>
                              )
                            }

                            <Box flex={1} display="flex" alignItems="center" justifyContent="flex-end">
                              <DeleteSharpIcon className={classes._pointer} style={{ marginRight: '20px', color: '#ADADAD' }} onClick={(e) => callbackOnDelete(e, order)} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )
                    }
                  </>
                )
              }
            }
          ]}
        />
      </DarkLayout>
    </>
  );
};

export default withConfirm(OrderList);
