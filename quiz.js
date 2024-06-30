
const params = new URL(document.location).searchParams
const id = params.get('id');
let questionOrder = 1


function fetchQuizQuestions() {
  console.log(id)
  fetch(`https://opentdb.com/api.php?amount=5&category=${id}&difficulty=medium&type=multiple`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result)
      displayQuizQuestions(result.results[0]);      
    })
    .catch((error) => {
      console.log(error);
    })
}

fetchQuizQuestions();

function displayQuizQuestions(question) {
  console.log(question)
  const quizContainer = document.getElementById('quiz-contianer');

  const header = document.createElement('h2');
  header.innerText = `Question ${questionOrder}`;
  
  const questionDiv = document.createElement('div');
  questionDiv.innerHTML = question.question;


  quizContainer.append(header);
  quizContainer.append(questionDiv);

  
  for (let i = 0; i < question.incorrect_answers.length; i++) {
    console.log(question.incorrect_answers[i]);
    const incorrectAnswers = document.createElement('input');
    incorrectAnswers.type = 'radio';
    incorrectAnswers.name = 'answers';
    const label = document.createElement('label');
    label.innerText = question.incorrect_answers[i];

    quizContainer.append(incorrectAnswers, label)
    
    }
    
  const correctAnswer = document.createElement('input');
  correctAnswer.type = 'radio';
  correctAnswer.name = 'answers';
  const label = document.createElement('label');
  label.innerText = question.correct_answer;


  quizContainer.append(correctAnswer, label);
  

  const submit = document.createElement('button');
  submit.innerText = 'submit';
  quizContainer.append(submit);

}


