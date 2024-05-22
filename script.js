let questions = [];
let usedQuestions = [];
let currentQuestionIndex = -1;

fetch('./questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        nextQuestion();
    })
    .catch(error => console.error('Error loading questions:', error));

function nextQuestion() {
    if (usedQuestions.length === questions.length) {
        usedQuestions = [];
    }
    
    let newQuestionIndex;
    do {
        newQuestionIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(newQuestionIndex));
    
    currentQuestionIndex = newQuestionIndex;
    usedQuestions.push(newQuestionIndex);
    
    const question = questions[newQuestionIndex];
    displayQuestion(question);
}

function displayQuestion(question) {
    const questionElement = document.getElementById('question');
    const questionImageElement = document.getElementById('question-image');
    const answersContainer = document.getElementById('answers-container');
    const resultElement = document.getElementById('result');
    const statusElement = document.getElementById('status');
    const explanationElement = document.getElementById('explanation');

    questionElement.textContent = question.question;
    
    if (question.image) {
        questionImageElement.src = "./images/" + question.image;
        questionImageElement.style.display = 'block';
    } else {
        questionImageElement.style.display = 'none';
    }

    answersContainer.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';

        const answerCheckbox = document.createElement('input');
        answerCheckbox.type = 'checkbox';
        answerCheckbox.id = `answer${index}`;
        answerCheckbox.name = 'answer';
        answerCheckbox.value = index + 1;

        const answerLabel = document.createElement('label');
        answerLabel.htmlFor = `answer${index}`;
        answerLabel.textContent = answer;

        answerDiv.appendChild(answerCheckbox);
        answerDiv.appendChild(answerLabel);
        answersContainer.appendChild(answerDiv);
    });

    resultElement.style.display = 'none';
    statusElement.textContent = '';
    explanationElement.textContent = '';
}

function submitQuiz() {
    const selectedAnswers = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(cb => parseInt(cb.value));
    const question = questions[currentQuestionIndex];
    const correctAnswers = question.correct_answers.map(answer => parseInt(answer.split('.')[0]));

    const statusElement = document.getElementById('status');
    const explanationElement = document.getElementById('explanation');

    // const selectedAnswers2 = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(cb => parseInt(cb.name.split('answer')[1]));
    // const correctAnswers2 = question.correct_answers;

    const questionAnswers = question.answers;
    const correctAnswers2 = question.correct_answers;

    const selectedAnswersStr = selectedAnswers.map(answer => questionAnswers[answer - 1]);
    // console.log('selectedAnswersStr:', selectedAnswersStr);

    let trueCount = 0;
    let falseCount = 0;

    // console.log('questionAnswers:', questionAnswers);

    for(let i = 0; i < questionAnswers.length; i++) {
        const ans = questionAnswers[i];
        if (selectedAnswersStr.includes(ans)) {
            if (correctAnswers2.includes(ans)) {
                trueCount++;
            }
            else {
                falseCount++;
            }
        }
        else {
            if (correctAnswers2.includes(ans)) {
                falseCount++;
            }
        }
    }

    if(trueCount === correctAnswers2.length && falseCount === 0) {
        statusElement.textContent = 'Đúng';
        statusElement.style.color = 'green';
    }
    else if(trueCount > 0) {
        statusElement.textContent = 'Đúng một phần';
        statusElement.style.color = 'orange';
    }
    else {
        statusElement.textContent = 'Sai';
        statusElement.style.color = 'red';
    }


    explanationElement.textContent = `Giải thích: ${question.correct_answers.join(', ')}`;
    document.getElementById('result').style.display = 'block';
}
