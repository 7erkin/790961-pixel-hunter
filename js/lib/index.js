const QUANTITY_GAMES = 10;
const ROOT_NODE = document.querySelector(`#main`);

const renderScreen = (screenNode) => {
  ROOT_NODE.appendChild(screenNode);
};
const clearScreen = () => {
  ROOT_NODE.innerHTML = ``;
};
export const getElementFromTemplate = (strTemplate) => {
  const node = document.createElement(`div`);
  node.innerHTML = strTemplate;
  return node;
};
export const changeScreen = (data, status) => {
  clearScreen();
  if (status === -1) {
    renderScreen(data.endScreen());
    return;
  }
  renderScreen(data.nextScreen());
};
export const isAnswerRightTask1 = (data) => {
  return data.nextAnswers.every((element) => {
    return data.images.get(element.answer).has(element.source);
  });
};
export const isAnswerRightTask2 = (data) => {
  return data.images.get(`paint`).has(data.choosenImage);
};
const typeAnswerToCheckFunction = new Map([
  [1, isAnswerRightTask1],
  [2, isAnswerRightTask2]
]);
export const areLifesEnd = (life) => {
  return life < 0;
};
export const isGameFinished = (gameState) => {
  return gameState.games === QUANTITY_GAMES;
};
export const writeAnswer = (data, answer) => {
  data.answers[data.gameState.games] = answer;
};
export const handleAnswer = (data) => {
  const isAnswerRight = typeAnswerToCheckFunction.get(data.taskType);
  if (isAnswerRight(data)) {
    writeAnswer(data, `correct`);
  } else {
    writeAnswer(data, `wrong`);
    const life = data.lifeModifier(data.gameState.life);
    if (areLifesEnd(life)) {
      return -1;
    }
    data.gameState.life = life;
  }
  ++data.gameState.games;
  if (isGameFinished(data.gameState)) {
    return -1;
  }
  return 0;
};
export const isRadioButtonPressed = (evt) => {
  return evt.target.type === `radio`;
};
export const isImageClicked = (evt) => {
  return evt.target.localName === `img`;
};
