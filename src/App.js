import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TodoList from './components/TodoList';

import list from './list';

import './App.css';

class App extends Component {
  state = {
    lists: list,
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/todos' component={()=> <TodoList lists={this.state.lists}/>}/>    
        </div>
      </Router>
    );
  }
}

export default App;
