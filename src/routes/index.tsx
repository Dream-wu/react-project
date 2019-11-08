import React from 'react';
import Home from '../containers/Home';
import Page1 from '../components/Page1'
import Page2 from '../components/Page2'
import {HashRouter, Switch, Route} from 'react-router-dom';

const BasicRoute = () => (
  <HashRouter>
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route  path="/page1" component={Page1}/>
          <Route  path="/page2" component={Page2}/>
      </Switch>
  </HashRouter>
);


export default BasicRoute;