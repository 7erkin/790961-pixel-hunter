import AbstractView from './base';
import getGameTemplate from '../../template/get-game';

export default class GameAbstractView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }
  get template() {
    return getGameTemplate(this._data);
  }
}
