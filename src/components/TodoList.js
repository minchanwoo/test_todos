import React, { Component } from 'react';

import '../App.css';

class Todo extends Component {
	render() {
		return (
			<tr>
				<td>
					제목
				</td>
				<td style={{color:'#F97F51'}}>
					{this.props.title}
				</td>
				<td>
					상태
				</td>
				<td>
					<input type='checkbox' checked={this.props.done} />
				</td>
			</tr>
		);
	}
}

class TodoList extends Component {
	render() {
		return (
			<table>
				<tbody>
					{this.props.lists.map((list)=> <Todo title={list.title} done={list.done} />)}				
				</tbody>
			</table>
		);
	}
}

export default TodoList;