import Game1View from "../view/game-1";
import GameScreen from './abstract/game';
import {QuestionType} from '../lib/index';

const TYPE_GAME = QuestionType.TWO_OF_TWO;

export default class Game1Screen extends GameScreen {
  constructor(callback, model) {
    super(Game1View, callback, model, TYPE_GAME);
  }
}
