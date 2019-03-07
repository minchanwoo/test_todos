import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';


import './App.css';

export const ITEMS_PER_PAGE = 5;

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
      page: 1,
      last: 1,
      filtered_list:[],
    }
  }

  componentDidMount() {
    this.getFliteredList();
  }

  componentDidUpdate() {
    this.getFliteredList();
  }

  getFliteredList() {
    const filtered_list = this.state.lists.filter((item) => {
			if(this.state.btn_value === 'done') {
				if(item.done === false) {
					return false;
				}
			}
			if(this.state.btn_value === 'not_done') {
				if(item.done === true) {
					return false;
				}
			}
			return true;
    });
    const last=Math.ceil(filtered_list.length / ITEMS_PER_PAGE);
    
    if(this.state.filtered_list.length !== filtered_list.length) {
      this.setState({
        filtered_list,
        last,
      });
    }
  }

  getPage() {
    let pages = [this.state.page];

    if(1 <= this.state.page-1) {
        pages.unshift(this.state.page-1);
    }
    if(this.state.page+1 <= this.state.last) {
        pages.push(this.state.page+1);
    }
    if(pages.indexOf(1) < 0) {
        pages.unshift(1);
    }
    if(pages.indexOf(this.state.last) < 0) {
        pages.push(this.state.last);
    }

    let result = [];

    for(var i=0; i < pages.length; i++) {
        if(i === pages.length -1) {
            result.push(pages[i]);
        }else if(pages[i]+1 === pages[i+1]) {
            result.push(pages[i]);
        } else {
            result.push(pages[i]);
            result.push('...');
        }
    }

    return result;
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

  changePage = (newPage) => {
    this.setState({
      page: newPage
    })
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
    return (
      <Router>
        <div>
          <div className='main_title'>Todo 리스트</div>
          <div>
            <Route exact path='/todos' 
              component={(props)=> <TodoList
              {...props}
              lists={this.state.lists}
              changeDone={this.changeDone}
              btn_value={this.state.btn_value}
              changePage={this.changePage}
              page={this.state.page}
              filtered_list={this.state.filtered_list}
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
          <div style={{textAlign:'center'}}>
            {this.getPage().map((page, i)=> {
              return <div key={i} style={{display:'inline-block', marginRight:'7px', fontSize: '19px'}}>
              {Number.isInteger
              ?
                this.state.page === page
                  ? <strong>{page}</strong>
                  : <Link to={`/todos?page=${page}`}>{page}</Link>
              : <span>{page}</span>
              }
              </div>
            })}
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
