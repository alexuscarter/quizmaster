const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },
  {
    question: "Which HTML element is used to display an image?",
    options: ["<image>", "<picture>", "<img>", "<src>"],
    answer: 2,
  },
  {
    question: "Which CSS property changes the text color?",
    options: ["font-style", "text-color", "color", "background-color"],
    answer: 2,
  },
  {
    question: "Which CSS property controls the space outside an element?",
    options: ["padding", "margin", "border", "spacing"],
    answer: 1,
  },
  {
    question: "How do you select an element with the ID 'header' in CSS?",
    options: [".header", "#header", "*header", "header"],
    answer: 1,
  },
  {
    question:
      "Which keyword declares a variable that can be reassigned in JavaScript?",
    options: ["const", "let", "static", "define"],
    answer: 1,
  },
  {
    question: "Which method adds an element to the end of a JavaScript array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question: "What does === check in JavaScript?",
    options: [
      "Only value equality",
      "Only type equality",
      "Value and type equality",
      "Whether two variables exist",
    ],
    answer: 2,
  },
  {
    question:
      "Which JavaScript function prints a message to the browser console?",
    options: ["print()", "console.log()", "document.write()", "alert.log()"],
    answer: 1,
  },
];
const questionCount = document.getElementById("question-count");
const bestScore = document.getElementById("best-score");
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
questionText = document.getElementById("question-text");
progressBar = document.getElementById("progress-bar");

// Start the quiz

const startQuiz = () => {
  startScreen.setAttribute("hidden", "");
  quizScreen.removeAttribute("hidden");
  questionCount.textContent = questions.length;
  bestScore.textContent = 0;
  score.textContent = 0;
  progressBar.style.width = "0%";
  currentQuestion = 0;
  showQuestion();
};

const showQuestion = () => {
  const question = questions[currentQuestion];
  questionText.textContent = question.question;
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
};

startScreen.addEventListener("click", startQuiz);
