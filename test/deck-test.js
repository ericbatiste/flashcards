const chai = require('chai');
const expect = chai.expect;
const testData = require('./data-test.js');
const testQuestions = testData.testData;
const { createCard } = require('../src/card');
const { createDeck, countCards } = require('../src/deck');

beforeEach(() => {
    return testCards = testQuestions.map(question => {
       return createCard(question.id, question.question, question.answers, question.correctAnswer)
    })
})

describe('deck', () => {
    it('should know how many cards are in the deck', () => {
        const deck = createDeck(testCards);

        countCards(deck);

        expect(deck.length).to.deep.equal(3);
    });
})