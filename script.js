let questions = [];
let currentQuestionIndex = -1;
let totalQuestions = 0;

fetch("./questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    totalQuestions = questions.length;
    nextQuestion();
  })
  .catch((error) => console.error("Error loading questions:", error));

function nextQuestion() {
  usedQuestions = JSON.parse(localStorage.getItem("usedQuestions")) || [];

  if (currentQuestionIndex !== -1) {
    usedQuestions.push(currentQuestionIndex);
    localStorage.setItem("usedQuestions", JSON.stringify(usedQuestions));
  }

  if (usedQuestions.length === questions.length) {
    usedQuestions = [];
  }

  let newQuestionIndex;
  do {
    newQuestionIndex = Math.floor(Math.random() * questions.length);
  } while (usedQuestions.includes(newQuestionIndex));

  currentQuestionIndex = newQuestionIndex;

  const question = questions[newQuestionIndex];
  displayQuestion(question);
  updateCounter();
}

function resetQuestions() {
  currentQuestionIndex = -1;
  localStorage.setItem("usedQuestions", JSON.stringify([]));
  nextQuestion();
}

function updateCounter() {
  const counterElement = document.getElementById("counter");
  counterElement.textContent = `${
    JSON.parse(localStorage.getItem("usedQuestions")).length
  }/${totalQuestions}`;
}

function displayQuestion(question) {
  const questionElement = document.getElementById("question");
  const questionImageElement = document.getElementById("question-image");
  const answersContainer = document.getElementById("answers-container");
  const resultElement = document.getElementById("result");
  const statusElement = document.getElementById("status");
  const explanationElement = document.getElementById("explanation");

  questionElement.textContent = question.question;

  if (question.image) {
    questionImageElement.src = "./images/" + question.image;
    questionImageElement.style.display = "block";
  } else {
    questionImageElement.style.display = "none";
  }

  answersContainer.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const answerDiv = document.createElement("div");
    answerDiv.className = "answer";

    const answerCheckbox = document.createElement("input");
    answerCheckbox.type = "radio";
    answerCheckbox.id = `answer${index}`;
    answerCheckbox.name = "answer";
    answerCheckbox.value = index;

    const answerLabel = document.createElement("label");
    answerLabel.htmlFor = `answer${index}`;
    answerLabel.textContent = answer;

    answerDiv.appendChild(answerCheckbox);
    answerDiv.appendChild(answerLabel);
    answersContainer.appendChild(answerDiv);
  });

  resultElement.style.display = "none";
  statusElement.textContent = "";
  explanationElement.textContent = "";
}

function submitQuiz() {
  const selectedAnswer = Array.from(
    document.querySelectorAll('input[name="answer"]:checked')
  ).map((cb) => parseInt(cb.value))[0];
  const question = questions[currentQuestionIndex];
  const resultElement = document.getElementById("result");
  const statusElement = document.getElementById("status");
  const explanationElement = document.getElementById("explanation");

  // const selectedAnswers2 = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(cb => parseInt(cb.name.split('answer')[1]));
  // const correctAnswers2 = question.correct_answers;

  const questionAnswers = question.answers;
  const correctAnswer = question.correct_answer;

  resultElement.style.display = "block";

  if (selectedAnswer === correctAnswer) {
    statusElement.textContent = "Đúng";
    statusElement.style.color = "green";
  } else {
    statusElement.textContent = "Sai";
    statusElement.style.color = "red";
  }

  if (question.explanation) {
    explanationElement.textContent = question.explanation;
  }
}
