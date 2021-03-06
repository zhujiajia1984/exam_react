import React from 'react';
import ReactDOM from 'react-dom';
import {
	NavBar,
	Toast,
	WhiteSpace,
	Button,
	WingBlank,
	Result,
	Icon,
} from 'antd-mobile';
import indexCss from './index.css';
import Question from './Question.js';
// import reqwest from "reqwest";

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
var devPK = document.getElementById("devpk").value;
var domain = document.getElementById("domain").value;
// console.log(devPK);
// console.log(domain);
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
		let url = "https://weiquaninfo.cn/wxPublicAccount/getAccessToken";
		fetch(url)
			.then(res => {
				let contentType = res.headers.get("Content-Type");
				if (res.status == 200 && contentType && contentType.includes("application/json")) {
					return res.json();
				} else {
					throw new Error(`status:${res.status} contentType:${contentType}`);
				}
			})
			.then(resJson => {
				// 成功
				if (resJson.stat == "success") {
					alert("success");
				}
				return resJson;
			})
			.catch(error => {
				console.log(error);
				alert(`数据交互失败：${error.message}`);
			})
		// var that = this;
		// Toast.loading("试题加载中", 0);
		// setTimeout(() => {
		// 	that.getServerData();
		// }, 500)
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
		// 是否有错
		let wrongs = 0;
		for (let i = 0; i < this.state.value.length; i++) {
			if (answer[i] != this.state.value[i]) {
				wrongs++;
			}
		}
		if (wrongs > 0) {
			// 有错
			var that = this;
			this.setState({
				isShowPage: false,
				isShowCorrect: false,
				isShowWrong: true,
				wrongNumber: wrongs,
				// title: title,
				// data: data,
			})
			Toast.loading("试题重新加载中", 0);
			setTimeout(() => {
				that.getServerData();
				that.setState({
					value: ["", "", "", "", ""],
					title: title,
				})
			}, 3000)
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
			}, 3000)
		}
	}
	//
	getServerData() {
		var that = this;
		var url = `http://${domain}/subject/?time=${Math.random()}&user=${devPK}`;
		var url2 = `http://10.10.11.88/subject/?time=${Math.random()}&user=${devPK}`;
		var url3 = `http://portal.doublecom.net/subject/?time=${Math.random()}&user=${devPK}`;

		//
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			alert("不支持XMLHttpRequest");
			return;
		}
		xhr.open("GET", url3, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				// document.getElementById("myDiv").innerHTML = xhr.responseText;
				let result = eval(xhr.responseText);
				// console.log(result);
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
			}
		}
		xhr.send(null);
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