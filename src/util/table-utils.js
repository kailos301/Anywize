import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
export const getColumns = (columns, t) => {
  let updatedColumns = [];
  for (let column of columns) {
    updatedColumns.push({
      ...column,
      title: t(column.title),
      field: column.field,
      render: column.render,
    });
  }

  return updatedColumns;
};


export const getActions = (tableTitle, callbackOnDelete, addHandler, editHandler, startTourCheck, startTour, t, user = {}) => {
  let actions = [];
  if (tableTitle === 'ORDERS') {
    if (user?.permissions?.routesCreateForDriver) {
      actions.push(
        {
          icon: () => { return (<><span style={{ fontSize: '16px', fontWeight: 'normal', color: startTourCheck() ? '#6F9CEB' : '#ADADAD' }}>{t('Start Tour/s')}</span> <PlayCircleOutlineIcon style={{ marginLeft: '10px', color: startTourCheck() ? '#6F9CEB' : '#ADADAD', height: '20px', width: '20px', marginRight: '15px' }} /></>) },
          tooltip: 'Start Tours',
          iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
          isFreeAction: true,
          onClick: () => startTour(),
          position: "row"
        }
      );
    }

    if (user?.permissions?.routesCreateDeliveryOrder) {
      actions.push(
        {
          icon: () => { return (<><span style={{ fontSize: '16px', fontWeight: 'normal', color: startTourCheck() ? '#6F9CEB' : '#ADADAD' }}>{t('Approve')}</span> <PlayCircleOutlineIcon style={{ marginLeft: '10px', color: startTourCheck() ? '#6F9CEB' : '#ADADAD', height: '20px', width: '20px', marginRight: '15px' }} /></>) },
          tooltip: 'Approve',
          iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
          isFreeAction: true,
          onClick: () => startTour('DELIVERY'),
          position: "row"
        }
      );
    }

    if (user?.permissions?.ordersCreate) {
      actions.push(
        {
          icon: 'add',
          tooltip: t('Add'),
          iconProps: { style: { color: "#ADADAD", background: '#1F1F1F', marginRight: '15px' } },
          isFreeAction: true,
          onClick: addHandler,
          position: "row"
        },
      );
    }

    return actions;
  }

  if (tableTitle === 'CUSTOMERS' && user?.permissions?.customersCreate) {
    actions.push(
      {
        icon: 'add',
        tooltip: t('Add'),
        iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
        isFreeAction: true,
        onClick: addHandler,
        position: "row"
      },
    );
  }

  if (tableTitle === 'TOURS' && user?.permissions?.toursCreate) {
    actions.push(
      {
        icon: 'add',
        tooltip: t('Add'),
        iconProps: { style: { color: "#ADADAD", background: '#1F1F1F' } },
        isFreeAction: true,
        onClick: addHandler,
        position: "row"
      },
    );
  }

  return actions;
};

export const getLocalization = (t) => {
  return {
    pagination: {
      labelRowsSelect: t('rows'),
      labelDisplayedRows: `{from}-{to} ${t('of')} {count}`,
      nextTooltip: t('Next page'),
      lastTooltip: t('Last page'),
      previousTooltip: t('Previous page'),
      firstTooltip: t('First page'),
    },
    toolbar: {
      nRowsSelected: `{0} ${t('row(s)')} ${t('selected')}`,
      searchTooltip: t('Search'),
      searchPlaceholder: t('Search'),
    },
    header: {
      actions: t('Actions'),
    },
    body: {
      emptyDataSourceMessage: t('No records to display'),
      filterRow: {
        filterTooltip: t('Filter'),
      },
    },
  };
};
