import React from 'react';
import {
	List,
	WhiteSpace,
	Radio,
	WingBlank,
} from 'antd-mobile';
import PropTypes from 'prop-types';
const RadioItem = Radio.RadioItem;


export default class Question extends React.Component {
	constructor(props) {
		super(props);
	}
	//
	onChange(value, e) {
		this.props.onChange(value);
	}

	//
	render() {
		return (
			<div>
				<WhiteSpace size="lg"></WhiteSpace>
				<WingBlank size="sm">
					<span style={{lineHeight: '25px'}}>{this.props.title}</span>						
				</WingBlank>
				<WhiteSpace size="md"></WhiteSpace>
				<List>
					{this.props.data.map(item => (
						<RadioItem 
							key={item.value}
							checked={this.props.value === item.value}
							onChange={this.onChange.bind(this, item.value)}	
						>
							{item.value + "：" + item.label}
						</RadioItem>
					))}
				</List>
				<WhiteSpace size="lg"></WhiteSpace>
			</div>
		);
	}
}

// 验证输入
Question.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	value: PropTypes.string,
};