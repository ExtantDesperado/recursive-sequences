document.title = "Recursive Sequences";


function fibMaker(n) {
	var data = document.createElement("td");
	var text = document.createElement("p");
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

		table.setAttribute("id",sequence + "Tree");

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



addLink("fib");





var fibSlider = document.createElement("input");
fibSlider.type = "range";
fibSlider.min = 0;
fibSlider.max = 20;
fibSlider.value = 0;
document.body.appendChild(fibSlider);



var fibButton = document.createElement("input");
fibButton.type = "button";
fibButton.value = "Fib(0)";
document.body.appendChild(fibButton);

fibSlider.addEventListener("change", function(){
	fibButton.value = "Fib(" + fibSlider.value + ")";
});

fibButton.addEventListener("click", function(){
	treeMaker("fib",fibSlider.value);
});



treeMaker("fib",0);

addLink("pell");

treeMaker("pell",0);

addLink("tri");

treeMaker("tri",0);



var style = document.createElement("style");

style.textContent = "table {text-align: center; width: 100%;}" +

	"td {white-space: nowrap; background: rgba(255,255,255,0.1);}" +

	"#fibTree {background-color: red;}" +

	"#pellTree {background-color: green;}" +

	"#triTree {background-color: blue;}";

document.body.appendChild(style);
