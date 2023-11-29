import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { TOURS_TABLE_COLUMNS } from 'constants/ui-constants';
import { getColumns, getActions, getLocalization } from "util/table-utils";
import { mapTableData } from 'util/helpers';
import { PATHS } from 'util/appConstants';
import {
  selectTours,
  selectTourStatus,
  getTours,
  deleteTour,
  selectTourTimestamp,
} from 'redux/slices/tourSlice';
import withConfirm from 'components/dialogs/delete';
import Navbar from 'components/Navbar';
import CustomersNavbar from 'components/Masterbar/CustomersBar';
import DarkLayout from 'components/Shared/DarkLayout';
import { selectUser } from 'redux/slices/userSlice';

const useStyles = makeStyles({
  _filtericon: {
    color: '#525252',
    fontSize: '12px',
  },
});

const tableTitle = 'TOURS';

const ToursList = ({ confirm }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectTourStatus);
  const tours = useSelector(selectTours);
  const timestamp = useSelector(selectTourTimestamp);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!loading && !timestamp) {
      dispatch(getTours());
    }
  }, [dispatch, tours]);

  const callbackOnDelete = (e, rowData) => {
    e.stopPropagation();
    confirm(() => dispatch(deleteTour(rowData.id)), {
      description: 'Are you sure?',
    });
  };

  const actions = getActions(
    tableTitle,
    (e, rowData) => callbackOnDelete(e, rowData),
    () => addHandler(), null, null, null, t, user
  );
  const addHandler = () => {
    history.push(PATHS.tours.add);
  };

  return (
    <>
      <Navbar />
      <CustomersNavbar />
      <DarkLayout doublebar loading={loading}>
        <div className="custom-table-styles">
          <MaterialTable
            icons={{
              Filter: () => (
                <i className={clsx(classes._filtericon, 'fas fa-filter')}></i>
              ),
            }}
            style={{ display: 'flex', flexDirection: 'column' }}
            data={mapTableData(tours)}
            title={t(tableTitle)}
            columns={getColumns(TOURS_TABLE_COLUMNS, t)}
            onRowClick={(e, rowData) =>
              history.push(PATHS.tours.detail.replace(':id', rowData.id))
            }
            actions={actions}
            localization={getLocalization(t)}
            options={{
              pageSize: 50,
              pageSizeOptions: [50, 100],
              actionsColumnIndex: -1,
              searchFieldAlignment: 'left',
              showTitle: false,
              filtering: true,
              headerStyle: {
                backgroundColor: '#121212',
                color: 'white',
                borderBottom: '1px solid #525252',
                font: 'normal normal normal 12px/24px Roboto',
                fontWeight: 'bold',
              },
              cellStyle: {
                backgroundColor: '#121212',
                color: 'white',
                border: 'none',
                font: 'normal normal normal 12px/24px Roboto',
                padding: '0 16px',
              },
              searchFieldStyle: {
                color: '#F5F5F5',
              },
              filterCellStyle: {
                color: '#F5F5F5',
              },
              rowStyle: { height: '38px' },
            }}
          />
        </div>
      </DarkLayout>
    </>
  );
};

export default withConfirm(ToursList);
