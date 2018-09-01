import {changeScreen} from '../lib/index';
import createScreen from './rules';
import GreetingView from '../view/greeting';

export default () => {
  const view = new GreetingView();
  view.onClick = () => changeScreen({
    nextScreen: createScreen
  });
  return view.element;
};
