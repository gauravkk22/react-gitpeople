import React, { Component } from 'react';
import { Switch, Route , Redirect } from 'react-router-dom';
import Search from './Search';
import User from './User';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Search}/>
        <Route exact path='/user/:username' component={User}/>
        <Redirect from='*' to='/' />
      </Switch>
    );
  }
}

export default App;
