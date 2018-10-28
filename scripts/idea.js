class Idea {
  constructor(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
    this.id = id || Date.now();
    this.qualityIndex = 0;
  }

  
  saveToStorage(array) {
    var stringArray = JSON.stringify(array);
    localStorage.setItem('ideasKey', stringArray);
  }

  deleteFromStorage(key) {
    var newIdeaArray = ideaArray.filter(function (ideaInst) {
      if (ideaInst.id !== key){
        return ideaInst;
      }
    });

    ideaArray = newIdeaArray;
    this.saveToStorage(ideaArray);

  }

  updateSelf() {
  // update title or body on idea card
  }

  updateQuality() {
 var qualityArray = ['Swill','Plausible','Genius'];
  if (this.qualityIndex <= 1) {
    this.qualityIndex++
  }
  this.quality = qualityArray[this.qualityIndex];
  }
}

// module.exports = Idea;