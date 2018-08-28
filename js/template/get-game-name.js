export default (data, gameName) => {
  return `<p class="game__task">${data.get(gameName)}</p>`;
};
