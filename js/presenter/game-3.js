import Game3View from '../view/game-3';
import GameScreen from './abstract/game';
import {QuestionType} from '../lib/index';

const TYPE_GAME = QuestionType.ONE_OF_THREE;

export default class Game1Screen extends GameScreen {
  constructor(callback, model) {
    super(Game3View, callback, model, TYPE_GAME);
  }
}
