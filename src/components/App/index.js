import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import Home from '../Home'
import Error from '../Error'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
