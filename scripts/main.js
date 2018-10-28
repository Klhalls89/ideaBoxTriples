var saveBtn = document.querySelector('.js-save-btn');
var cardRepo = document.querySelector('.js-card-repo');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
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
cardRepo.addEventListener('click', deleteCard);

function deleteCard(event){
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
   cardPrepend(idea.id, idea.title, idea.body);
   ideaArray.push(idea);
   idea.saveToStorage(ideaArray);
   clearInputs(); 
}

function cardPrepend(id, title, body) {
  cardRepo.insertAdjacentHTML('afterbegin',
    `<section data-key="${id}" class="idea-card-sect js-card">
          <article class="card-art">
            <p class="title-card-style">${title}</p>
            <p>${body}</p>
          </article>
          <article class="quality-art">
            <img class="card-btns" src="./assets/downvote.svg">
            <img class="card-btns" src="./assets/upvote.svg">
            <p class="quality-name">Quality: swill</p>
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
    cardPrepend(ideaInst.id, ideaInst.title, ideaInst.body);
    var idea = new Idea(ideaInst.title, ideaInst.body, ideaInst.id, ideaInst.quality);

    ideaArray.push(idea);
   
  });
}




