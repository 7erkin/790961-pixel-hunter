import {assert} from 'chai';
import {answers, answerScores, lifeLefts} from './data-mock';
import getScore from '../business-logic/count-score';

const scoreLifeLeft = 50;

describe(` ===== Test get score ===== `, () => {
  describe(`On lack of answers`, () => {
    it(`Should return -1`, () => {
      assert.equal(-1, getScore([], 20));
      assert.equal(-1, getScore(answers[1].slice(1, 5), 2));
      assert.equal(-1, getScore(answers[0].slice(1, 1), 3));
    });
  });

  describe(`On valid player game results`, () => {
    for (let i = 0; i < answerScores.length; ++i) {
      const score = answerScores[i] + lifeLefts[i] * scoreLifeLeft;
      it(`Should return ${score}`, () => {
        assert.equal(score, getScore(answers[i], lifeLefts[i]));
      });
    }
  });

  describe(`On wrong types of parameters`, () => {
    it(`Should return NaN`, () => {
      assert.isNaN(getScore(null, undefined));
      assert.isNaN(getScore(undefined, 4));
      assert.isNaN(getScore(``, 1));
      assert.isNaN(getScore([1, 2, 3], ``));
    });
  });

  describe(`On lack of parameters`, () => {
    it(`Should return NaN`, () => {
      assert.isNaN(getScore());
      assert.isNaN(getScore([]));
    });
  });

  describe(`On rigth types but wrong values`, () => {
    it(`Should return -1`, () => {
      assert.equal(-1, getScore([1, 2, 3], 10), /1. test/);
      assert.equal(-1, getScore(answers[1], -1), /2. test/);
      assert.equal(-1, getScore([10, 20, 30], -1), /3. test/);
      assert.equal(-1, getScore([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1), /4. test/);
      assert.equal(-1, getScore(answers[1].slice(0, 5).concat([1, 1, 1, 1, 1]), 1), /5. test/);
      assert.equal(-1, getScore(answers[2], 5.24), /6. test/);
    });
  });
});
