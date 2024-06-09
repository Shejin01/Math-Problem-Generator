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

let questionHolder = document.getElementById("questionHolder");
let questions = document.getElementsByClassName("question");
let hideMenuButton = document.getElementById("HideMenuButton");
let settingsMenu = document.getElementById("settings");
let lowerLimit = document.getElementById("LowerLimit");
let upperLimit = document.getElementById("UpperLimit");

function randomBetween(min, max) {
	min = Number(min);
	max = Number(max);
	return Number(Math.floor(Math.random() * (max - min + 1)) + min);
}

function createProblem() {
	var div = document.createElement("div");
	var problem = document.createElement("p");
	var answerBox = document.createElement("input")
	var operation = document.getElementById("operation");

	div.classList.add("question");
	problem.classList.add("problem");
	answerBox.classList.add("answerBox");
	answerBox.setAttribute("type", "number");
	answerBox.setAttribute("title", "Answer");

	let a =	randomBetween(lowerLimit.value, upperLimit.value);
	let b = randomBetween(lowerLimit.value, upperLimit.value);

	switch (operation.value) {
		case '+': 
			problem.innerHTML = String.raw`\[${a} + ${b} = \]`;
			problem.dataset.answer = a+b;
			break;
		
		case '-':
			problem.innerHTML = String.raw`\[${a} - ${b} = \]`;
			problem.dataset.answer = a-b;
			break;
		
		case '*':
			problem.innerHTML = String.raw`\[${a} \times ${b} = \]`;
			problem.dataset.answer = a*b;
			break;
		
		case '/':
			if (b == 0) b = b + 1;
			problem.innerHTML = String.raw`\[\frac{${a}}{${b}} = \]`;
			problem.dataset.answer = Math.round(a/b * 100) / 100;
			break;
		
		default:
			break;
	}
	
	div.appendChild(problem);
	div.appendChild(answerBox);
	questionHolder.appendChild(div);
	questions = document.getElementsByClassName("question");
	MathJax.typeset();
}

function clearProblems() {
	while (questions.length > 0) questions[0].remove();
}

function clearLastProblem() {
	if (questions.length > 0) questions[questions.length-1].remove();
}

function checkAnswers() {
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].children[0].dataset.answer == questions[i].children[1].value) {
			questions[i].style.borderColor = "green";
		}
		else {
			questions[i].style.borderColor = "red";
			questions[i].animate(shakeAnimation, shakeTiming);
		}
	}
}

document.addEventListener("keypress", (event) => {
	if (event.code == "Enter") checkAnswers();
});

function hideMenu() {
	settingsMenu.classList.toggle("hidden");
	settingsMenu.style.width = settingsMenu.classList.contains("hidden") ? "0px" : "200px";
}