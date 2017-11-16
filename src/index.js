import React from 'react';
import ReactDOM from 'react-dom';
import {
	NavBar,
	Toast,
	WhiteSpace,
	Button,
	WingBlank,
	Result,
	Icon
} from 'antd-mobile';
import indexCss from './index.css';
import Question from './Question.js';
import reqwest from "reqwest";

const title = [
	"Q1：根据建设部的有关规定，施工单位（   ）的工人，必须接受三级安全培训教育，经考核合格后，方能上岗。",
	"Q2：安全生产管理是实现安全生产的重要（   ）。",
	"Q3：安全是（   ）"
]
const data = [
	[
		{ value: "A", label: '转岗' },
		{ value: "B", label: '新入场' },
		{ value: "C", label: '变换工种' },
		{ value: "D", label: '从事特种作业' },
	],
	[
		{ value: "A", label: '作用' },
		{ value: "B", label: '保证' },
		{ value: "C", label: '依据' },
		{ value: "D", label: '措施' },
	],
	[
		{ value: "A", label: '没有危险的状态' },
		{ value: "B", label: '没有事故的状态' },
		{ value: "C", label: '舒适的状态' },
		{ value: "D", label: '生产系统中人员免遭不可承受危险的伤害' },
	]
];
const answer = ["B", "B", "D"];
//
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ["", "", "", ],
			data: [],
			title: [],
		}
	}
	//
	componentDidMount() {
		var that = this;
		Toast.loading("试题加载中", 0);
		setTimeout(() => {
			reqwest({
				url: "http://10.10.11.88:9001/admin/subject/",
				method: 'get',
				success: function(res) {
					console.log(res);
					Toast.hide();
					that.setState({
						data: data,
						title: title,
						isShowPage: true,
						isShowCorrect: false,
						isShowWrong: false,
						wrongNumber: 0,
					})
				},
				error: function(res) {
					Toast.hide();
					alert("获取试题失败");
					console.log("getExam failed");
					that.setState({
						data: [],
						title: [],
						isShowPage: false,
						isShowCorrect: false,
						isShowWrong: false,
						wrongNumber: 0,
					})
				}
			})
			// Toast.hide();
			// that.setState({
			// 	data: data,
			// 	title: title,
			// 	isShowPage: true,
			// 	isShowCorrect: false,
			// 	isShowWrong: false,
			// })
		}, 500)
	}
	//
	onChange(index, value) {
		let values = this.state.value;
		values[index] = value;
		this.setState({ value: values })
	}
	//
	submitAnswer() {
		//是否答题
		let noAnswer = 0;
		for (let i = 0; i < this.state.value.length; i++) {
			if (this.state.value[i] == "")
				noAnswer++
		}
		if (noAnswer > 0) {
			Toast.info("请先进行答题", 2);
			return;
		}
		//是否有错
		let wrongs = 0;
		for (let i = 0; i < this.state.value.length; i++) {
			if (answer[i] != this.state.value[i]) {
				wrongs++
			}
		}
		if (wrongs > 0) {
			// 有错
			this.setState({
				isShowPage: false,
				isShowCorrect: false,
				isShowWrong: true,
				wrongNumber: wrongs,
			})
			Toast.loading("试题加载中", 0);
			setTimeout(() => {
				Toast.hide();
				this.setState({
					data: data,
					title: title,
					value: ["", "", "", ],
					isShowPage: true,
					isShowCorrect: false,
					isShowWrong: false,
					wrongNumber: 0,
				})
			}, 4000)
		} else {
			// 成功
			this.setState({
				isShowPage: false,
				isShowCorrect: true,
				isShowWrong: false,
			})
			setTimeout(() => {
				window.location.href = "http://www.baidu.com";
			}, 2000)
		}
	}
	//
	render() {
		const content =
			<div>
				{this.state.data.map((item,index) => (
					<Question key={index}
						title={this.state.title[index]}
						data={this.state.data[index]}
						value={this.state.value[index]}
						onChange={this.onChange.bind(this, index)}
					>
					</Question>
				))}
				<WingBlank>
					<Button type="primary" 
							onClick={this.submitAnswer.bind(this)}
					>提交</Button>
				</WingBlank>
				<WhiteSpace size="lg"></WhiteSpace>
			</div>
		const correct =
			<div>
				<Result
					img={<Icon type="check-circle" 
								style={{ fill: '#1F90E6', width: '60px', height:'60px'}} />}
					title="答题成功"
					message="恭喜你，已可以正常上网！"
				/>
			</div>
		const wrong =
			<div>
				<Result
					img={<Icon type="cross-circle-o" 
								style={{ fill: '#F13642', width: '60px', height:'60px'}} />}
					title="答题失败"
					message={`您有${this.state.wrongNumber}道题答错了,请重新答题`}
				/>
			</div>
		return (
			<div>
				<NavBar mode="dark">测试问卷</NavBar>
				{(this.state.isShowPage)?content:""}
				{(this.state.isShowCorrect)?correct:""}
				{(this.state.isShowWrong)?wrong:""}
			</div>
		);
	}
}

//
ReactDOM.render(
	<Main></Main>,
	document.getElementById('root')
);