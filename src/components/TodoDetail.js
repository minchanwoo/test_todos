import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

class TodoDetail extends Component {
	state= {
		id: 0,
		title: '',
		done: false,
		description: '',
		prev_id: null,
		next_id: null,
	}

	componentWillMount() {
		const id = Number(this.props.match.params.id);
		this.getDetail(id);
	}

	componentWillReceiveProps(newProps) {
		const new_id = Number(newProps.match.params.id);
		this.getDetail(new_id);
	}

	getDetail(id) {
		const data = this.props.lists.find((item)=> item.id === id);
		if(!data) {
			return;
		}
		const first_id = this.props.lists[0].id;
		const last_id = this.props.lists[this.props.lists.length -1].id;

		const {title, done, description} = data;

		let prev_id;
		let next_id;

		if(first_id < id) {
			prev_id = id -1;
		}
		if(id < last_id) {
			next_id = id +1;
		}
		this.setState({
			title,
			done,
			description,
			id,
			prev_id,
			next_id,
		});
	}

	removeBtn =() => {
		if(window.confirm('삭제하시겠습니까?')) {
			this.props.remove(this.state.id);
			this.props.history.push('/todos')
		}
	}

	render() {
		const {id, title, done, description, prev_id, next_id} = this.state;
		return (
			<div className='desc'>
				<Link to='/todos'>목록으로 이동</Link>
				<div>
					제목: {title}
				</div>
				<div>
					완료여부: <input type='checkbox' checked={done} onChange={()=> this.props.changeDone(id)}/>
				</div>
				<div>
					상세: {description}
				</div>
				<div>
					<button onClick={this.removeBtn} className='removeBtn'>삭제</button>
				</div>
				<hr/>
				{prev_id && <Link to={`/todos/${prev_id}`}>이전으로</Link>}
				{next_id && <Link to={`/todos/${next_id}`}>다음으로</Link>}
			</div>
		);
	}
}

export default TodoDetail;