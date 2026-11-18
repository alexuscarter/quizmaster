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
const finalScore = document.getElementById("final-score");
const finalTotal = document.getElementById("final-total");
const resultsMessage = document.getElementById("results-message");
const bestMessage = document.getElementById("best-message");
const ring = document.getElementById("score-ring");
const reviewList = document.getElementById("review-list");
const playAgainBtn = document.getElementById("restart-btn");
let currentQuestion = 0;
let score = 0;
let wrongAnswers = [];

questionCount.textContent = questions.length;

// Start the quiz

const startQuiz = () => {
  showScreen(quizScreen);
  scoreText.textContent = 0;
  feedback.hidden = true;
  score = 0;
  progressBar.style.width = "0%";
  wrongAnswers = [];
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
  nextBtn.hidden = true;
  feedback.hidden = true;
  ///making html elements for the answers

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
    button.addEventListener("click", () => checkAnswer(index));
    answersEl.append(button);
  });
};

const checkAnswer = (answerIndex) => {
  const answerButtons = answersEl.querySelectorAll(".answer");
  const correctIndex = questions[currentQuestion].correct;
  const question = questions[currentQuestion];

  if (answerIndex === correctIndex) {
    score++;
    scoreText.textContent = score;
    feedback.textContent = "Correct!";
    feedback.classList.add("is-correct");
    feedback.classList.remove("is-wrong");
    answerButtons[answerIndex].classList.add("is-correct");
  } else {
    wrongAnswers.push({
      question: question.question,
      yours: question.answers[answerIndex],
      correct: question.answers[correctIndex],
    });
    feedback.textContent = `Sorry, the correct answer is ${question.answers[correctIndex]}!`;
    feedback.classList.add("is-wrong");
    feedback.classList.remove("is-correct");
    answerButtons[answerIndex].classList.add("is-wrong");
    console.log(wrongAnswers);
  }
  answerButtons.forEach((btn) => {
    btn.disabled = true;
  });
  feedback.hidden = false;
  nextBtn.hidden = false;
};

const nextQuestion = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
};

const showResults = () => {
  showScreen(resultsScreen);
  finalScore.textContent = score;
  ring.style.setProperty("--percent", score * 10);
  resultsMessage.textContent = `You got ${score} out of ${questions.length} questions correct!`;
  bestScore.textContent = score;
  bestMessage.textContent = `Your best score is ${bestScore.textContent}!`;

  reviewList.innerHTML = "";
  wrongAnswers.forEach((item) => {
    const li = document.createElement("li");
    li.className = "review__item";

    const question = document.createElement("p");
    question.className = "review__question";
    question.textContent = item.question;

    const answer = document.createElement("p");
    answer.className = "review__answer";

    const yours = document.createElement("span");
    yours.className = "review__yours";
    yours.textContent = `Your answer: ${item.yours}`;

    const correct = document.createElement("span");
    correct.className = "review__correct";
    correct.textContent = `Correct: ${item.correct}`;

    answer.append(yours, correct);
    li.append(question, answer);
    reviewList.append(li);
  });
};

const playAgain = () => {
  showScreen(startScreen);
  bestScore.textContent = 0;
  currentQuestion = 0;
  score = 0;
  wrongAnswers = [];
  showQuestion();
};
//event listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
playAgainBtn.addEventListener("click", playAgain);

document.addEventListener("keydown", (event) => {
  if (quizScreen.hidden) return;

  if (event.key >= "1" && event.key <= "4") {
    const index = Number(event.key) - 1;
    const answerButtons = answersEl.querySelectorAll(".answer");
    if (!answerButtons[index] || answerButtons[index].disabled) return;
    checkAnswer(index);
  }

  if (event.key === "Enter" && !nextBtn.hidden) {
    nextQuestion();
  }
});
