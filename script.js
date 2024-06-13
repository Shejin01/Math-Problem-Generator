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
let roundDecimal = document.getElementById("RoundDecimal");
let stepsMenu = document.getElementById("stepsMenu");

function randomBetween(min, max) {
	min = Number(min);
	max = Number(max);
	return Number(Math.floor(Math.random() * (max - min + 1)) + min);
}

function createProblem() {
	var operation = document.getElementById("operation");
	if (operation.value == "quadratic_formula") {
		createQuadraticFormulaProblem();
		return;
	}
	createArithmeticProblem();
}

function createArithmeticProblem() {
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
			if (roundDecimal.checked) problem.dataset.answer = Math.round(a/b * 100) / 100;
			else problem.dataset.answer = Math.floor(a/b * 100) / 100;

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

function createQuadraticFormulaProblem() {
	var div = document.createElement("div");
	var problem = document.createElement("p");
	var answerBox = document.createElement("input")

	div.classList.add("question");
	problem.classList.add("problem");
	answerBox.classList.add("answerBox");
	answerBox.setAttribute("type", "text");
	answerBox.setAttribute("title", "Answer");
	answerBox.setAttribute("placeholder", "Answer Format: a, b");

	let a =	randomBetween(lowerLimit.value, upperLimit.value);
	let b = randomBetween(lowerLimit.value, upperLimit.value);

	problem.innerHTML = String.raw`\[x^2 + ${-a-b}x + ${a*b} = 0 \]`;
	
	problem.dataset.answer = `${a}, ${b}`;
	problem.dataset.answer2 = `${b}, ${a}`;
	
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
		if (questions[i].children[0].dataset.answer == questions[i].children[1].value || questions[i].children[0].dataset.answer2 == questions[i].children[1].value) {
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
	changeSettingsResolution();
	
}

function changeSettingsResolution() {
	if (settingsMenu.classList.contains("hidden")) {
		settingsMenu.style.width = "0px";
		settingsMenu.style.height = "0px";
	}
	else {
		if (window.innerWidth > 516) {
			settingsMenu.style.width = "200px";
			settingsMenu.style.height = "100vh";
			settingsMenu.style.borderWidth = "0px 1px 0px 0px";
		}
		else {
			settingsMenu.style.width = "100vw";
			settingsMenu.style.height = "150px";
			settingsMenu.style.borderWidth = "0px 0px 1px 0px";
		}
	}
}

window.addEventListener("resize", (event) => {
	changeSettingsResolution();
});

/*function showStepsMenu() {
	stepsMenu.classList.toggle("hidden");
}*/