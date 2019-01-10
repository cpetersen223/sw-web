import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.scss';

import Home from '../Home';
import Error from '../Error';
import Author from "../Author";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/authors/:id" component={Author}/>
          <Route component={Error}/>
        </Switch>
      </Router>
    )
  }

}

export default App;
