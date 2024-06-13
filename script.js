let questions = [];
let currentQuestionIndex = -1;
let totalQuestions = 0;

fetch(`./data/${documentName}.json`)
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    totalQuestions = questions.length;
    // nextQuestion();
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
    localStorage.setItem("usedQuestions", JSON.stringify(usedQuestions));
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
    questionImageElement.src = question.image;
    questionImageElement.style.display = "block";
  } else {
    questionImageElement.style.display = "none";
  }

  answersContainer.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const answerDiv = document.createElement("div");
    answerDiv.className = "answer";

    const answerCheckbox = document.createElement("input");

    if (typeof question.correct_answer === "number") {
      answerCheckbox.type = "radio";
    } else {
      answerCheckbox.type = "checkbox";
    }

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
  let selectedAnswer = Array.from(
    document.querySelectorAll('input[name="answer"]:checked')
  ).map((cb) => parseInt(cb.value));

  if (selectedAnswer.length === 0) {
    alert("Vui lòng chọn câu trả lời");
    return;
  } else if (
    typeof questions[currentQuestionIndex].correct_answer === "number"
  ) {
    selectedAnswer = selectedAnswer[0];
  }

  const question = questions[currentQuestionIndex];
  const resultElement = document.getElementById("result");
  const statusElement = document.getElementById("status");
  const explanationElement = document.getElementById("explanation");

  const questionAnswers = question.answers;
  const correctAnswer = question.correct_answer;

  resultElement.style.display = "block";

  // if (selectedAnswer === correctAnswer) {
  //   statusElement.textContent = "Đúng";
  //   statusElement.style.color = "green";
  // } else {
  //   statusElement.textContent = "Sai";
  //   statusElement.style.color = "red";
  // }

  if (typeof question.correct_answer === "number") {
    if (selectedAnswer === question.correct_answer) {
      statusElement.textContent = "Đúng";
      statusElement.style.color = "green";
    } else {
      statusElement.textContent = "Sai";
      statusElement.style.color = "red";
    }
  } else {
    const correctAnswers = question.correct_answer;
    const correctAnswersSet = new Set(correctAnswers);
    const selectedAnswersSet = new Set(selectedAnswer);

    if (
      correctAnswersSet.size === selectedAnswersSet.size &&
      [...correctAnswersSet].every((value) => selectedAnswersSet.has(value))
    ) {
      statusElement.textContent = "Đúng";
      statusElement.style.color = "green";
    } else {
      statusElement.textContent = "Sai";
      statusElement.style.color = "red";
    }
  }

  correctText =
    typeof correctAnswer === "number"
      ? `Câu trả lời đúng: ${["A", "B", "C", "D"][correctAnswer]}`
      : `Câu trả lời đúng: ${correctAnswer
          .map((index) => index + 1)
          .join(", ")}`;
  explanationElement.innerHTML = correctText;

  if ("explanation" in question) {
    explanationElement.innerHTML += `<br/>Giải thích:<br/n>${question.explanation}`;
  }
}
