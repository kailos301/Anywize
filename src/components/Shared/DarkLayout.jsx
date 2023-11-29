import React from 'react';
import {
  Box,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import Loading from 'components/Shared/loading';

const styles = makeStyles((theme) => ({
  padding: {
    paddingLeft: '130px',
    paddingRight: '130px',

    [theme.breakpoints.down('md')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  container: {
    backgroundColor: '#121212',

    '& .MuiInputBase-root': {
      color: '#F5F5F5',

    },

    '& .MuiPaper-elevation2': {
      boxShadow: 'none',
    },

    '& .MuiTableCell-root': {
      border: 'none',
      color: 'white',
      fontSize: '12px',
      width: 'unset !important'
    },

    '& .MuiTableSortLabel-root:hover': {
      color: '#F5F5F5',
    },

    '& .MuiTablePagination-root': {
      border: 'none',
      color: 'white',
    },

    '& .MuiPaper-root ': {
      backgroundColor: '#121212',
      color: 'white',
    },

    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #525252',
    },

    '& .MuiInput-underline:hover:before': {
      borderBottom: '1px solid #525252',
    },

    '& .MuiIconButton-root *.MuiSvgIcon-root , .MuiIconButton-root': {
      color: '#F5F5F5',
    },

    '& .MuiTableCell-alignLeft *.MuiSvgIcon-root': {
      color: '#ADADAD',
      width: '22px',
      height: '22px',
      cursor: 'pointer',
    },

    '& .MuiTypography-root': {
      color: '#F5F5F5',
    },
  },
}));

const DarkLayout = ({ children, doublebar, nopadding, pl, pr, loading }) => {
  const classes = styles();

  return (
    <Box className={clsx(classes.container, !nopadding && classes.padding)} pt={doublebar ? 10 : 10} pb={6} minHeight="95vh" pr={pr} pl={pl}>
      {
        !!loading && (<Loading />)
      }
      {
        !loading && <>{children}</>
      }
    </Box>
  )
};

export default DarkLayout;
