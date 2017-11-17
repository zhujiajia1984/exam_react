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

var dataG = [
	[
		{ value: "A", label: '' },
		{ value: "B", label: '' },
		{ value: "C", label: '' },
		{ value: "D", label: '' },
	],
	[
		{ value: "A", label: '' },
		{ value: "B", label: '' },
		{ value: "C", label: '' },
		{ value: "D", label: '' },
	],
	[
		{ value: "A", label: '' },
		{ value: "B", label: '' },
		{ value: "C", label: '' },
		{ value: "D", label: '' },
	],
	[
		{ value: "A", label: '' },
		{ value: "B", label: '' },
		{ value: "C", label: '' },
		{ value: "D", label: '' },
	],
	[
		{ value: "A", label: '' },
		{ value: "B", label: '' },
		{ value: "C", label: '' },
		{ value: "D", label: '' },
	],
];
var answer = [];
var title = [];
var logForm = document.getElementById("loginForm");
// var userMac = (document.getElementById("userMac")).value;
// var userIp = (document.getElementById("userIp")).value;
// var user = (document.getElementById("userParam")).value;
// console.log(logForm);
// console.log(userMac);
// console.log(userIp);
// console.log(user);
//
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ["", "", "", "", ""],
			data: [],
			title: [],
			isShowPage: false,
			isShowCorrect: false,
			isShowWrong: false,
			wrongNumber: 0,
		}
	}
	//
	componentDidMount() {
		var that = this;
		Toast.loading("试题加载中", 0);
		setTimeout(() => {
			that.getServerData();
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
		let title = [];
		let data = [];
		let dataDetail = [];
		let dataTemp = [];
		for (let i = 0; i < this.state.value.length; i++) {
			if (answer[i] != this.state.value[i]) {
				wrongs++;
				title.push(this.state.title[i]);
				dataTemp = this.state.data[i];
				for (let j = 0; j < dataTemp.length; j++) {
					if (dataTemp[j].value == answer[i]) {
						dataDetail.push(dataTemp[j]);
					}
				}
			}
		}
		data.push(dataDetail);
		if (wrongs > 0) {
			// 有错
			var that = this;
			this.setState({
				isShowPage: false,
				isShowCorrect: false,
				isShowWrong: true,
				wrongNumber: wrongs,
				title: title,
				data: data,
			})
			Toast.loading("试题重新加载中", 0);
			setTimeout(() => {
				that.getServerData();
				that.setState({
					value: ["", "", "", "", ""],
					title: title,
				})
			}, 10000)
		} else {
			// 成功
			this.setState({
				isShowPage: false,
				isShowCorrect: true,
				isShowWrong: false,
			})
			setTimeout(() => {
				//提交认证
				logForm.submit();
			}, 5000)
		}
	}
	//
	getServerData() {
		var that = this;
		reqwest({
			// url: "http://10.10.11.88/subject" + user,
			url: "http://10.10.11.88/subject/",
			method: 'get',
			data: {
				user: "abc",
			},
			success: function(res) {
				let result = JSON.parse(res);
				// let result = res;
				console.log(result);
				title = [];
				answer = [];
				for (let i = 0; i < result.length; i++) {
					title.push(`Q${i+1}：${result[i].stem}`);
					dataG[i][0].label = result[i].answer1;
					dataG[i][1].label = result[i].answer2;
					dataG[i][2].label = result[i].answer3;
					dataG[i][3].label = result[i].answer4;
					answer.push(result[i].standard);
				}
				Toast.hide();
				that.setState({
					data: dataG,
					title: title,
					value: ["", "", "", "", ""],
					isShowPage: true,
					isShowCorrect: false,
					isShowWrong: false,
					wrongNumber: 0,
				})
			},
			error: function(res) {
				Toast.hide();
				alert("获取试题失败");
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
					message="上网认证中..."
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
				{this.state.title.map((item,index) => (
					<div key={index}>{this.state.title[index]}</div>
				))}
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