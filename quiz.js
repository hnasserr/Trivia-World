
const params = new URL(document.location).searchParams
const id = params.get('id');
const difficulty = params.get('difficulty');
let questionOrder = 0;




function fetchQuizQuestions() {
  console.log(id)
  fetch(`https://opentdb.com/api.php?amount=5&category=${id}&difficulty=medium&type=multiple`)
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

function displayQuizQuestions(questionArray) {
  const question = questionArray[questionOrder];
  console.log(question)
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = '';
  const header = document.createElement('h2');
  header.innerText = `Question ${questionOrder + 1}`;
  
  const questionDiv = document.createElement('div');
  questionDiv.innerHTML = question.question;


  quizContainer.append(header);
  quizContainer.append(questionDiv);


  // 1. spread the correct answer and the incorrect answers in one array.
  // 2. shuffle the asnwers.
  
  const randomisedAnswers = randomiseAnswers(question);
  
  
  // 3. display the answers as radio buttons. 
  randomisedAnswers.forEach((answer) => {
    const answerInput = document.createElement('input');
    answerInput.type = 'radio';
    answerInput.name = 'answers';
    answerInput.value = answer;
    const answerLabel = document.createElement('label');
    answerLabel.innerText = answer;

    quizContainer.append(answerInput, answerLabel);
  })

  const submit = document.createElement('button');
  submit.innerText = 'submit';
  quizContainer.append(submit);
  

  submit.addEventListener('click', () => handleSubmitAnswer(questionArray, question, submit));
}


function randomiseAnswers(question) {
  let allAnswers = [question.correct_answer,...question.incorrect_answers];
  allAnswers = allAnswers.sort(() => Math.random() - 0.5);
  console.log(allAnswers)
  return allAnswers;  
}
  // console.log('allanswers 2 :>> ', allAnswers);
  
  
  function handleSubmitAnswer(questionArray, question, submit) {
    const nothingSelected = document.querySelector('#nothing');
    nothingSelected.innerText = '';
    const selectedAnswer = document.querySelector('input[type="radio"]:checked');

  if (selectedAnswer) {    
    const userAnswer = selectedAnswer.value;
    const feedback = document.createElement('div');

    if (userAnswer === question.correct_answer) {
      feedback.innerText = 'Correct!!';
      feedback.style.color = 'green';
    } else {
      feedback.innerText = `Incorrect, the correct answer is: ${question.correct_answer}.`
      feedback.style.color = 'red';
    }  
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.append(feedback);   
    submit.disabled = true;
    questionOrder++
    setTimeout(() => {displayQuizQuestions(questionArray)}, 2000);

    } else {     
      nothingSelected.innerText = 'No answers selected yet...'
      nothingSelected.style.color = 'orange';      
    }
}

