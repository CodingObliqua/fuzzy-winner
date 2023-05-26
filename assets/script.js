// Define quiz questions and answers
const questions = [
  {
    question: " What is the correct HTML tag for inserting a line break?",
    choices: ["A) <br>", "B) <break>", "C) <div>", "D) <header>"],
    correctAnswer: 0
  },
  {
    question: " How can you center align an element horizontally in CSS?",
    choices: ["A) text-align: center;", "B) align: center;", "C) horizontal-align: center;", "D) margin: auto;"],
    correctAnswer: 3
  },
  {
    question: " How can you change the color of a text in CSS?",
    choices: ["A) text-color", "B) color", "C) font-color", "D) text-style"],
    correctAnswer: 1
  },
  {
    question: "Which HTML tag is used to create a bulleted list?",
    choices: ["A) <ul>", "B) <ol>", "C) <li>", "D) <list>"],
    correctAnswer: 0
  },
  {
    question: " How can you center align an element horizontally in CSS?",
    choices: ["A) text-align: center;", "B) align: center;", "C) horizontal-align: center;", "D) margin: auto"],
    correctAnswer: 3
  },
  {
    question: "Which of the following is NOT a primitive data type in JavaScript?",
    choices: [
      "A) Number",
      "B) Boolean",
      "C) String",
      "D) Array"
    ],
    correctAnswer: 3
  },
  {
    question: "Which of the following is NOT a loop in JavaScript?",
    choices: [
      "A) for",
      "B) while",
      "C) do...while",
      "D) if...else"
    ],
    correctAnswer: 3
  },
  {
    question: "What is the result of the following expression in JavaScript: '2' + 2?",
    choices: [
      "A) '4'",
      "B) 4",
      "C) '22'",
      "D) NaN"
    ],
    correctAnswer: 2
  },
  {
    question: "What does the 'typeof' operator in JavaScript return?",
    choices: [
      "A) The data type of a variable",
      "B) The value of a variable",
      "C) The size of a variable",
      "D) The name of a variable"
    ],
    correctAnswer: 0
  },
  {
    question: "Which of the following is NOT a JavaScript comparison operator?",
    choices: [
      "A) ===",
      "B) <=",
      "C) ><",
      "D) !=="
    ],
    correctAnswer: 2
  },
];

// Variables to track quiz progress
let currentQuestion = 0;
let score = 0;
let timeLeft = 80; // Time in seconds
let timerInterval = null;

// DOM elements
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const initialsForm = document.getElementById("initials-form");
const highScoresElement = document.getElementById("high-scores");
const restartButton = document.getElementById("restart-button");
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");

// Function to start the quiz
function startQuiz() {
  startContainer.style.display = "none";
  quizContainer.style.display = "block";
  displayQuestion();
  startTimer();
}

// Function to display a question
function displayQuestion() {
  const { question, choices } = questions[currentQuestion];
  questionElement.textContent = question;
  choicesElement.innerHTML = "";

  choices.forEach((choice, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = choice;
    listItem.addEventListener("click", () => checkAnswer(index));
    choicesElement.appendChild(listItem);
  });
}

// Function to check the selected answer
function checkAnswer(selectedChoice) {
  const { correctAnswer } = questions[currentQuestion];

  if (selectedChoice === correctAnswer) {
    score++;
  } else {
    timeLeft -= 10;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to start the timer
function startTimer() {
  clearInterval(timerInterval); 
   timeLeft = 80;
  timerElement.textContent = `Time left: ${timeLeft}s`;
  
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);

  quizContainer.style.display = "none";
  scoreContainer.style.display = "block";
  scoreElement.textContent = `Your Score: ${score}/${questions.length}`;
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  scoreContainer.style.display = "none";
  startContainer.style.display = "block";

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  displayQuestion();
  startTimer();
}

// Function to save the high score
function saveHighScore() {
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value.toUpperCase();
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  const newScore = { initials, score };
  highScores.push(newScore);

  // Sort the high scores in descending order based on the score
  highScores.sort((a, b) => b.score - a.score);

  // Keep only the top 5 high scores
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  displayHighScores();
}

// Function to display the high scores
function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresElement.innerHTML = "";

  highScores.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
    highScoresElement.appendChild(listItem);
  });
}

// Event listener for the start button
startButton.addEventListener("click", startQuiz);

// Event listener for the initials form submission
initialsForm.addEventListener("submit", function(event) {
  event.preventDefault();
  saveHighScore();
});

// Event listener for the restart button
restartButton.addEventListener("click", restartQuiz);

// Call the displayHighScores function when the page loads
displayHighScores();