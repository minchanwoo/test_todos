import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let list_data = localStorage.getItem('list');
    if(!list_data) {
      list_data = [];
    } else {
      list_data = JSON.parse(list_data);
    }
    this.state = {
      lists: list_data,
      btn_value: 'all',
    }
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
      localStorage.setItem('list', JSON.stringify(newList));
    })
  }

  threeBtn =(text)=> {
    this.setState({
      btn_value: text,
    });
  }
  
  add = () => {
    const title = window.prompt('제목을 입력해주세요');
    if(title) {
      const list = this.state.lists;
      const last_id = list.length ? list[list.length-1].id : 0;
      list.push({title, done: false, description: '', id: last_id +1});
      this.setState({
        lists: list,
      });
      localStorage.setItem('list', JSON.stringify(list));
    }  
  }

  remove =(id) => {
    console.log(id);
    const rmTitle = this.state.lists.filter((item)=> item.id !== id);
    this.setState({
      lists: rmTitle
    });
    localStorage.setItem('list', JSON.stringify(rmTitle));
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
    console.log(this.state.lists)
    return (
      <Router>
        <div>
          <div className='main_title'>Todo 리스트</div>
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
              remove={this.remove}
              />} 
            />    
          </div>
          <div>
            <button onClick={this.add} className='addBtn'>추가</button>
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
