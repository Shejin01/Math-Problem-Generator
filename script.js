MathJax = {
  loader: {load: ['input/asciimath', 'output/chtml']}
}

function createProblem() {
	var textP = document.createElement("p");
	textP.classList.add("problem");
	var operation = document.getElementById("operation");

	let a = Math.floor(Math.random() * 20);
	let b = Math.floor(Math.random() * 20);

	if (operation.value == '+') {
		textP.innerHTML = String.raw`\[${a} + ${b} = ${a+b}\]`;
	}
	if (operation.value == '-') {
		textP.innerHTML = String.raw`\[${a} - ${b} = ${a-b}\]`;
	}
	if (operation.value == '*') {
		textP.innerHTML = String.raw`\[${a} \times ${b} = ${a*b}\]`;
	}
	if (operation.value == '/') {
		textP.innerHTML = String.raw`\[\frac{${a}}{${b}} = ${a/b}\]`;
	}
	
	document.body.appendChild(textP);
	MathJax.typeset();
}

function clearProblems() {
	let problems = document.getElementsByClassName("problem");
	while (problems.length > 0) {
		problems[0].remove();
	}
}