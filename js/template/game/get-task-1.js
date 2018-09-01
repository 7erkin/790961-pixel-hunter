const URLS = [
  `https://k42.kn3.net/D2F0370D6.jpg`,
  `http://i.imgur.com/DKR1HtB.jpg`
];

const createQuestions = (quantityQuestion) => {
  const questions = [];
  for (let i = 0; i < quantityQuestion; ++i) {
    questions.push(`
    <div class="game__option">
        <img src="${URLS[i]}" alt="Option ${i + 1}" width="468" height="458">
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

export default (quantityQuestion) => {
  return `${createQuestions(quantityQuestion)}`;
};
