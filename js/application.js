import IntroScreen from './presenter/intro';
import GreetingScreen from './presenter/greeting';
import RulesScreen from './presenter/rules';
import Game1Screen from './presenter/game-1';
import Game2Screen from './presenter/game-2';
import Game3Screen from './presenter/game-3';
import StatsScreen from './presenter/stats';
import {changeScreen} from './lib/index';
import GameModel from './model/game';

export default class Application {
  static showIntro() {
    const intro = new IntroScreen(Application.showGreeting);
    intro.init();
    changeScreen(intro.element);
  }
  static showGreeting() {
    const greeting = new GreetingScreen(Application.showRules);
    greeting.init();
    changeScreen(greeting.element);
  }
  static showRules() {
    const rules = new RulesScreen({
      showGame: Application.showGame1,
      showIntro: Application.showIntro
    }, GameModel);
    rules.init();
    changeScreen(rules.element);
  }
  static showGame1() {
    const game = new Game1Screen({
      showNextGame: Application.showGame2,
      showStats: Application.showStats,
      showIntro: Application.showIntro
    }, GameModel);
    game.init();
    changeScreen(game.element);
  }
  static showGame2() {
    const game = new Game2Screen({
      showNextGame: Application.showGame3,
      showStats: Application.showStats,
      showIntro: Application.showIntro
    }, GameModel);
    game.init();
    changeScreen(game.element);
  }
  static showGame3() {
    const game = new Game3Screen({
      showNextGame: Application.showGame1,
      showStats: Application.showStats,
      showIntro: Application.showIntro
    }, GameModel);
    game.init();
    changeScreen(game.element);
  }
  static showStats() {
    const stats = new StatsScreen(GameModel);
    stats.init();
    changeScreen(stats.element);
  }
}
