const rootNode = document.querySelector(`#main`);

const renderScreen = (screenNode) => {
  rootNode.innerHTML = ``;
  rootNode.appendChild(screenNode);
};
export const getElementFromTemplate = (strTemplate) => {
  const node = document.createElement(`div`);
  node.innerHTML = strTemplate;
  return node;
};
export const changeScreen = (screenNode) => {
  rootNode.innerHTML = ``;
  renderScreen(screenNode);
};
export const genEventBack = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  const event = new Event(`back`);
  document.dispatchEvent(event);
};
