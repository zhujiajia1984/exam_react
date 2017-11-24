var logForm = document.getElementById("loginForm");
var devPK = document.getElementById("devpk").value;
var domain = document.getElementById("domain").value;
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

function getServerData() {
	var time = Math.random();
	var url1 = "http://10.10.11.88/subject/?time=" + time + "&user=" + devPK;
	var url2 = "http://portal.doublecom.net/subject/?time=" + time + "&user=" + devPK;
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		alert("不支持XMLHttpRequest");
		return;
	}
	xhr.open("GET", url1, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var result = eval(xhr.responseText);
			console.log(result);
			title = [];
			answer = [];
			for (var i = 0; i < result.length; i++) {
				title.push("Q" + (i + 1) + "：" + result[i].stem);
				dataG[i][0].label = result[i].answer1;
				dataG[i][1].label = result[i].answer2;
				dataG[i][2].label = result[i].answer3;
				dataG[i][3].label = result[i].answer4;
				answer.push(result[i].standard);
			}
			$("#title0").text(title[0]);
			$("#title1").text(title[1]);
			$("#title2").text(title[2]);
			$("#title3").text(title[3]);
			$("#title4").text(title[4]);
			for (i = 0; i < 4; i++) {
				(dataG[0][i].label == "" || dataG[0][i].label == "null") ? $("#sel0").find("div").eq(i).hide(): $("#sel0").find("p").eq(i).text(dataG[0][i].label);
				(dataG[1][i].label == "" || dataG[0][i].label == "null") ? $("#sel1").find("div").eq(i).hide(): $("#sel1").find("p").eq(i).text(dataG[1][i].label);
				(dataG[2][i].label == "" || dataG[0][i].label == "null") ? $("#sel2").find("div").eq(i).hide(): $("#sel2").find("p").eq(i).text(dataG[2][i].label);
				(dataG[3][i].label == "" || dataG[0][i].label == "null") ? $("#sel3").find("div").eq(i).hide(): $("#sel3").find("p").eq(i).text(dataG[3][i].label);
				(dataG[4][i].label == "" || dataG[0][i].label == "null") ? $("#sel4").find("div").eq(i).hide(): $("#sel4").find("p").eq(i).text(dataG[4][i].label);
			}
			$("#frame1").show();
		}
	}
	xhr.send(null);
}

//
$(document).ready(function() {
	getServerData();
	// 点击radio
	$("div[name='group']").click(function() {
		$(this).parent().find("input[type='radio']").removeAttr("checked");
		$(this).children("input[type='radio']").attr("checked", "true");
	})

	$("#tijiao").click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var value = ['', '', '', '', ''];
		for (var i = 0; i < 4; i++) {
			if ($("#sel0").find("input").eq(i).attr("checked") == "checked") {
				value[0] = $("#sel0").find("input").eq(i).attr("value");
			}
			if ($("#sel1").find("input").eq(i).attr("checked") == "checked") {
				value[1] = $("#sel1").find("input").eq(i).attr("value");
			}
			if ($("#sel2").find("input").eq(i).attr("checked") == "checked") {
				value[2] = $("#sel2").find("input").eq(i).attr("value");
			}
			if ($("#sel3").find("input").eq(i).attr("checked") == "checked") {
				value[3] = $("#sel3").find("input").eq(i).attr("value");
			}
			if ($("#sel4").find("input").eq(i).attr("checked") == "checked") {
				value[4] = $("#sel4").find("input").eq(i).attr("value");
			}
		}
		console.log(value)
		// //
		var noAnswer = 0;
		for (i = 0; i < 4; i++) {
			if (value[i] == "") { noAnswer++ }
		}
		if (noAnswer > 0) {
			alert("请先进行答题");
			return;
		}
		// 是否有错
		var wrongs = 0;
		for (i = 0; i < value.length; i++) {
			if (answer[i] != value[i]) {
				wrongs++;
			}
		}
		if (wrongs > 0) {
			alert("答案错误，共有" + wrongs + "道题答错了！试题即将重新加载");
			$("#frame1").hide();
			$("#sel0").find("input").removeAttr("checked");
			$("#sel1").find("input").removeAttr("checked");
			$("#sel2").find("input").removeAttr("checked");
			$("#sel3").find("input").removeAttr("checked");
			$("#sel4").find("input").removeAttr("checked");
			getServerData();
		} else {
			alert("答案正确，上网认证中...");
			logForm.submit();
		}
	})
})