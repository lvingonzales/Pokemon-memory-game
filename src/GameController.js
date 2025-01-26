const clickedCards = []

export function ev_CardClicked(cardId) {
    
    if(clickedCards.find(id => id === cardId) === undefined) {
        clickedCards.push(cardId);
        return true;
    }
    clickedCards.splice(0, clickedCards.length);
    return false
}

export function checkBest(score, bestScore) {
    return score > bestScore ? bestScore = score : bestScore;
}

export function animateReset () {
    document.querySelector(".resetWrapper").classList.add ("resetActive");
    document.querySelector(".score").classList.add ("scoreReset");
      setTimeout(() => {
        document.querySelector(".score").classList.remove ("scoreReset");
        document.querySelector(".resetWrapper").classList.remove ("resetActive");
      },100)
}
