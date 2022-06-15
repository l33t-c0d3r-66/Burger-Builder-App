import './App.css';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Authentication';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Logout from './containers/Authentication/Logout/Logout';

class App extends Component {

  componentDidMount() {
    this.props.onAutoSignUp();
  }

  render() {
    let routes = (
          <Switch>
            <Route path="/" exact component={BurgerBuilder}></Route>
            <Route path="/auth" component={Authentication}></Route>
            <Redirect to="/" />
          </Switch>
        );
      if(this.props.isAuthenticated) {
          routes = (
            <Switch>
              <Route path="/" exact component={BurgerBuilder}></Route>
              <Route path="/checkout" component={CheckOut}></Route>
              <Route path="/orders" component={Orders}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Redirect to="/" />
            </Switch>
          );
      }
    return (
        <div className="App">
          <Layout>
            {routes}
          </Layout>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token!==null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
