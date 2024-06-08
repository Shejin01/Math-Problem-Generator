MathJax = {
  loader: {load: ['input/asciimath', 'output/chtml']},
}

const shakeAnimation = [
	{rotate: "0deg"},
	{rotate: "3deg"},
	{rotate: "-3deg"}, 
	{rotate: "0deg"}
];
  
const shakeTiming = {
	duration: 300,
	iterations: 1,
};

function createProblem() {
	let questionHolder = document.getElementById("questionHolder");
	var div = document.createElement("div");
	var problem = document.createElement("p");
	var answerBox = document.createElement("input")
	var operation = document.getElementById("operation");

	div.classList.add("question")
	problem.classList.add("problem");
	problem.setAttribute("tabindex", "-1")
	answerBox.classList.add("answerBox");
	answerBox.setAttribute("type", "number");

	let a = Math.floor(Math.random() * 20);
	let b = Math.floor(Math.random() * 20);

	if (operation.value == '+') {
		problem.innerHTML = String.raw`\[${a} + ${b} = \]`;
		problem.value = a+b;
	}
	if (operation.value == '-') {
		problem.innerHTML = String.raw`\[${a} - ${b} = \]`;
		problem.value = a-b;
	}
	if (operation.value == '*') {
		problem.innerHTML = String.raw`\[${a} \times ${b} = \]`;
		problem.value = a*b;
	}
	if (operation.value == '/') {
		problem.innerHTML = String.raw`\[\frac{${a}}{${b}} = \]`;
		problem.value = Math.round(a/b * 100) / 100;
	}
	
	div.appendChild(problem);
	div.appendChild(answerBox);
	questionHolder.appendChild(div);

	MathJax.typeset();
}

function clearProblems() {
	let questions = document.getElementsByClassName("question");
	while (questions.length > 0) questions[0].remove();
}

function checkAnswers() {
	let questions = document.getElementsByClassName("question");
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].children[0].value == questions[i].children[1].value) {
			questions[i].style.borderColor = "green";
		}
		else {
			questions[i].style.borderColor = "red";
			questions[i].animate(shakeAnimation, shakeTiming);
		}
	}
	MathJax.typeset();
}

function clearLastProblem() {
	let questions = document.getElementsByClassName("question");
	questions[questions.length-1].remove();
}