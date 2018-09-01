import {changeScreen} from '../lib/index';
import createScreen from './greeting';
import IntroView from '../view/intro';

export default () => {
  const view = new IntroView();
  view.onClick = () => changeScreen({
    nextScreen: createScreen
  });
  return view.element;
};
