import './App.css';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Authentication';

import {Route, Switch} from 'react-router-dom';

class App extends Component {

  render() {
    
    return (
        <div className="App">
          <Layout>
            <Switch>
              {/* With Switch Order matters so /checkout will be first */}
              <Route path="/" exact component={BurgerBuilder}></Route>
              <Route path="/checkout" component={CheckOut}></Route>
              <Route path="/orders" component={Orders}></Route>
              <Route path="/auth" component={Authentication}></Route>
            </Switch>
          </Layout>
        </div>
    );
  }
}
export default App;
