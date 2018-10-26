var saveBtn = document.querySelector('.js-save-btn');
var cardRepo = document.querySelector('.js-card-repo');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var ideaArray = [];

parseCardArray();

saveBtn.addEventListener('click', createNewIdea);

function createNewIdea() {
   var idea = new Idea(titleInput.value, bodyInput.value);
   cardPrepend(idea.id, idea.title, idea.body);
   ideaArray.push(idea);
   idea.saveToStorage(ideaArray);
   clearInputs(); 
}

function cardPrepend(id, title, body) {
  cardRepo.insertAdjacentHTML('afterbegin',
    `<section data-key="${id}" class="idea-card-sect">
          <article class="card-art">
            <p class="title-card-style">${title}</p>
            <p>${body}</p>
          </article>
          <article class="quality-art">
            <img class="card-btns" src="./assets/downvote.svg">
            <img class="card-btns" src="./assets/upvote.svg">
            <p class="quality-name">Quality: swill</p>
            <img class="card-btns" src="./assets/delete.svg">
          </article>
        </section>`
      );
  
};

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
};

function parseCardArray() {
  var ideaArrayString;
  
  ideaArrayString = localStorage.getItem('ideasKey');
  ideaArray = JSON.parse(ideaArrayString);
  
  ideaArray.forEach(function(ideaInst) {
    cardPrepend(ideaInst.id, ideaInst.title, ideaInst.body);
  });
}

// function parseCard() {
//   var ideaKeyValue;
//   var ideaString;
//   var ideaObject;


  // for(var i = 0; i < localStorage.length; i++){
    // ideaKeyValue = localStorage.key(i);
    // ideaString = localStorage.getItem(ideaKeyValue);
    // ideaObject = JSON.parse(ideaString);
    // ideaArray.push(ideaObject);
    // cardPrepend(ideaObject.id, ideaObject.title, ideaObject.body);

  // }
// }



