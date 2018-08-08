'use strict';

(function () {
  let currentScreenId;
  const rootNode = document.querySelector(`#main`);
  const KeyCode = {
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39
  };
  let screensNodes;

  /** Получает узлы шаблонов всех экранов для отрисовки
   * @return {Array}
   */
  let getScreensNodes = function () {
    let templatesNodes = document.querySelectorAll(`template[data-type="screen"]`);
    return Array.prototype.map.call(templatesNodes, (templateNode) => {
      return templateNode.content.querySelector(`div`).cloneNode(true);
    }).sort((node1, node2) => {
      return node1.dataset.id - node2.dataset.id;
    });
  };

  /** Проверяет, возможно ли следующее переключение на другой экран
   * @param {Number} code Код нажатой при переключении кнопки
   * @return {Boolean}
   */
  let isNextScreenPossible = function (code) {
    return code === KeyCode.LEFT_ARROW ? currentScreenId - 1 >= 0 : currentScreenId + 1 <= screensNodes.length - 1;
  };

  /** Устанавливает очередной экран
   * @param {Number} code Код нажатой при переключении кнопки
   */
  let setNextScreen = function (code) {
    if (code === KeyCode.LEFT_ARROW) {
      setScreenById(currentScreenId - 1);
      return;
    }
    setScreenById(currentScreenId + 1);
  };
  let getArrowButtonKey = function (evt) {
    return evt.target.dataset.buttonType === `left` ? KeyCode.LEFT_ARROW : KeyCode.RIGHT_ARROW;
  };

  /** Обработчик события на переключение экрана
   * @param {Event} evt
   */
  let onScreenSwitched = function (evt) {
    if (evt.keyCode !== undefined && !Object.keys(KeyCode).some((code) => {
      return KeyCode[code] === evt.keyCode;
    })) {
      return;
    }
    if (evt.keyCode === undefined && evt.target.dataset.buttonType !== undefined) {
      evt.keyCode = getArrowButtonKey(evt);
    } else {
      return;
    }
    if (!isNextScreenPossible(evt.keyCode)) {
      return;
    }
    setNextScreen(evt.keyCode);
  };

  /** Удаляет текущий экран
   */
  let removeScreen = function () {
    Array.prototype.forEach.call(rootNode.children, (node) => {
      node.remove();
    });
  };

  /** Отрисовывает экран
   * @param {Number} id Индекс экрана в массиве
   */
  let renderScreen = function (id) {
    rootNode.appendChild(screensNodes[id]);
  };

  /** Обновляет экран
   * @param {Number} id Индекс очередного экрана для отображения
   */
  let updateScreenById = function (id) {
    removeScreen();
    renderScreen(id);
  };

  let setScreenById = function (id) {
    currentScreenId = id;
    updateScreenById(id);
  };

  /** Отрисовывает стрелки переключения на экран
   */
  let renderArrow = function () {
    let templateArrowsNode = document.querySelector(`#arrows`).content.querySelector(`div`);
    document.body.appendChild(templateArrowsNode.cloneNode(true));
    document.querySelector(`.arrows__wrap`).addEventListener(`click`, onScreenSwitched);
  };

  /** Устанавливает страницу в начальное состояние
   */
  let initializePage = function () {
    screensNodes = getScreensNodes();
    setScreenById(0);
    renderArrow();
    document.addEventListener(`keydown`, onScreenSwitched);
  };

  initializePage();
})();

