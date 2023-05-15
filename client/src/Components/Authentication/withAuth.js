import React, { useContext } from 'react';
import {Navigate} from 'react-router-dom';
// import { AuthContext } from './AuthContext';
import { GlobalContext } from '../../Global';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail } = useContext(GlobalContext);

    if (!globalloggedIn) {
      return <Navigate to="/" />;
    }
    else{
        if(globalemail != "ajahsanul19@gmail.com" && globalemail != "tahmidimtiaz11807048@gmail.com"){
            return <Navigate to="/" />;
        }
    }

    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;
