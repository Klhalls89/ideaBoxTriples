var saveBtn = document.querySelector('.js-save-btn');
var cardRepo = document.querySelector('.js-card-repo');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');


saveBtn.addEventListener('click', cardPrepend);

function cardPrepend() {
  var card = new Idea(titleInput.value, bodyInput.value);
  console.log(card);
  // var timeStamp = Date.now()
  cardRepo.insertAdjacentHTML('afterbegin',
    `<section data-key="${card.id}" class="idea-card-sect">
          <article class="card-art">
            <p class="title-card-style">${card.title}</p>
            <p>${card.body}</p>
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
