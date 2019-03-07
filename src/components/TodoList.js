import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

class Todo extends Component {
	render() {
		return (
			<tr>
				<td>
					제목
				</td>
				<td style={{color:'#F97F51'}}>
					<Link to={`/todos/${this.props.id}`}>
						{this.props.title}
					</Link>
				</td>
				<td>
					상태
				</td>
				<td>
					<input type='checkbox' checked={this.props.done} onChange={()=> this.props.changeDone(this.props.id)}/>
				</td>
			</tr>
		);
	}
}

class TodoList extends Component {


	render() {
		const filtered_list = this.props.lists.filter((item) => {
			if(this.props.btn_value === 'done') {
				if(item.done === false) {
					return false;
				}
			}
			if(this.props.btn_value === 'not_done') {
				if(item.done === true) {
					return false;
				}
			}
			return true;
		});
		return (
			<table>
				<tbody>
					{filtered_list.map((list)=> <Todo key={list.id} id={list.id} title={list.title} done={list.done}  changeDone={this.props.changeDone} />)}				
				</tbody>
			</table>
		);
	}
}

export default TodoList;