import {assert} from 'chai';
import takeAwayLife from '../business-logic/control-player-life';

describe(` ===== Test control player life ===== `, () => {
  describe(`On valid arguments`, () => {
    it(`Should return 2`, () => {
      assert.equal(2, takeAwayLife(3));
    });
    it(`Should return 0`, () => {
      assert.equal(0, takeAwayLife(1));
    });
    it(`Should return -1`, () => {
      assert.equal(-1, takeAwayLife(0));
    });
  });
  describe(`On invalid arguments`, () => {
    it(`Should return NaN`, () => {
      assert.isNaN(takeAwayLife(-1));
      assert.isNaN(takeAwayLife(-10));
      assert.isNaN(takeAwayLife(0.5));
      assert.isNaN(takeAwayLife(-0.5));
      assert.isNaN(takeAwayLife(7.000005));
      assert.isNaN(takeAwayLife(10.999999));
    });
  });
  describe(`On wrong types of arguments`, () => {
    it(`Should return NaN`, () => {
      assert.isNaN(takeAwayLife());
      assert.isNaN(takeAwayLife(NaN));
      assert.isNaN(takeAwayLife(null));
      assert.isNaN(takeAwayLife([]));
      assert.isNaN(takeAwayLife(`qwerty`));
    });
  });
});

