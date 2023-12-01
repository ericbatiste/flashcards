const chai = require('chai');
const expect = chai.expect;

const testData = require('./data-test.js');
const testQuestions = testData.testData;
const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');
const { createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/round');


beforeEach(() => {
    return testCards = testQuestions.map(question => {
       return createCard(question.id, question.question, question.answers, question.correctAnswer)
    })
})

describe('round', () => {
    it('should create a round and its properties', () => {
        const deck = createDeck(testCards);
        const round = createRound(deck);

        expect(round.deck).to.deep.equal(testCards);
        expect(round.currentCard).to.deep.equal({
            id: 1, 
            question: 'What is Robbie\'s favorite animal', 
            answers: ['sea otter', 'pug', 'capybara'], 
            correctAnswer: 'sea otter'
        });
        expect(round.turns).to.equal(0);
        expect(round.incorrectGuesses).to.deep.equal([]);
    })

    it('should give feedback if the guess is correct', () => {
        const deck = createDeck(testCards);
        const round = createRound(deck);

        const turnOne = takeTurn('sea otter', round);

        expect(turnOne).to.equal('Correct!');
    });

    it('should give feedback if the guess is incorrect', () => {
        const deck = createDeck(testCards);
        const round = createRound(deck);

        const turnOne = takeTurn('pug', round);

        expect(turnOne).to.equal('Incorrect!');
    });

    it('should increment the turn count regardless', () => {
        const deck = createDeck(testCards);
        const round = createRound(deck);

        takeTurn('sea otter', round);
        expect(round.turns).to.equal(1);

        takeTurn('spleen', round);
        expect(round.turns).to.equal(2);
    });

    it('should update currentCard', () => {
        const deck = createDeck(testCards);
        const round = createRound(deck);

        takeTurn('sea otter', round);
        expect(round.currentCard).to.equal(deck[1]);
        
        takeTurn('spleen', round);
        expect(round.currentCard).to.equal(deck[2]);
    })
    
    it('should store incorrect guesses', () => {
        const deck = createDeck(testCards);
        const round = createRound(deck);
        
        takeTurn('sea otter', round);
        takeTurn('spleen', round);
        takeTurn('Lex', round);

        expect(round.incorrectGuesses).to.deep.equal([14, 12]);
    })

    it('should return percentage correct after round', () => {
        const deck = createDeck(testCards);
        const round = createRound(deck);
        
        takeTurn('sea otter', round);
        takeTurn('spleen', round);
        takeTurn('Lex', round);

        const score = calculatePercentCorrect(round);

        expect(score).to.equal(33);
    })

    it('should let the player know when the game is over', () => {
        const deck = createDeck(testCards);
        const round = createRound(deck);
        
        takeTurn('sea otter', round);
        takeTurn('spleen', round);
        takeTurn('Lex', round);

        const message = endRound(round);

        expect(message).to.equal('** Round Over! ** You answered 33% of the questions correctly')
    })
})