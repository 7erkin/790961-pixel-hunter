import {changeScreen} from './lib/index';
import introScreenNode from './screen/intro';

document.addEventListener(`back`, () => changeScreen(introScreenNode));
changeScreen(introScreenNode);
