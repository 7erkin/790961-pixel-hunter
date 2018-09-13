import IntroScreen from './presenter/intro';
import GreetingScreen from './presenter/greeting';
import RulesScreen from './presenter/rules';
import Game1Screen from './presenter/game-1';
import Game2Screen from './presenter/game-2';
import Game3Screen from './presenter/game-3';
import StatsScreen from './presenter/stats';
import {changeScreen} from './lib/index';
import gameModel from './model/game';
import questionStorage from './data/question-storage';
import errorLoad from './view/error-load';

const Url = {
  GET_QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
  SEND_RESULT: `https://es.dump.academy/pixel-hunter/stats/101184439300-`,
  GET_STATS: `https://es.dump.academy/pixel-hunter/stats/101184439300-`
};

export default class Application {
  static init() {
    fetch(Url.GET_QUESTIONS).
      then((response) => {
        return response.json();
      }).
      then((response) => {
        questionStorage.init(response);
        Application.showIntro();
      });
  }
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
    }, gameModel);
    rules.init();
    changeScreen(rules.element);
  }
  static showGame1() {
    const game = new Game1Screen({
      showNextGame: Application.showGame2,
      showStats: Application.showStats,
      showIntro: Application.showIntro
    }, gameModel);
    game.init();
    changeScreen(game.element);
  }
  static showGame2() {
    const game = new Game2Screen({
      showNextGame: Application.showGame3,
      showStats: Application.showStats,
      showIntro: Application.showIntro
    }, gameModel);
    game.init();
    changeScreen(game.element);
  }
  static showGame3() {
    const game = new Game3Screen({
      showNextGame: Application.showGame1,
      showStats: Application.showStats,
      showIntro: Application.showIntro
    }, gameModel);
    game.init();
    changeScreen(game.element);
  }
  static showStats() {
    fetch(`${Url.SEND_RESULT}${gameModel.gameState.userName}`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({
        answers: gameModel.gameState.answers,
        life: gameModel.gameState.life
      })
    }).
      then(() => fetch(`${Url.GET_STATS}${gameModel.gameState.userName}`)).
      then((response) => response.json()).
      then((response) => {
        const stats = new StatsScreen({
          showIntro: Application.showIntro
        }, gameModel, response);
        stats.init();
        changeScreen(stats.element);
      }).catch(() => errorLoad.show());
  }
}
