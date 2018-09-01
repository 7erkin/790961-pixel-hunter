const URLS = [
  `https://k42.kn3.net/CF42609C8.jpg`,
  `https://i.imgur.com/DiHM5Zb.jpg`,
  `http://i.imgur.com/1KegWPz.jpg`,
];

const createQuestions = (quantityQuestion) => {
  const questions = [];
  for (let i = 0; i < quantityQuestion; ++i) {
    questions.push(`
      <div class="game__option">
        <img src="${URLS[i]}" alt="Option ${i + 1}" width="304" height="455">
      </div>`);
  }
  return questions.join(``);
};

export default (quantityQuestion) => {
  return `${createQuestions(quantityQuestion)}`;
};
