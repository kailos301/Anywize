import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { PATHS } from 'util/appConstants';
import { fetchUserInfo } from 'redux/slices/userSlice';
import { selectAuthenticated } from 'redux/slices/authSlice';
import AppRouter from './routes/AppRouter';
import Snackbar from 'components/Snackbar';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector(selectAuthenticated);
  // const authe = useSelector(selectUser)

  useEffect(() => {
    dispatch(fetchUserInfo(history));
  }, [dispatch, history]);

  useEffect(() => {
    if (!authenticated) {
      history.push(PATHS.login);
    }
  }, [authenticated, history]);

  return (
    <>
      {/*location.pathname !== "/login" &&
        <>
          <Navbar checkTourPaths={checkTourPath} checkPaths={checkPath} />
          {checkPath().includes(location.pathname) && <Masterbar {...MASTER_DATA_BAR} />}
          {checkTourPath().includes(location.pathname) && <Masterbar {...TOUR_DATA_BAR} />}
        </>*/
      }
      <AppRouter />
      <Snackbar />
    </>
  );
};

export default App;
