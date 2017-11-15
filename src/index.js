import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Toast, List, WhiteSpace, Radio, Button, WingBlank } from 'antd-mobile';
import indexCss from './index.css';

const RadioItem = Radio.RadioItem;

const title = [
	"Q1：根据建设部的有关规定，施工单位（   ）的工人，必须接受三级安全培训教育，经考核合格后，方能上岗。",
	"Q2：安全生产管理是实现安全生产的重要（   ）。",
	"Q3：安全是（   ）"
]
const data1 = [
	{ value: "A", label: '转岗' },
	{ value: "B", label: '新入场' },
	{ value: "C", label: '变换工种' },
	{ value: "D", label: '从事特种作业' },
];
const data2 = [
	{ value: "A", label: '作用' },
	{ value: "B", label: '保证' },
	{ value: "C", label: '依据' },
	{ value: "D", label: '措施' },
];

const data3 = [
	{ value: "A", label: '没有危险的状态' },
	{ value: "B", label: '没有事故的状态' },
	{ value: "C", label: '舒适的状态' },
	{ value: "D", label: '生产系统中人员免遭不可承受危险的伤害' },
];

//
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value1: "",
			data1: [],
			data2: [],
			data3: [],
			title: [],
			isShowBtn: false,
		}
	}
	//
	componentDidMount() {
		Toast.loading("数据加载中", 0);
		setTimeout(() => {
			Toast.hide();
			this.setState({
				data1: data1,
				data2: data2,
				data3: data3,
				title: title,
				isShowBtn: true,
			})
		}, 2000)
	}
	//
	onChange1(value, e) {
		this.setState({ value1: value })
	}
	onChange2(value, e) {
		this.setState({ value2: value })
	}
	onChange3(value, e) {
		this.setState({ value3: value })
	}
	//
	render() {
		return (
			<div>
				<NavBar mode="dark">测试问卷</NavBar>
				<WhiteSpace size="lg"></WhiteSpace>
				<span style={{lineHeight: '25px'}}>{this.state.title[0]}</span>
				<WhiteSpace size="md"></WhiteSpace>
				<List>
					{this.state.data1.map(item => (
						<RadioItem 
							key={item.value}
							checked={this.state.value1 === item.value}
							onChange={this.onChange1.bind(this, item.value)}
						>
							{item.value + "：" + item.label}
						</RadioItem>
					))}
				</List>
				<WhiteSpace size="lg"></WhiteSpace>
				<span style={{lineHeight: '25px'}}>{this.state.title[1]}</span>
				<WhiteSpace size="md"></WhiteSpace>
				<List>
					{this.state.data2.map(item => (
						<RadioItem 
							key={item.value}
							checked={this.state.value2 === item.value}
							onChange={this.onChange2.bind(this, item.value)}
						>
							{item.value + "：" + item.label}
						</RadioItem>
					))}
				</List>
				<WhiteSpace size="lg"></WhiteSpace>
				<span style={{lineHeight: '25px'}}>{this.state.title[2]}</span>
				<WhiteSpace size="md"></WhiteSpace>
				<List>
					{this.state.data3.map(item => (
						<RadioItem 
							key={item.value}
							checked={this.state.value3 === item.value}
							onChange={this.onChange3.bind(this, item.value)}
						>
							{item.value + "：" + item.label}
						</RadioItem>
					))}
				</List>
				{(this.state.isShowBtn)
					?<WingBlank>
						<Button type="primary">提交</Button>
					</WingBlank>:<WhiteSpace size="xs"></WhiteSpace>
				}
				<WhiteSpace size="lg"></WhiteSpace>
			</div>
		);
	}
}

//
ReactDOM.render(
	<Main></Main>,
	document.getElementById('root')
);