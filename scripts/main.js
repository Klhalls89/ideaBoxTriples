var saveBtn = document.querySelector('.js-save-btn');
var cardRepo = document.querySelector('.js-card-repo');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var searchInput = document.querySelector('.js-search-bar');
var ideaArray = [];

setInitState();

function setInitState() {
  if(localStorage.length === 0) {
    return
  } else {
    reinstanciateParseCardArray();
  }
}

saveBtn.addEventListener('click', createNewIdea);
cardRepo.addEventListener('click', functionCaller);
cardRepo.addEventListener('focusout', cardUpdate);
searchInput.addEventListener('keyup', filterCards);

function filterCards() {
  var allCards = document.querySelectorAll('.js-card');
  console.log(allCards);

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

function functionCaller(){
  upvote();
  downvote();
  deleteCard();
}

function upvote(){
  if (event.target.classList.contains('js-upvote')) {
  var cardKey = event.target.closest('.js-card').dataset.key;
  cardKey = parseInt(cardKey);

  ideaArray.forEach(function(ideaInst){
    if (ideaInst.id === cardKey) {
      var vote = 'up';
      ideaInst.updateQuality(vote); 
      cardKey = cardKey.toString();
      document.getElementById(cardKey).innerText = `Quality: ${ideaInst.quality}`;
      ideaInst.saveToStorage(ideaArray);
      }
    });
  }
}

function downvote(){
  if (event.target.classList.contains('js-downvote')) {
  var cardKey = event.target.closest('.js-card').dataset.key;
  cardKey = parseInt(cardKey);

  ideaArray.forEach(function(ideaInst){
    if (ideaInst.id === cardKey) {
      var vote = 'down';
      ideaInst.updateQuality(vote); 
      cardKey = cardKey.toString();
      document.getElementById(cardKey).innerText = `Quality: ${ideaInst.quality}`;
      ideaInst.saveToStorage(ideaArray);
      }
    });
  }
}


function deleteCard(){
 if (event.target.classList.contains('js-delete')) {
  var cardKey = event.target.closest('.js-card').dataset.key;
  cardKey = parseInt(cardKey);

  ideaArray.forEach(function(ideaInst){
    if (ideaInst.id === cardKey) {
      ideaInst.deleteFromStorage(cardKey);
    }
  });

  console.log(ideaArray);
  event.target.closest('.js-card').remove();
  }
}

function createNewIdea() {
   var idea = new Idea(titleInput.value, bodyInput.value);
   cardPrepend(idea.id, idea.title, idea.body, idea.quality);
   ideaArray.push(idea);
   idea.saveToStorage(ideaArray);
   clearInputs(); 
}

function cardUpdate() {
  console.log('hello')
  if (event.target.classList.contains('js-card-title-input')) {
  var cardKey = event.target.closest('.js-card').dataset.key;
  cardKey = parseInt(cardKey);
  
  ideaArray.forEach(function(ideaInst){
    if (ideaInst.id === cardKey) {
      ideaInst.updateSelf(event.target.innerText, event.target.nextElementSibling.innerText); 
      ideaInst.saveToStorage(ideaArray);
      }
    });
  }

  if (event.target.classList.contains('js-card-body-input')) {
  var cardKey = event.target.closest('.js-card').dataset.key;
  cardKey = parseInt(cardKey);
  
  ideaArray.forEach(function(ideaInst){
    if (ideaInst.id === cardKey) {
      ideaInst.updateSelf(event.target.previousElementSibling.innerText, event.target.innerText); 
      ideaInst.saveToStorage(ideaArray);
      }
    });
  }
}


function cardPrepend(id, title, body, quality) {
  cardRepo.insertAdjacentHTML('afterbegin',
    `<section data-key="${id}" class="idea-card-sect js-card">
          <article class="card-art">
            <p contentEditable="true" class="title-card-style js-card-title-input js-card-inputs">${title}</p>
            <p contentEditable="true" class="js-card-inputs js-card-body-input">${body}</p>
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

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
};


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
}

// funcfion(event.target.value)

// function (quality)
// if(all) {
//   return ;
// }

// var filteredarray = originalArray.filter( card => {
//   return card.quality === quality 
// })




