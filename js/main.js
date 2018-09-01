import createScreen from './screen/intro';
import {changeScreen} from './lib/index';

changeScreen({
  nextScreen: createScreen
});
