import Game1View from "../view/game-1";
import GameScreen from './abstract/game';

const TYPE_GAME = 1;

export default class Game1Screen extends GameScreen {
  constructor(callback, model) {
    super(Game1View, callback, model, TYPE_GAME);
  }
}
