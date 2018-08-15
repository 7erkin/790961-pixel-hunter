const rootNode = document.querySelector(`#main`);

const renderScreen = function (screenNode) {
  rootNode.innerHTML = ``;
  rootNode.appendChild(screenNode);
};
export const getElementFromTemplate = function (strTemplate) {
  const node = document.createElement(`div`);
  node.innerHTML = strTemplate;
  return node;
};
export const changeScreen = function (screenNode) {
  rootNode.innerHTML = ``;
  renderScreen(screenNode);
};
export const genEventBack = function (evt) {
  evt.preventDefault();
  evt.stopPropagation();
  const event = new Event(`back`);
  document.dispatchEvent(event);
};
