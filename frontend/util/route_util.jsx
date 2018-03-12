import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const Auth = ({ component: Component, path, loggedIn, location }) => {
  return (
    <Route path={path} render={ (props) => {
        return (
          (!loggedIn ? (<Component {...props} />) : (<Redirect to={`${location.pathname}`} />))
        );
    }} />
  );
}

const Protected = ({ component: Component, path, loggedIn }) => {
  return (
    <Route path={path} render={ (props) => {
        return (
          (loggedIn ? (<Component {...props} />) : (<Redirect to='/' />))
        );
    }} />
  );
}

const mapStateToProps = (state) => {
  return { loggedIn: Boolean(state.session.currentUser) };
}

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
