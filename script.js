const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    correct: 0,
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: ["<link>", "<a>", "<href>", "<url>"],
    correct: 1,
  },
  {
    question: "Which HTML element is used to display an image?",
    answers: ["<image>", "<picture>", "<img>", "<src>"],
    correct: 2,
  },
  {
    question: "Which CSS property changes the text color?",
    answers: ["font-style", "text-color", "color", "background-color"],
    correct: 2,
  },
  {
    question: "Which CSS property controls the space outside an element?",
    answers: ["padding", "margin", "border", "spacing"],
    correct: 1,
  },
  {
    question: "How do you select an element with the ID 'header' in CSS?",
    answers: [".header", "#header", "*header", "header"],
    correct: 1,
  },
  {
    question:
      "Which keyword declares a variable that can be reassigned in JavaScript?",
    answers: ["const", "let", "static", "define"],
    correct: 1,
  },
  {
    question: "Which method adds an element to the end of a JavaScript array?",
    answers: ["push()", "pop()", "shift()", "unshift()"],
    correct: 0,
  },
  {
    question: "What does === check in JavaScript?",
    answers: [
      "Only value equality",
      "Only type equality",
      "Value and type equality",
      "Whether two variables exist",
    ],
    correct: 2,
  },
  {
    question:
      "Which JavaScript function prints a message to the browser console?",
    answers: ["print()", "console.log()", "document.write()", "alert.log()"],
    correct: 1,
  },
];
const questionCount = document.getElementById("question-count");
const bestScore = document.getElementById("best-score");
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
questionText = document.getElementById("question-text");
progressBar = document.getElementById("progress-bar");
const scoreText = document.getElementById("score");
currentNumber = document.getElementById("current-number");
totalNumber = document.getElementById("total-number");
const answersEl = document.getElementById("answers");

let currentQuestion = 0;

// Start the quiz

const startQuiz = () => {
  startScreen.setAttribute("hidden", "");
  quizScreen.removeAttribute("hidden");
  questionCount.textContent = questions.length;
  bestScore.textContent = 0;
  scoreText.textContent = 0;
  progressBar.style.width = "0%";

  showQuestion();
};

const showQuestion = () => {
  const question = questions[currentQuestion];
  questionText.textContent = question.question;
  currentNumber.textContent = currentQuestion + 1;
  totalNumber.textContent = questions.length;

  question.answers.forEach((text, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";

    const key = document.createElement("span");
    key.className = "answer__key";
    key.textContent = index + 1; // 1, 2, 3, 4

    const label = document.createElement("span");
    label.className = "answer__text";
    label.textContent = text; // safe — no HTML injection

    button.append(key, label);
    answersEl.append(button);
  });
};

startBtn.addEventListener("click", startQuiz);
