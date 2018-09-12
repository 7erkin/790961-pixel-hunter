import AbstractView from './abstract/base';

export default class AgreeWindow extends AbstractView {
  get template() {
    return `  <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn" data-id="Ok">Ок</button>
            <button class="modal__btn" data-id="Cancel">Отмена</button>
          </div>
        </form>
    </section>`;
  }
  show() {
    document.body.appendChild(this.element);
  }
  hide() {
    document.querySelector(`.modal`).remove();
  }
  onBack() {}
  bind() {
    const buttonOkNode = this.element.querySelector(`[data-id="Ok"]`);
    const buttonCancelNode = this.element.querySelector(`[data-id="Cancel"]`);
    const buttonCloseNode = this.element.querySelector(`.modal__close`);
    buttonOkNode.addEventListener(`click`, () => {
      this.show();
      this.onBack();
    });
    buttonCancelNode.addEventListener(`click`, () => {
      this.hide();
    });
    buttonCloseNode.addEventListener(`click`, () => {
      this.hide();
    });
  }
}
