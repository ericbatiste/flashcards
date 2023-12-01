const chai = require('chai');
const expect = chai.expect;
const testData = require('./data-test.js');
const testQuestions = testData.testData;
const { createCard } = require('../src/card');
const { evaluateGuess } = require('../src/turns');


describe('turn', () => {
  beforeEach(() => {
    return testCards = testQuestions.map(question => {
      return createCard(question.id, question.question, question.answers, question.correctAnswer)
   })
  })
    it('should return correct if user guess matches correctAnswer', () => {
      const turn = evaluateGuess('sea otter', testCards[0].correctAnswer);
  
      expect(turn).to.equal('Correct!');
    });
    
    it('should return incorrect if user guess does not match correctAnswer', () => {
      const turn = evaluateGuess('pug', testCards[0].correctAnswer);
  
      expect(turn).to.equal('Incorrect!');
    });
  })