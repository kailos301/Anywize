import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import MaterialTable from 'material-table';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import MapIcon from '@material-ui/icons/Map';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import clsx from 'clsx';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { PAST_DELIVERIES_TABLE_COLUMNS } from 'constants/ui-constants';
import { getColumns, getLocalization } from "util/table-utils";
import { mapTableData } from 'util/helpers';
import { PATHS } from 'util/appConstants';
import { DatePicker } from 'components/Shared/mui-formik-inputs';
import {
  getpastDeliveries,
  selectpastDeliveries,
  selectpastDeliveriesStatus
} from 'redux/slices/pastDeliveriesSlice';
import "moment/locale/en-gb";
import "moment/locale/de";
import Navbar from 'components/Navbar';
import DarkLayout from 'components/Shared/DarkLayout';

const locales = {
  'en-us': 'en',
  en: 'en',
  de: 'de'
};

const useStyles = makeStyles({
  orderRow: {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#1F1F1F',
    },
  }
});

const PastDeliveries = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    from: moment().subtract(1, 'month').startOf('month').toDate(),
    to: moment().subtract(1, 'day').endOf('day').toDate(),
  });
  const classes = useStyles();
  const loading = useSelector(selectpastDeliveriesStatus);
  const pastdeliveries = useSelector(selectpastDeliveries);

  const fetch = async (params = form) => {
    setForm(params);
    await dispatch(getpastDeliveries({
      from: moment(params.from).format('YYYY-MM-DD'),
      to: moment(params.to).format('YYYY-MM-DD'),
    }));
  };

  useEffect(() => {
    if (!loading) {
      fetch();
    }
  }, []);

  return (
    <>
      <Navbar />
      <DarkLayout loading={loading}>
        <Box p={2} boxShadow={3} style={{ backgroundColor: 'rgb(31, 31, 31)' }} borderRadius={3}>
          <MuiPickersUtilsProvider utils={MomentUtils} locale={locales[i18n.language.toLowerCase()]}>
            <Formik
              initialValues={form}
              validate={(values) => {
                const errors = {};

                if (!values.from) {
                  errors.from = 'Required';
                }

                if (!values.to) {
                  errors.to = 'Required';
                }

                return errors;
              }}
              onSubmit={(values) => {
                fetch({
                  from: moment(values.from).toDate(),
                  to: moment(values.to).toDate(),
                });
              }}
              render={({ values, setFieldValue, handleSubmit, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <DatePicker
                        onChange={(date) => {
                          if (date && date.isValid) {
                            setFieldValue('from', date);
                          }

                          if (date === null) {
                            setFieldValue('from', null);
                          }
                        }}
                        name="from"
                        value={values.from}
                        errors={errors}
                        label="Date delivered from"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <DatePicker
                        onChange={(date) => {
                          if (date && date.isValid) {
                            setFieldValue('to', date);
                          }

                          if (date === null) {
                            setFieldValue('to', null);
                          }
                        }}
                        name="to"
                        value={values.to}
                        errors={errors}
                        label="Date delivered to"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Box pt={2.8}>
                        <Button
                          color="primary"
                          size="small"
                          type="submit"
                          variant="contained"
                        >
                          {t('Search')}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </MuiPickersUtilsProvider>
        </Box>
        <MaterialTable
          icons={{
            Filter: () => (
              <i className={clsx(classes._filtericon, "fas fa-filter")}></i>
            ),
          }}
          columns={getColumns(PAST_DELIVERIES_TABLE_COLUMNS, t)}
          data={mapTableData(pastdeliveries)}
          localization={getLocalization(t)}
          options={{
            pageSize: 50,
            pageSizeOptions: [50, 100],
            paging: false,
            sorting: false,
            actionsColumnIndex: -1,
            showTitle: false,
            filtering: true,
            search: false,
            detailPanelColumnAlignment: 'right',
            headerStyle: {
              backgroundColor: "#121212",
              color: "#F5F5F5",
              borderBottom: "1px solid #525252",
              font: "normal normal normal 12px/24px Roboto",
              fontWeight: "bold",
            },
            cellStyle: {
              color: "white",
              border: "none",
              font: "normal normal normal 12px/24px Roboto",
              padding: "0 16px",
            },
            rowStyle: rowData => {
              if (rowData.tableData.id % 2 === 0) {
                return { backgroundColor: '#1F1F1F' };
              }

              return { backgroundColor: '#525252' };
            }
          }}
          detailPanel={[
            {
              icon: () => <ExpandMoreIcon />,
              openIcon: () => <ExpandLessIcon />,
              render: rowData => {
                return (
                  <Table>
                    <TableHead>
                      <TableRow style={{ backgroundColor: rowData.tableData.id % 2 !== 0 ? '#1F1F1F' : '#525252' }}>
                        <TableCell>{t('Route')}</TableCell>
                        <TableCell>{t('Date')}</TableCell>
                        <TableCell>{t('Time')}</TableCell>
                        <TableCell>{t('Number')}</TableCell>
                        <TableCell>{t('Description')}</TableCell>
                        <TableCell>{t('Met customer')}</TableCell>
                        <TableCell>{t('Actions')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        rowData.Orders.map((order, i) => (
                          <TableRow
                            key={i}
                            onClick={() => window.open(`${PATHS.tours.map}/${order.Route.id}/${rowData.id}`, '_blank')}
                            className={classes.orderRow}
                          >
                            <TableCell>{order.Route.uuid}</TableCell>
                            <TableCell>{moment(order.delivered_at).format('DD.MM.YYYY')}</TableCell>
                            <TableCell>{moment(order.delivered_at).format('HH:mm')}</TableCell>
                            <TableCell>{order.Route.uuid}</TableCell>
                            <TableCell>{order.description}</TableCell>
                            <TableCell>{order.Route?.Stops[0]?.meet_customer ? t('Yes') : t('No')}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();

                                  return window.open(`${PATHS.tours.map}/${order.Route.id}/${rowData.id}`, '_blank');
                                }}
                                color="primary"
                              >
                                <MapIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                );
              }
            }
          ]}
        />
      </DarkLayout>
    </>
  )
};

export default PastDeliveries;
