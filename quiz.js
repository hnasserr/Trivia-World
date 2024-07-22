
let questionOrder = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;




function fetchQuizQuestions() {
  const params = new URL(document.location).searchParams
  const id = params.get('id');
  const difficulty = params.get('difficulty');

  console.log(id)
  fetch(`https://opentdb.com/api.php?amount=5&category=${id}&difficulty=${difficulty}&type=multiple`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result)
      displayQuizQuestions(result.results);      
    })
    .catch((error) => {
      console.log(error);
    })
}

fetchQuizQuestions();

function displayQuizQuestions(questionsArray) {
  const question = questionsArray[questionOrder];
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = '';

  const header = document.createElement('h2');
  header.innerText = `Question ${questionOrder + 1}`;
  
  const questionDiv = document.createElement('div');
  questionDiv.classList = ('question')
  questionDiv.innerHTML = question.question;


  quizContainer.append(header);
  quizContainer.append(questionDiv);


  // 1. spread the correct answer and the incorrect answers in one array.
  // 2. shuffle the asnwers.
  // 3. display the answers as radio buttons. 

  
  const randomisedAnswers = randomizeAnswers(question);
  

  randomisedAnswers.forEach((answer) => {
    const answerContainer = document.createElement('div');
    answerContainer.classList.add('answer-container');
    const answerInput = document.createElement('input');
    answerInput.type = 'radio';
    answerInput.name = 'answers';
    answerInput.value = answer;
    const answerLabel = document.createElement('label');
    // answerLabel.innerText = answer;
    answerLabel.innerHTML = answer;
    answerContainer.append(answerInput, answerLabel);
    quizContainer.append(answerContainer);
  })

  const submit = document.createElement('button');
  submit.innerText = 'submit';
  quizContainer.append(submit);
  

  submit.addEventListener('click', () => handleSubmitAnswer(questionsArray, question, submit));
}


function randomizeAnswers(question) {
  let allAnswers = [...question.incorrect_answers, question.correct_answer];
  allAnswers = allAnswers.sort(() => Math.random() - 0.5);
  console.log(allAnswers)
  return allAnswers;  
}
  // console.log('allanswers 2 :>> ', allAnswers);


function handleSubmitAnswer(questionsArray, question, submit) {
  const selectedAnswer = document.querySelector('input[type="radio"]:checked');
  const nothingSelected = document.getElementById('nothing');
  nothingSelected.innerHTML = '';
  if (selectedAnswer) {    
    const userAnswer = selectedAnswer.value;
    const feedback = document.createElement('div');

    if (userAnswer === question.correct_answer) {
      feedback.innerText = 'Correct!!';
      feedback.style.color = 'green';
      correctAnswersCount++
    } else {
      feedback.innerText = `Incorrect, the correct answer is: ${question.correct_answer}.`
      feedback.style.color = 'red';
      incorrectAnswersCount++
    }
    const quizContainer = document.querySelector('.questions');
    quizContainer.append(feedback);
    submit.disabled = true;
    
    handleNextButton(questionsArray, quizContainer);

    } else {
      nothingSelected.innerText = 'No answers selected yet...'
      nothingSelected.style.color = 'orange';
    }
}

function handleNextButton(questionsArray, quizContainer) {
  const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    quizContainer.append(nextButton);
    nextButton.addEventListener('click', () => {
      questionOrder++;
      if (questionOrder < questionsArray.length) {
        displayQuizQuestions(questionsArray);
      } else {
        displayFinalScore(quizContainer);
      }
    })
}

function displayFinalScore(quizContainer) {
  quizContainer.innerHTML = '';

  const scoreSection = document.createElement('div');
  scoreSection.classList.add('score-section');

  scoreSection.innerHTML = ` 
    <h2>Quiz Completed!</h2>
    <p>Correct Answers: ${correctAnswersCount}</p>
    <p>Incorrect Answers: ${incorrectAnswersCount}</p>
    <p>Total: ${correctAnswersCount}/5</p>
  `

  const message = document.createElement('p');
  
  message.textContent = correctAnswersCount >= 3 ? 
  'Well done! You did great. 🔥': 
  'Better luck next time. Keep learning. ☠️'
  
  message.classList.add('message');
  message.classList.add((correctAnswersCount >= 3) ? 'success' : 'fail')

  
  scoreSection.append(message);
  quizContainer.append(scoreSection);
  
  const categoriesBtn = document.createElement('button');
  categoriesBtn.innerText = 'Categories';
  categoriesBtn.classList.add('categories-btn');

  categoriesBtn.addEventListener('click', () => {
    window.location.href = 'categories.html';
  })

  const categoriesbuttonLink = document.querySelector('.button-link');
  if (categoriesbuttonLink) {
    categoriesbuttonLink.remove();
  }

  quizContainer.append(categoriesBtn);
  
}
