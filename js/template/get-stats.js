export default (answers) => {
  return `
    <ul class="stats">
    ${answers.map((answer) => {
    return `<li class="stats__result stats__result--${answer}"></li>`;
  })
    .join(``)}
    </ul>`;
};
