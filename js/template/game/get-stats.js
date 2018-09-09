const defineStatus = (answer) => {
  if (answer.status === `unknown`) {
    return `unknown`;
  }
  if (answer.status === `wrong`) {
    return `wrong`;
  }
  if (answer.time <= 10) {
    return `fast`;
  }
  if (answer.time > 20) {
    return `slow`;
  }
  return `correct`;
};

export default (answers) => {
  return `
    <ul class="stats">
    ${answers.map((answer) => {
    return `<li class="stats__result stats__result--${defineStatus(answer)}"></li>`;
  })
    .join(``)}
    </ul>`;
};
