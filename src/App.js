import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TodoList from './components/TodoList';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/todos' component={TodoList}/>    
        </div>
      </Router>
    );
  }
}

export default App;
