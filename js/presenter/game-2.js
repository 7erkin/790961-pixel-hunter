import Game2View from '../view/game-2';
import GameScreen from './abstract/game';
import {QuestionType} from '../lib/index';

const TYPE_GAME = QuestionType.TINDER_LIKE;

export default class Game1Screen extends GameScreen {
  constructor(callback, model) {
    super(Game2View, callback, model, TYPE_GAME);
  }
}
