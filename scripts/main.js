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
cardRepo.addEventListener('keyup', function(event){ 
  if (event.keyCode === 13) {
    cardUpdate();
  }
 });
searchInput.addEventListener('keyup', filterCards);

function filterCards() {

  var allCards = document.querySelectorAll('.js-card');
  console.log(allCards);

  allCards.forEach(function(card) {
    var title = card.children[0].children[0];
    var body = card.children[0].children[1];
    
    if ( !title.innerText.includes(searchInput.value) || !body.innerText.includes(searchInput.value)) {
      console.log(card)
      card.classList.add('hidden');
    } else {
      card.classList.remove('hidden');
    }

  })

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
  alert('hey there');
  // if (event.target.classList.contains('js-card-inputs')) {
  //   var cardKey = event.target.closest('.js-card').dataset.key;
  //   cardKey = parseInt(cardKey);

  //   var cardTitleInput = document.querySelector('.js-card-title-input');
  //   var cardBodyInput = document.querySelector('.js-card-body-input');

  //   console.log(cardTitleInput);
  //   console.log(cardBodyInput);

  //   // ideaArray.forEach(function(ideaInst){
  //   //   if (ideaInst.id === cardKey) {
  //   //     ideaInst.updateSelf(cardTitleInput, cardBodyInput);
  //   //   }
  //   // });

  // }
}

function cardPrepend(id, title, body, quality) {
  cardRepo.insertAdjacentHTML('afterbegin',
    `<section data-key="${id}" class="idea-card-sect js-card">
          <article class="card-art">
            <p class="title-card-style js-card-inputs">${title}</p>
            <p class="js-card-inputs">${body}</p>
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
    cardPrepend(ideaInst.id, ideaInst.title, ideaInst.body, ideaInst.quality);
    var idea = new Idea(ideaInst.title, ideaInst.body, ideaInst.id, ideaInst.quality);

    ideaArray.push(idea);
   
  });
}




