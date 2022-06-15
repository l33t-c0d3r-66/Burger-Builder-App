import './App.css';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Logout from './containers/Authentication/Logout/Logout';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';


const asyncCheckOut = AsyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuthentication = AsyncComponent(() => {
  return import('./containers/Authentication/Authentication');
});



class App extends Component {

  componentDidMount() {
    this.props.onAutoSignUp();
  }

  render() {
    let routes = (
          <Switch>
            <Route path="/" exact component={BurgerBuilder}></Route>
            <Route path="/auth" component={asyncAuthentication}></Route>
            <Redirect to="/" />
          </Switch>
        );
      if(this.props.isAuthenticated) {
          routes = (
            <Switch>
              <Route path="/" exact component={BurgerBuilder}></Route>
              <Route path="/checkout" component={asyncCheckOut}></Route>
              <Route path="/orders" component={asyncOrders}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="/auth" component={asyncAuthentication}></Route>
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
