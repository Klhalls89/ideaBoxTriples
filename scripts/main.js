// var timeStamp = Date.now()
// var titleInput = document.querySelector('.js-title-input');
// var bodyInput = document.querySelector('.js-body-input');
var saveBtn = document.querySelector('.js-save-btn');
// var cardRepo = document.querySelector('js-card-repo');

saveBtn.addEventListener('click', cardPrepend);


function cardPrepend() {
  var timeStamp = Date.now()
  var titleInput = document.querySelector('.js-title-input');
  var bodyInput = document.querySelector('.js-body-input');
  var cardRepo = document.querySelector('js-card-repo');
  cardRepo.insertAdjacentHTML('afterbeing',
    `<section class="idea-card-sect">
          <article class="card-art">
            <p class="title-card-style">Card title</p>
            <p>Body information here</p>
          </article>
          <article class="quality-art">
            <img class="card-btns" src="./assets/downvote.svg">
            <img class="card-btns" src="./assets/upvote.svg">
            <p class="quality-name">Quality: swill</p>
            <img class="card-btns" src="./assets/delete.svg">
          </article>
        </section>`
      );
}
