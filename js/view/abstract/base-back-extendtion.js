import AgreeWindow from '../agree-window';
import AbstractView from './base';

export default class AbstractViewBackExtendtion extends AbstractView {
  onBack() {}
  bind() {
    this._element.querySelector(`.back`).addEventListener(`click`, () => {
      this._agreeWindow = new AgreeWindow();
      this._agreeWindow.onBack = this.onBack;
      this._agreeWindow.show();
    });
  }
}
