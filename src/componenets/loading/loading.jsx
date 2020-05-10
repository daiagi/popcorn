import { CircularProgress, makeStyles, Backdrop } from '@material-ui/core';
import React from 'react';
import { useLoadingStatus } from '../errorHandler';

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 2,
    color: '#fff',
  },
  progress: {
    zIndex: 2

  }
}));


const WithLoading = ({ children }) => {
  const { loadingStatus, ..._ } = useLoadingStatus();
  const classes = useStyles();
  return (
    <>
      <Backdrop className={classes.backdrop} open={loadingStatus}>
        <CircularProgress className={classes.progress} color="secondary" size={60} />
      </Backdrop>
      {children}
    </>

  );
};

export default WithLoading;
