import StatsView from '../view/stats';
import startScreen from './intro';
import {changeScreen} from '../lib/index';

export default () => {
  const view = new StatsView();
  view.onBack = () => changeScreen({
    nextScreen: startScreen
  });
  const screen = view.element;
  return screen;
};
