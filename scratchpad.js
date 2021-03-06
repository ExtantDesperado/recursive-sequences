document.title = "Recursive Sequences";


function highlight(className) {
	var nodelist = document.getElementsByClassName(className);
	console.log("highlighting");
	for (var i = 0; i < nodelist.length; i++) {
		nodelist[i].style.backgroundColor = "yellow";
	}
}

function unhighlight(className) {
	var nodelist = document.getElementsByClassName(className);
	console.log("highlighting");
	for (var i = 0; i < nodelist.length; i++) {
		nodelist[i].style.backgroundColor = "rgba(0,0,0,0)";
	}
}

function addListeners(sequence,n) {
	for (var i = 0; i <= n; i++) {
		var nodelist = document.getElementsByClassName(sequence + i);
		for (var j = 0; j < nodelist.length; j++) {
			nodelist[j].addEventListener("mouseover",function(){ highlight(this.className); });
			nodelist[j].addEventListener("mouseout",function(){ unhighlight(this.className); });
		}
	}
}

function fibMaker(n) {
	var data = document.createElement("td");
	var text = document.createElement("p");
	text.setAttribute("class","fib" + n);
	data.appendChild(text);
	var value;


	if (n < 2) {

		if (n == 0) {

			value = 0;

		}

		if (n == 1) {

			value = 1;

		}

	} else {

		var table = document.createElement("table");

		data.appendChild(table);

		var row = document.createElement("tr");

		table.appendChild(row);

		var left = fibMaker(n-1);

		var right = fibMaker(n-2);

		row.appendChild(left.html);

		row.appendChild(right.html);

		value = left.value + right.value;

	}

	text.textContent = "fib(" + n + ") = " + value;

	return { 'value': value, 'html': data };

}



function pellMaker(n) {

	var data = document.createElement("td");

	var text = document.createElement("p");

	text.setAttribute("class","pell" + n);
	data.appendChild(text);

	var value;


	if (n < 2) {

		if (n == 0) {

			value = 0;

		}

		if (n == 1) {

			value = 1;

		}

	} else {

		var table = document.createElement("table");

		data.appendChild(table);

		var row = document.createElement("tr");

		table.appendChild(row);

		var left = pellMaker(n-1);

		var right = pellMaker(n-2);

		row.appendChild(left.html);

		row.appendChild(right.html);

		value = 2*left.value + right.value;

	}

	text.textContent = "pell(" + n + ") = " + value;

	return { 'value': value, 'html': data };

}



function triMaker(n) {

	var data = document.createElement("td");

	var text = document.createElement("p");
	text.setAttribute("class","tri" + n);
	data.appendChild(text);

	var value;


	if (n < 3) {

		if (n == 0) {

			value = 0;

		}

		if (n == 1) {

			value = 0;

		}

		if (n == 2) {

			value = 1;

		}

	} else {

		var table = document.createElement("table");

		data.appendChild(table);

		var row = document.createElement("tr");
	
		table.appendChild(row);

		var left = triMaker(n-1);

		var center = triMaker(n-2);

		var right = triMaker(n-3);

		row.appendChild(left.html);

		row.appendChild(center.html);

		row.appendChild(right.html);

		value = left.value + center.value + right.value;

	}

	text.textContent = "tri(" + n + ") = " + value;

	return { 'value': value, 'html': data };

}



function treeMaker(sequence, n) {

	var currTree = document.querySelector("#" + sequence + "Tree");
	if (currTree === null) {
		var table = document.createElement("table");

		table.id = sequence + "Tree";

		document.body.appendChild(table);

	} else {
		var table = currTree;
		table.removeChild(table.firstChild);
	}
	switch(sequence) {

		case "fib":
 
			table.appendChild(fibMaker(n).html); break;

		case "pell":

			table.appendChild(pellMaker(n).html); break;

		case "tri":

			table.appendChild(triMaker(n).html); break;

		default:;

	}

	addListeners(sequence,n);
}



function addLink(sequence) {

	var link = document.createElement("a");

	var head = document.createElement("h3");

	link.appendChild(head);

	switch(sequence) {

		case "fib":

			link.setAttribute("href", "https://oeis.org/A000045");

			head.textContent = "Fibonacci Sequence"; break;

		case "pell":

			link.setAttribute("href", "https://oeis.org/A000129");

			head.textContent = "Pell Sequence"; break;

		case "tri":

			link.setAttribute("href", "https://oeis.org/A000073");

			head.textContent = "Tribonacci Sequence";  break;

	}

	document.body.appendChild(link);

}


function addInputs(sequence) {
	var slider = document.createElement("input");
	slider.id = sequence + "Slider";
	slider.type = "range";
	slider.min = 0;
	slider.max = 20;
	slider.value = 0;
	document.body.appendChild(slider);

	var button = document.createElement("input");
	button.id = sequence + "Button";
	button.type = "button";
	button.value = sequence + "(0)";
	document.body.appendChild(button);

	slider.addEventListener("change", function(){
		button.value = sequence + "(" + slider.value + ")";
	});

	button.addEventListener("click", function(){
		treeMaker(sequence,slider.value);
	});
}


addLink("fib");
addInputs("fib");
treeMaker("fib",0);


addLink("pell");

addInputs("pell");
treeMaker("pell",0);


addLink("tri");

addInputs("tri");
treeMaker("tri",0);



var style = document.createElement("style");

style.textContent = "table {text-align: center; width: 100%;}" +

	"td {white-space: nowrap; background: rgba(255,255,255,0.1); /*border-radius: 30px;*/}" +

	//"table {border-radius: 30px;}" +
	"#fibTree {background-color: red;}" +

	"#pellTree {background-color: green;}" +

	"#triTree {background-color: blue;}" +
	"input {margin: 5px;}" +
	"p {padding: 15px 0px; margin: 0px;}";
document.body.appendChild(style);
