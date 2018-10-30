class Idea {
  constructor(title, body, id, quality, qualityIndex) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'Swill';
    this.qualityIndex = qualityIndex || 0;
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
  
  saveToStorage(array) {
    localStorage.clear();
    var stringArray = JSON.stringify(array);
    localStorage.setItem('ideasKey', stringArray);
  }

  updateSelf(title, body) {
    this.title = title;
    this.body = body;
  }

  updateQuality(vote) {
    var qualityArray = ['Swill','Plausible','Genius'];

    if (vote === 'up') {
      if (this.qualityIndex <= 1) {
        this.qualityIndex++
      } else if (this.qualityIndex === 2) {
          return
        }
    }
   
    if (vote === 'down') {
      if (this.qualityIndex >= 1) {
        this.qualityIndex--
      } else if (this.qualityIndex === 0) {
          return
        }
    }
    this.quality = qualityArray[this.qualityIndex];
  }

}

// module.exports = Idea;