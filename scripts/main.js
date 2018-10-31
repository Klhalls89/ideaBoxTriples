var bodyInput = document.querySelector('.js-body-input');
var searchInput = document.querySelector('.js-search-bar');
var titleInput = document.querySelector('.js-title-input');
var ideaArray = [];

setInitState();

document.querySelector('.js-card-repo').addEventListener('click', functionCaller);
document.querySelector('.js-card-repo').addEventListener('focusout', cardUpdate);
document.querySelector('.js-dropdown').addEventListener('change', qualityFilter);
document.querySelector('.js-save-btn').addEventListener('click', createNewIdea);
document.querySelector('.js-show-btn').addEventListener('click', buttonToggle);

searchInput.addEventListener('keyup', cardSearch);

function buttonToggle() {
  if (this.innerText === 'Show More') {
    this.innerText = 'Show Less';
    showAll();
  } else {
      this.innerText = 'Show More';
      showTen();
    }
}

function cardPrepend(id, title, body, quality) {
  document.querySelector('.js-card-repo').insertAdjacentHTML('afterbegin',
    `<section data-key="${id}" class="idea-card-sect js-card">
          <article class="card-art">
            <p contentEditable="true" class="title-card-style js-card-title-input js-card-inputs">${title}</p>
            <p contentEditable="true" class="body-card-style js-card-inputs js-card-body-input">${body}</p>
          </article>
          <article class="quality-art">
            <img class="card-btns js-downvote" src="./assets/downvote.svg">
            <img class="card-btns js-upvote" src="./assets/upvote.svg">
            <p id="${id}" class="quality-name js-quality">Quality: ${quality}</p>
            <img class="card-btns js-delete" src="./assets/delete.svg">
          </article>
        </section>`
  );
};

function cardSearch() {
  var allCards = document.querySelectorAll('.js-card');

  allCards.forEach(function(card) {
    var title = card.children[0].children[0];
    var body = card.children[0].children[1];

    if ( !title.innerText.toLowerCase().includes(searchInput.value.toLowerCase()) && !body.innerText.toLowerCase().includes(searchInput.value.toLowerCase()) ) {
      card.classList.add('hidden');
    } else {
      card.classList.remove('hidden');
    }
  });
}

function cardUpdate() {
  if (event.target.classList.contains('js-card-title-input')) {
    var cardKey = event.target.closest('.js-card').dataset.key;
    cardKey = parseInt(cardKey);
    
    ideaArray.forEach(function(ideaInst) {
      if (ideaInst.id === cardKey) {
        ideaInst.updateSelf(event.target.innerText, event.target.nextElementSibling.innerText); 
        ideaInst.saveToStorage(ideaArray);
      }
    });
  }

  if (event.target.classList.contains('js-card-body-input')) {
    var cardKey = event.target.closest('.js-card').dataset.key;
    cardKey = parseInt(cardKey);
  
    ideaArray.forEach(function(ideaInst) {
      if (ideaInst.id === cardKey) {
        ideaInst.updateSelf(event.target.previousElementSibling.innerText, event.target.innerText); 
        ideaInst.saveToStorage(ideaArray);
      }
    });
  }
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
};

function createNewIdea() {
   var idea = new Idea(titleInput.value, bodyInput.value);
   cardPrepend(idea.id, idea.title, idea.body, idea.quality);
   ideaArray.push(idea);
   idea.saveToStorage(ideaArray);
   clearInputs(); 
}

function deleteCard() {
  var cardKey = parseInt(event.target.closest('.js-card').dataset.key);

  ideaArray.forEach(function(ideaInst) {
    if (ideaInst.id === cardKey) {
      ideaInst.deleteFromStorage(cardKey);
    }
  });

  event.target.closest('.js-card').remove();
}

function downvote() {
  var cardKey = parseInt(event.target.closest('.js-card').dataset.key);

  ideaArray.forEach(function(ideaInst) {
    if (ideaInst.id === cardKey) {
      var vote = 'down';
      ideaInst.updateQuality(vote); 
      cardKey = cardKey.toString();
      document.getElementById(cardKey).innerText = `Quality: ${ideaInst.quality}`;
      ideaInst.saveToStorage(ideaArray);
    }
  });
}


function functionCaller() {
  if (event.target.classList.contains('js-upvote')) {
    upvote();
  } 

  if (event.target.classList.contains('js-downvote')) {
    downvote();
  }

  if (event.target.classList.contains('js-delete')) {
    deleteCard();
  }
}

function qualityFilter() {
  var dropdownValue = event.target.value;
  var allCards = document.querySelectorAll('.js-card');

  allCards.forEach(function(card) {
    var qualityArea = card.children[1].children[2];

    if (qualityArea.innerText.includes(dropdownValue) || dropdownValue === 'All') {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function reinstanciateParseCardArray() {
  var ideaArrayString;
  ideaArrayString = localStorage.getItem('ideasKey');
  ideaArray.length = 0;
  var jsonIdeaArray = JSON.parse(ideaArrayString); 

  jsonIdeaArray.forEach(function(ideaInst) {
    cardPrepend(ideaInst.id, ideaInst.title, ideaInst.body, ideaInst.quality, ideaInst.qualityIndex);
    var idea = new Idea(ideaInst.title, ideaInst.body, ideaInst.id, ideaInst.quality, ideaInst.qualityIndex);
    ideaArray.push(idea);
  });

  showTen();
}

function setInitState() {
  if (localStorage.length === 0) {
    return
  } else {
    reinstanciateParseCardArray();
  }
}

function showAll() { 
  var allCards =  document.querySelectorAll('.js-card');
  allCards = Array.from(allCards);

  for(var i = 0; i < allCards.length; i++) {
    allCards[i].classList.remove('hidden');
  }
}

function showTen() {
  var allCards =  document.querySelectorAll('.js-card');
  allCards = Array.from(allCards);

  for(var i = 0; i < allCards.length; i++) {
    if (i >= 10) {
      allCards[i].classList.add('hidden');
    } 
  }
}   

function upvote() {
  var cardKey = parseInt(event.target.closest('.js-card').dataset.key);

  ideaArray.forEach(function(ideaInst) {
    if (ideaInst.id === cardKey) {
      var vote = 'up';
      ideaInst.updateQuality(vote); 
      cardKey = cardKey.toString();
      document.getElementById(cardKey).innerText = `Quality: ${ideaInst.quality}`;
      ideaInst.saveToStorage(ideaArray);
    }
  });
}