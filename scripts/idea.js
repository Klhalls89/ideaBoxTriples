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

    if ( (vote === 'up' && this.qualityIndex === 2) || (vote === 'down' && this.qualityIndex === 0) ) {
      return;
    }

    if (vote === 'up' && this.qualityIndex <= 1) {
        this.qualityIndex++;
    }
   
    if (vote === 'down' && this.qualityIndex >= 1) {
        this.qualityIndex--;
    } 

    this.quality = qualityArray[this.qualityIndex];
  }

}
