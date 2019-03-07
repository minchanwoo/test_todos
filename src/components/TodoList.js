import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import querystring from 'querystring';
import { ITEMS_PER_PAGE } from '../App';

import '../App.css';

class Todo extends Component {
	render() {
		return (
			<tr>
				<td style={{color:'#F97F51'}}>
					<Link to={`/todos/${this.props.id}`}>
						{this.props.title}
					</Link>
				</td>
				<td>
					<input type='checkbox' checked={this.props.done} onChange={()=> this.props.changeDone(this.props.id)}/>
				</td>
			</tr>
		);
	}
}

class TodoList extends Component {
	componentWillMount() {
		console.log('HAHA')
		const page = Number(querystring.parse(this.props.location.search)['?page'] || 1);
		if(this.props.page !== page) {
			this.props.changePage(page);
		}

		const filter = querystring.parse(this.props.location.search)['?filter'];
		if(this.props.filter !== filter) {
			this.props.threeBtn(filter);
		}
	}

	componentWillReceiveProps(newProps) {
		const id = Number(querystring.parse(newProps.location.search)['?page']);
		this.props.changePage(id);
	}

	render() {
		const pages_list = this.props.filtered_list.slice((this.props.page -1) * ITEMS_PER_PAGE, this.props.page * ITEMS_PER_PAGE)
		return (
			<table>
				<tbody>
					{pages_list.map((list)=> <Todo key={list.id} id={list.id} title={list.title} done={list.done}  changeDone={this.props.changeDone} />)}				
				</tbody>
			</table>
		);
	}
}

export default TodoList;