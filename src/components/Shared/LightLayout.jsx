import React from 'react';
import {
  Box,
  makeStyles,
} from '@material-ui/core';
import Loading from 'components/Shared/loading';

const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F5F5F5',
    paddingLeft: '130px',
    paddingRight: '130px',

    [theme.breakpoints.down('md')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
}));

const LightLayout = ({ children, doublebar, loading }) => {
  const classes = styles();

  return (
    <Box className={classes.container} pt={doublebar ? 10 : 10} pb={6} minHeight="calc(96vh - 94px)">
      {
        !!loading && (<Loading />)
      }
      {
        !loading && <>{children}</>
      }
    </Box>
  )
};

export default LightLayout;
