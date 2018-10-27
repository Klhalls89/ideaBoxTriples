class Idea {
  constructor(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.quality = quality || 'swill';
    this.id = id || Date.now();
  }

  
  saveToStorage(array) {
    var stringArray = JSON.stringify(array);
    localStorage.setItem('ideasKey', stringArray);
  }

  // deleteFromStorage(array) {
  // //parse array from local stroage
  // JSON.parse(array)
  // //delete idea from array
  // //stringafy to put it back in local storage
  // }

  test(){
    console.log('success')
  }

  updateSelf() {
  // update title or body on idea card
  }

  updateQuality() {
  // change the quality of the card defualt to swill
  }
}

// module.exports = Idea;