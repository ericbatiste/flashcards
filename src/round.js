const { evaluateGuess } = require("../src/turns");

function createRound(deck) {
    return {
        deck,
        currentCard: deck[0],
        turns: 0,
        incorrectGuesses: []
    }
}

function takeTurn(guess, round) {
    const status = evaluateGuess(guess, round.currentCard.correctAnswer)
    round.turns += 1;
    if (status === 'Correct!') {
        round.currentCard = round.deck[round.turns];
    }
    if (status === 'Incorrect!') {
        round.incorrectGuesses.push(round.currentCard.id);
        round.currentCard = round.deck[round.turns];
    }
    return status;
}

function calculatePercentCorrect(round) {
    const totalCards = round.deck.length;
    const correctGuesses = totalCards - round.incorrectGuesses.length;
    const score = Math.round((correctGuesses / totalCards) * 100)
    return score;
}

function endRound(round) {
    console.log(`** Round Over! ** You answered ${calculatePercentCorrect(round)}% of the questions correctly`);
    return `** Round Over! ** You answered ${calculatePercentCorrect(round)}% of the questions correctly`;
}

module.exports = {
    createRound,
    takeTurn,
    calculatePercentCorrect,
    endRound
}