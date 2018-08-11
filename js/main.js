'use strict';

const rootNode = document.querySelector(`#main`);
const KeyName = {
  LEFT_ARROW: `ArrowLeft`,
  RIGHT_ARROW: `ArrowRight`
};
const orderScreenById = [
  `greeting`,
  `intro`,
  `rules`,
  `game-1`,
  `game-2`,
  `game-3`,
  `stats`,
  `modal-error`,
  `modal-confirm`
];
let buttonsArrowsNodes;
let currentScreenId;
let screensNodes;

let embedNode = function (nodeWhere, nodeWhat) {
  nodeWhere.appendChild(nodeWhat);
};

/** Получает узлы шаблонов всех экранов для отрисовки
  * @return {Array}
  */
let getScreensNodes = function () {
  let nodes = [];
  orderScreenById.forEach((id) => {
    let templateNode = document.querySelector(`#${id}`).content.querySelector(`div`);
    nodes.push(templateNode.cloneNode(true));
  });
  return nodes;
};

let getButtonsArrows = function () {
  return document.querySelectorAll(`.arrows__btn`);
};

/** Проверяет, возможно ли следующее переключение на другой экран
  * @param {Number} code Код нажатой при переключении кнопки
  * @return {Boolean}
  */
let isNextScreenPossible = function (code) {
  return code === KeyName.LEFT_ARROW ? currentScreenId - 1 >= 0 : currentScreenId + 1 <= screensNodes.length - 1;
};

let changeScreen = function (keyName) {
  if (!isNextScreenPossible(keyName)) {
    return;
  }
  if (keyName === KeyName.LEFT_ARROW) {
    setScreenById(currentScreenId - 1);
    return;
  }
  setScreenById(currentScreenId + 1);
};

let getButtonArrowKeyName = function (evt) {
  let node = evt.target;
  if (node.localName !== `button`) {
    return undefined;
  }
  return node === buttonsArrowsNodes[0] ? KeyName.LEFT_ARROW : KeyName.RIGHT_ARROW;
};

let getButtonKeyName = function (evt) {
  let match = Object.keys(KeyName).some((name) => {
    return KeyName[name] === evt.key;
  });
  return match ? evt.key : undefined;
};

let getKeyName = function (evt) {
  return evt.key === undefined ? getButtonArrowKeyName(evt) : getButtonKeyName(evt);
};

let onChangeScreen = function (evt) {
  let keyName = getKeyName(evt);
  if (keyName === undefined) {
    return;
  }
  changeScreen(keyName);
};

/** Удаляет текущий экран
  */
let removeScreen = function () {
  rootNode.innerHTML = ``;
};

/** Отрисовывает экран
  * @param {Number} id Индекс экрана в массиве
  */
let renderScreen = function (id) {
  embedNode(rootNode, screensNodes[id]);
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
  let templateButtonsArrowsNode = document.querySelector(`#arrows`).content.querySelector(`div`);
  document.body.appendChild(templateButtonsArrowsNode.cloneNode(true));
};

/** Устанавливает страницу в начальное состояние
  */
let initializePage = function () {
  screensNodes = getScreensNodes();
  setScreenById(0);
  renderArrow();
  buttonsArrowsNodes = getButtonsArrows();
  document.querySelector(`.arrows__wrap`).addEventListener(`click`, onChangeScreen);
  document.addEventListener(`keydown`, onChangeScreen);
};

initializePage();

