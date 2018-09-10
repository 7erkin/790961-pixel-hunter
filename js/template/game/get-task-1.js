const createQuestions = (question) => {
  const questions = [];
  for (let i = 0; i < question.answers.length; ++i) {
    questions.push(`
    <div class="game__option">
        <img src="${question.answers[i].image.url}" alt="Option ${i + 1}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`);
  }
  return questions.join(``);
};

export default (question) => {
  return `${createQuestions(question)}`;
};
