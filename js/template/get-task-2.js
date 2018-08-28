const url = `https://k32.kn3.net/5C7060EC5.jpg`;

const createQuestions = (quantityQuestion) => {
  const questions = [];
  for (let i = 0; i < quantityQuestion; ++i) {
    questions.push(`
      <div class="game__option">
        <img src="${url}" alt="Option ${i + 1}" width="304" height="455">
      </div>`);
  }
  return questions.join(``);
};

export default (quantityQuestion) => {
  return `${createQuestions(quantityQuestion)}`;
};
