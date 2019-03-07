import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TodoList from './components/TodoList';

import list from './list';

import './App.css';

class App extends Component {
  state = {
    lists: list,
  }

  changeDone = (id) => {
    const newList = this.state.lists;
    newList.forEach((item)=> {
      if(item.id === id) {
        item.done = !item.done
      }
      this.setState({
        lists: newList,
      });
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/todos' component={()=> <TodoList lists={this.state.lists} changeDone={this.changeDone} />}/>    
        </div>
      </Router>
    );
  }
}

export default App;
