import AgreeWindow from '../agree-window';
import AbstractView from './base';

export default class AbstractViewBackExtendtion extends AbstractView {
  onBack() {}
  bind() {
    this._element.querySelector(`.back`).addEventListener(`click`, () => {
      this.agreeWindow = new AgreeWindow();
      this.agreeWindow.onBack = this.onBack;
      this.agreeWindow.show();
    });
  }
}
