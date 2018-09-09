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
export const changeScreen = (screen) => {
  clearScreen();
  renderScreen(screen);
};
export const isRadioButtonPressed = (evt) => {
  return evt.target.type === `radio`;
};
export const isImageClicked = (evt) => {
  return evt.target.localName === `img`;
};
