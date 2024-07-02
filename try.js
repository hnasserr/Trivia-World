
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
      // displayQuizQuestions(result.results[0]);      
      displayQuizQuestions(result.results, 0);      
    })
    .catch((error) => {
      console.log(error);
    })
}


fetchQuizQuestions();


function displayQuizQuestions(questions, questionNumber) {
//1. clean up your html elements
const question = questions[questionNumber]
  console.log(question)
  const quizContainer = document.getElementById('quiz-contianer');

  const header = document.createElement('h2');
  header.innerText = `Question ${questionOrder}`;
  
  const questionDiv = document.createElement('div');
  questionDiv.innerHTML = question.question;


  quizContainer.append(header);
  quizContainer.append(questionDiv);


  // 1. spread the correct answer and the incorrect answers in one array.
  // 2. shuffle the asnwers.
  // 3. display the andwers as radio buttons. 
 

const randomisedQuestions =  randomiseQuestionsOrder(question)
 
  randomisedQuestions.forEach((answer) => {
    const answerInput = document.createElement('input');
    answerInput.type = 'radio';
    answerInput.name = 'answers';
    answerInput.value = answer;
    answerInput.setAttribute("class", "radioButton")
    const answerLabel = document.createElement('label');
    answerLabel.innerText = answer;

    quizContainer.append(answerInput, answerLabel);
  })

  const submit = document.createElement('button');
  submit.innerText = 'submit';
  quizContainer.append(submit); 

  // 1. store the user value in the input.value
  // 2. add event listener 
  // 3. add feedback 
  // 3. check if the user value is matching the correct answer. 
  
  
  addCheckQuestionEventListener(questions, questionNumber)
  
}


const addCheckQuestionEventListener =(questions, questionNumber) => {
  
  //3 add avent to submit button
  const submitButtom = document.querySelector("button")

  submitButtom.addEventListener("click", () => {
  console.log("button clicked");
  //1 find out the value of the checked radio button
  const checkedRadioButton = document.querySelector('input[type=radio]:checked')
    console.log('checkedRadioButton :>> ', checkedRadioButton);
    if (!checkedRadioButton) {
      alert("Click one first")
      noClickedAnserWarning()

    } else {
      const checkedRadioButtonValue = document.querySelector('input[type=radio]:checked').value
  // console.log('checkedRadioButtonValue :>> ', checkedRadioButtonValue);
      const isCorrect = checkedRadioButtonValue === questions[questionNumber].correct_answer
      
        console.log('isCorrect :>> ', isCorrect);
    if (!checkedRadioButtonValue) {
      alert("no checked answer")
    } else {
      alert("WRONG!!")
  }
    }

  displayQuizQuestions(questions, 1)
    

})
  

  
  

// console.log('checkedRadioButtonValue :>> ', checkedRadioButtonValue);
  
  //2 compare it with the right answer
 
  //display message showing if the asnwer was correct or not
  //go to next question


}


  function randomiseQuestionsOrder(question) { 
    let allAnswers = [...question.incorrect_answers, question.correct_answer];
    allAnswers = allAnswers.sort(() => Math.random - 0.5);
    return allAnswers
  }
  

// Add event listener to the submit button
  submit.addEventListener('click', () => {
    // Find the selected radio button
    const selectedAnswer = document.querySelector('input[name="answers"]:checked');
    
    if (selectedAnswer) {
      // Retrieve the value of the selected answer
      // This value is the one set in answerInput.value
      const userAnswer = selectedAnswer.value;

      const feedback = document.createElement('div');
      
      // Compare the selected answer to the correct answer
      if (userAnswer === question.correct_answer) {
        feedback.innerText = 'Correct!';
        feedback.style.color = 'green';
      } else {
        feedback.innerText = 'Incorrect. The correct answer is ' + question.correct_answer;
        feedback.style.color = 'red';
      }
      quizContainer.append(feedback);

    } else {
      alert('Please select an answer before submitting.');
    }
  });


