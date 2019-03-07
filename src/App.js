import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';

import list from './list';

import './App.css';

class App extends Component {
  state = {
    lists: list,
    btn_value: 'all',
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

  threeBtn =(text)=> {
    this.setState({
      btn_value: text,
    });
  }

  renderButton(value, label) {
    return (
      <Link to={`/todos?filter=${value}`}>
        <div className={`btn ${this.state.btn_value === value ? 'selected' : ''}`} onClick={()=> this.threeBtn(value)}>
          {label}
        </div>
      </Link>
    );
  }

  render() {
    return (
      <Router>
        <div>
          <div>
            <Route exact path='/todos' 
              component={()=> <TodoList
              lists={this.state.lists}
              changeDone={this.changeDone}
              btn_value={this.state.btn_value}
              />}
            />
            <Route path='/todos/:id'
              component={(props)=> <TodoDetail
              {...props}
              lists={this.state.lists}
              changeDone={this.changeDone}
              />} 
            />    
          </div>
          {this.renderButton('all', '전체')}
          {this.renderButton('done', '완료')}
          {this.renderButton('not_done', '미완료')}
        </div>

      </Router>

    );
  }
}

export default App;
