const createQuestions = (question) => {
  const questions = [];
  for (let i = 0; i < question.answers.length; ++i) {
    questions.push(`
      <div class="game__option">
        <img src="${question.answers[i].image.url}" alt="Option ${i + 1}" width="304" height="455">
      </div>`);
  }
  return questions.join(``);
};

export default (question) => {
  return `${createQuestions(question)}`;
};
