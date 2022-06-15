import './App.css';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Authentication';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import {Route, Switch, withRouter} from 'react-router-dom';
import Logout from './containers/Authentication/Logout/Logout';

class App extends Component {

  componentDidMount() {
    this.props.onAutoSignUp();
  }

  render() {
    
    return (
        <div className="App">
          <Layout>
            <Switch>
              {/* With Switch Order matters so /checkout will be first */}
              <Route path="/" exact component={BurgerBuilder}></Route>
              <Route path="/checkout" component={CheckOut}></Route>
              <Route path="/orders" component={Orders}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="/auth" component={Authentication}></Route>
            </Switch>
          </Layout>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
