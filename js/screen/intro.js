import {changeScreen, getElementFromTemplate} from '../lib/index';
import createScreen from './greeting';

export default () => {
  const introNode = getElementFromTemplate(`  
<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`);

  const switcherNode = introNode.querySelector(`.intro__asterisk`);
  switcherNode.addEventListener(`click`, () => changeScreen({
    nextScreen: createScreen
  }));
  return introNode;
};
