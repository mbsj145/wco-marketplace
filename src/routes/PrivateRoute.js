import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path,component: Component, auth, ...rest }) => {

    console.log("************** path",path);
    console.log("************** component",Component);
    console.log("************** ...rest",...rest);
    console.log("************** auth",auth);

}
//   <Route
//     {...rest}
//     render={props => auth ? (<Component {...props} />) : (<Navigate to="/" />)}
//   />

    // <Route path={path} element={<Component />} /> 


PrivateRoute.propTypes = {
  auth: PropTypes.string.isRequired
};


const mapStateToProps = ({ Auth }) => {
  let { auth } = Auth;
  return { auth };
};

export default connect(mapStateToProps)(PrivateRoute);
