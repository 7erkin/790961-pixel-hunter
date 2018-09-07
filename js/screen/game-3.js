import {changeScreen, handleAnswer} from '../lib/index';
import createScreen from './game-1';
import dataGame from '../data/games';
import gameState from '../data/state-of-game';
import images from '../data/images';
import answers from '../data/answers';
import takeAwayLife from '../business-logic/control-player-life';
import resultScreen from './stats';
import startScreen from './intro';
import Game3View from '../view/game-3';

export default () => {
  const view = new Game3View({
    gameState,
    dataGame,
    answers
  });
  const element = view.element;
  view.onAnswer = (imageSource) => {
    const status = handleAnswer({
      images,
      answers,
      gameState,
      choosenImage: imageSource,
      lifeModifier: takeAwayLife,
      taskType: 2
    });
    changeScreen({
      endScreen: resultScreen,
      nextScreen: createScreen
    }, status);
  };
  view.onBack = () => {
    changeScreen({
      nextScreen: startScreen
    });
  };
  return element;
};
