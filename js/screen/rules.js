import {changeScreen} from '../lib/index';
import nextScreen from './game-1';
import startScreen from './intro';
import RulesView from '../view/rules';

export default () => {
  const view = new RulesView();
  view.onClick = () => changeScreen({
    nextScreen
  });
  view.onBack = () => changeScreen({
    nextScreen: startScreen
  });
  return view.element;
};
