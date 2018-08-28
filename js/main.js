import createScreen from './screen/intro';
import {changeScreen} from './lib/index';

document.addEventListener(`back`, () => changeScreen({
  nextScreen: createScreen
}));
changeScreen({
  nextScreen: createScreen
});
