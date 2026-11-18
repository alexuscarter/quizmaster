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
const nextBtn = document.getElementById("next-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const questionText = document.getElementById("question-text");
const progressBar = document.getElementById("progress-bar");
const scoreText = document.getElementById("score");
const currentNumber = document.getElementById("current-number");
const totalNumber = document.getElementById("total-number");
const answersEl = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const screens = [startScreen, quizScreen, resultsScreen];

let currentQuestion = 0;
let score = 0;
questionCount.textContent = questions.length;

// Start the quiz

const startQuiz = () => {
  showScreen(quizScreen);
  bestScore.textContent = 0;
  scoreText.textContent = 0;
  feedback.hidden = true;
  score = 0;
  progressBar.style.width = "0%";

  showQuestion();
};

const showScreen = (currentScreen) => {
  screens.forEach((s) => {
    if (s === currentScreen) {
      s.hidden = false;
    } else {
      s.hidden = true;
    }
  });
};
const showQuestion = () => {
  const question = questions[currentQuestion];
  questionText.textContent = question.question;
  currentNumber.textContent = currentQuestion + 1;
  totalNumber.textContent = questions.length;
  answersEl.innerHTML = "";
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  ///making html elements for the answers

  question.answers.forEach((text, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.dataset.index = index;

    const key = document.createElement("span");
    key.className = "answer__key";
    key.textContent = index + 1; // 1, 2, 3, 4

    const label = document.createElement("span");
    label.className = "answer__text";
    label.textContent = text; // safe — no HTML injection

    button.append(key, label);
    button.addEventListener("click", () => checkAnswer(index));
    answersEl.append(button);
  });
};

const checkAnswer = (answerIndex) => {
  if (answerIndex === questions[currentQuestion].correct) {
    score++;
    scoreText.textContent = score;
    feedback.textContent = "Correct!";
    feedback.classList.add("is-correct");
    feedback.classList.remove("is-wrong");
  } else {
    scoreText.textContent = score;
    feedback.textContent = `Sorry, the correct answer is ${questions[currentQuestion].answers[questions[currentQuestion].correct]}!`;
    feedback.classList.add("is-wrong");
  }
  feedback.hidden = false;

  // answersEl.childNodes.forEach((btnChild) => {
  //   if (btnChild.nodeName === "BUTTON") {
  //     btnChild.disabled = true;
  //   }
  // });

  answersEl.children.forEach((btn) => (btn.disabled = true));
};

//event listeners
startBtn.addEventListener("click", startQuiz);
