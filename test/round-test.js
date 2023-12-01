const chai = require('chai');
const expect = chai.expect;

const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');
const { evaluateGuess } = require("../src/turns");
const { createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/round');

describe('round', () => {
    it('should create a round and its properties', () => {
        const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
        const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
        const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
        const deck = createDeck([card1, card2, card3]);
        const round = createRound(deck);

        expect(round.deck).to.deep.equal([card1, card2, card3]);
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
        const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
        const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
        const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
        const deck = createDeck([card1, card2, card3]);
        const round = createRound(deck);

        const turnOne = takeTurn('sea otter', round);

        expect(turnOne).to.equal('Correct!');
    });

    it('should give feedback if the guess is incorrect', () => {
        const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
        const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
        const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
        const deck = createDeck([card1, card2, card3]);
        const round = createRound(deck);

        const turnOne = takeTurn('pug', round);

        expect(turnOne).to.equal('Incorrect!');
    });

    it('should increment the turn count regardless', () => {
        const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
        const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
        const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
        const deck = createDeck([card1, card2, card3]);
        const round = createRound(deck);

        takeTurn('sea otter', round);
        expect(round.turns).to.equal(1);

        takeTurn('spleen', round);
        expect(round.turns).to.equal(2);
    });

    it('should update currentCard', () => {
        const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
        const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
        const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
        const deck = createDeck([card1, card2, card3]);
        const round = createRound(deck);

        takeTurn('sea otter', round);
        expect(round.currentCard).to.equal(deck[1]);
        
        takeTurn('spleen', round);
        expect(round.currentCard).to.equal(deck[2]);
    })
    
    it('should store incorrect guesses', () => {
        const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
        const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
        const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
        const deck = createDeck([card1, card2, card3]);
        const round = createRound(deck);
        
        takeTurn('sea otter', round);
        takeTurn('spleen', round);
        takeTurn('Lex', round);

        expect(round.incorrectGuesses).to.deep.equal([14, 12]);
    })

    it('should return percentage correct after round', () => {
        const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
        const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
        const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
        const deck = createDeck([card1, card2, card3]);
        const round = createRound(deck);
        
        takeTurn('sea otter', round);
        takeTurn('spleen', round);
        takeTurn('Lex', round);

        const score = calculatePercentCorrect(round);

        expect(score).to.equal(33);
    })

    it('should let the player know when the game is over', () => {
        const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
        const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
        const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
        const deck = createDeck([card1, card2, card3]);
        const round = createRound(deck);
        
        takeTurn('sea otter', round);
        takeTurn('spleen', round);
        takeTurn('Lex', round);

        const message = endRound(round);

        expect(message).to.equal('** Round Over! ** You answered 33% of the questions correctly')
    })
})