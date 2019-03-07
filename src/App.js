import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TodoList from './components/TodoList';

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

  render() {
    return (
      <Router>
        <div>
          <div>
            <Route exact path='/todos' component={()=> <TodoList lists={this.state.lists} changeDone={this.changeDone} />}/>    
          </div>
          <div className='btn_all'>
            <div className={`btn ${this.state.btn_value === 'all' ? 'selected' : ''}`} onClick={()=> this.threeBtn('all')}>
              전체
            </div>
            <div className={`btn ${this.state.btn_value === 'done' ? 'selected' : ''}`} onClick={()=> this.threeBtn('done')}>
              완료
            </div>
            <div className={`btn ${this.state.btn_value === 'not_done' ? 'selected' : ''}`} onClick={()=> this.threeBtn('not_done')}>
              미완료
            </div>
          </div>
        </div>
      </Router>

    );
  }
}

export default App;
