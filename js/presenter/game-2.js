import Game2View from '../view/game-2';
import GameScreen from './abstract/game';

const TYPE_GAME = 1;

export default class Game1Screen extends GameScreen {
  constructor(callback, model) {
    super(Game2View, callback, model, TYPE_GAME);
  }
}
