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
    
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  // Function to initialize the quiz
  function initializeQuiz() {
    const questionElement = document.getElementById("question");
    const choicesElements = document.querySelectorAll(".choice");
    const submitButton = document.getElementById("submit");
    const scoreContainer = document.getElementById("score-container");
    const scoreElement = document.getElementById("score");
    const restartButton = document.getElementById("restart");
  
    // Function to display the current question
    function displayQuestion() {
      const { question, choices } = questions[currentQuestion];
      questionElement.textContent = question;
      choicesElements.forEach((choice, index) => {
        choice.textContent = choices[index];
        choice.addEventListener("click", checkAnswer);
      });
    }
  
    // Function to check the selected answer
    function checkAnswer() {
      const selectedChoice = parseInt(this.dataset.index);
      const { correctAnswer } = questions[currentQuestion];
      if (selectedChoice === correctAnswer) {
        score++;
      }
      currentQuestion++;
      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        displayScore();
      }
    }
  
    // Function to display the final score
    function displayScore() {
      questionElement.style.display = "none";
      choicesElements.forEach((choice) => {
        choice.style.display = "none";
      });
      submitButton.style.display = "none";
      scoreContainer.style.display = "block";
      scoreElement.textContent = `Your score: ${score}/${questions.length}`;
    }
  
    // Event listener for the submit button
    submitButton.addEventListener("click", checkAnswer);
  
    // Event listener for the restart button
    restartButton.addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      displayQuestion();
      questionElement.style.display = "block";
      choicesElements.forEach((choice) => {
        choice.style.display = "block";
      });
      submitButton.style.display = "block";
      scoreContainer.style.display = "none";
    });
  
    // Start the quiz
    displayQuestion();
  }
  
  // Call the initializeQuiz function when the page loads
  window.addEventListener("DOMContentLoaded", initializeQuiz);
