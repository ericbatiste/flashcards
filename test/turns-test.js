const chai = require('chai');
const expect = chai.expect;

const { createCard } = require('../src/card');
const { evaluateGuess } = require('../src/turns');

describe('turn', () => {
    it('should return correct if user guess matches correctAnswer', () => {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const turn = evaluateGuess('object', card.correctAnswer);
  
      expect(turn).to.equal('Correct!');
    });
    
    it('should return incorrect if user guess does not match correctAnswer', () => {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const turn = evaluateGuess('array', card.correctAnswer);
  
      expect(turn).to.equal('Incorrect!');
    });
  })