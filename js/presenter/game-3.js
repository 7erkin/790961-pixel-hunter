import Game3View from '../view/game-3';
import GameScreen from './abstract/game';

const TYPE_GAME = 2;

export default class Game1Screen extends GameScreen {
  constructor(callback, model) {
    super(Game3View, callback, model, TYPE_GAME);
  }
}
