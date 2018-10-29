class Idea {
  constructor(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.quality = quality || 'Swill';
    this.id = id || Date.now();
    this.qualityIndex = 0;
  }

  
  saveToStorage(array) {
    localStorage.clear();
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

  updateSelf(title, body) {
    this.title = title;
    this.body = body;
  // update title or body on idea card
  }

  updateQuality(vote) {
    var qualityArray = ['Swill','Plausible','Genius'];

    if (vote === 'up') {
      if (this.qualityIndex <= 1) {
        this.qualityIndex++
      } else if(this.qualityIndex === 2) {
        return
        }
    }
   
    if (vote === 'down') {
      if (this.qualityIndex >= 1) {
        this.qualityIndex--
      } else if(this.qualityIndex === 0) {
        return
        }
    }

    this.quality = qualityArray[this.qualityIndex];
  }

}

// module.exports = Idea;