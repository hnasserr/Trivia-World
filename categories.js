console.log(staticCategories);

function fetchCategories() {
  fetch('https://opentdb.com/api_category.php')
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      displayCards(result.trivia_categories);
    })
    .catch((error) => {
      console.log(error)
    })
}

fetchCategories();


function displayCards(categories) {
  //Get the categoriesContainer from HTML and save it in a variable.
  const parentDiv = document.getElementById('categoriesContainer');
  console.log(categories);

  for (let i = 0; i < categories.length; i++) {
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const flipCardInner = document.createElement('div');
    flipCardInner.classList.add('flip-card-inner');

    const flipCardFront = document.createElement('div');
    flipCardFront.classList.add('flip-card-front');
    flipCardFront.style = `background-image: url("assets/${categories[i].id}.png")`;
    
    const title = document.createElement('h1');
    const editedTitle = formatTitle(categories[i].name);
    title.innerText = editedTitle;

    const flipCardBack = document.createElement('div');
    flipCardBack.classList.add('flip-card-back');


    const dropDown = createDropdown();
    // dropDown.classList.add('closed');
    
    dropDown.addEventListener('change', () => {
      startQuizButton.href = `quiz.html?id=${categories[i].id}&difficulty=${dropDown.value}`
    })

    // there's a lag when we apply on flipcardback;
    flipCard.addEventListener('mouseover', () => {
      dropDown.classList.add('opened');
      dropDown.classList.remove('closed');
    })

    flipCard.addEventListener('mouseleave', () => {
      dropDown.classList.remove('opened');
      dropDown.classList.add('closed');
    })
  


    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('start-button-div');
  
    const startQuizButton = createStartQuizButton(categories[i].id);
    
    flipCardFront.append(title);
    buttonDiv.append(startQuizButton)
    flipCardBack.append(buttonDiv, dropDown);
    flipCardInner.append(flipCardFront, flipCardBack);
    flipCard.append(flipCardInner);
    parentDiv.append(flipCard);
  }
}

// displayCards(staticCategories.trivia_categories);

function formatTitle(title) {
  if (title.includes(': ')) {
    const titleArray = title.split(': ');
    console.log(titleArray);
    return titleArray[1];
  } else {
    return title;
  }
}

function createDropdown() {
  const dropDown = document.createElement('select');
  dropDown.classList.add('difficulty-dropdown');

  const easyOption = document.createElement('option');
  easyOption.value = 'easy';
  easyOption.textContent = 'Easy';

  const mediumOption = document.createElement('option');
  mediumOption.value = 'medium';
  mediumOption.textContent = 'Medium';

  const hardOption = document.createElement('option');
  hardOption.value = 'hard';
  hardOption.textContent = 'Hard';

  dropDown.append(easyOption, mediumOption, hardOption);
  return dropDown;
}

function createStartQuizButton(categoryId) {
  const startQuizButton = document.createElement('a');

  startQuizButton.href = `quiz.html?id=${categoryId}&difficulty=easy`
  startQuizButton.innerText = 'Start Quiz!'
  startQuizButton.classList.add('start-quiz-button');
  
  return startQuizButton;
}

