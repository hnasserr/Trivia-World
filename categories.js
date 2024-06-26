
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
  //Get the categoriesContainer from HTML and save it in a div.
  const div = document.getElementById('categoriesContainer');
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

    // const img = document.createElement('img');
    // img.src = `assets/${categories[i].id}.png`
    // img.alt = 'no img';
    // img.classList.add('flip-card-img');

    

    const flipCardBack = document.createElement('div');
    flipCardBack.classList.add('flip-card-back');

    const startQuizButton = document.createElement('a');
    startQuizButton.classList.add('start-quiz-button');
    
    flipCardFront.append(title);
    flipCardBack.append(startQuizButton);
    flipCardInner.append(flipCardFront);
    flipCardInner.append(flipCardBack);
    flipCard.append(flipCardInner);
    div.append(flipCard);
  }
}

// displayCards(staticCategories.trivia_categories);

function formatTitle(title) {
  if (title.includes(':')) {
    const titleArray = title.split(': ');
    console.log(titleArray);
    return titleArray[1];
  } else {
    return title;
  }
}

