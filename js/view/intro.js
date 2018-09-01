import AbstractView from './abstract/base';

export default class IntroView extends AbstractView {
  get template() {
    return `<section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>`;
  }
  onClick() {}
  bind() {
    const switcherNode = this._element.querySelector(`.intro__asterisk`);
    switcherNode.addEventListener(`click`, this.onClick);
  }
}
