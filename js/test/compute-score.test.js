import {assert} from 'chai';
import {computeScore} from '../view/stats';

const dataMock = [
  {
    answer: 1000,
    score: {
      correct: 500,
      slow: -100,
      fast: 600,
      life: 0
    }
  },
  {
    answer: 1150,
    score: {
      correct: 1000,
      slow: 0,
      fast: 150,
      life: 0
    }
  },
  {
    answer: 1100,
    score: {
      correct: 200,
      slow: -100,
      fast: 700,
      life: 300
    }
  }
];

describe(`Testing compute score function`, () => {
  dataMock.forEach((data) => {
    it(`Should return ${data.answer}`, () => {
      assert.equal(data.answer, computeScore(data.score));
    });
  });
});
