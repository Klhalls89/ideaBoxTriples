class Idea {
  constructor(title, body, quality) {
    this.title = title;
    this.body = body;
    this.quality = quality || 'swill';
    this.id = Date.now();
  }

  saveToStorage() {
    
  // only save the instance to storage
  }

  deleteFromStorage() {
  // delete instance from storage
  }

  updateSelf() {
  // update title or body on idea card
  }

  updateQuality() {
  // change the quality of the card defualt to swill
  }
}

// module.exports = Idea;