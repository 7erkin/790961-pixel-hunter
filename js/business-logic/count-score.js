const quantityAnswer = 10;
const timeBound1 = 25;
const timeBound2 = 75;
const lifeMax = 3;
const score = {
  RIGHT_ANSWER: 100,
  SLOW_ANSWER: -50,
  QUICK_ANSWER: 50,
  LIFE_LEFT: 50
};
const answerKeys = [
  `status`,
  `time`
];

const isProperArgumentsTypes = (answers, lifeLeft) => {
  if (!(answers instanceof Array)) {
    return false;
  }
  if (!(typeof lifeLeft === `number`)) {
    return false;
  }
  return true;
};

const isValidAnswersValue = (answers) => {
  if (answers.length < quantityAnswer) {
    return false;
  }
  return !answers.some((answer) => {
    const keys = Object.keys(answer);
    if (keys.length === 0) {
      return true;
    }
    const match = keys.every((key) => {
      return answerKeys[key] === undefined;
    });
    return !(keys.length === answerKeys.length && match);
  });
};
const isValidLifeValue = (lifeLeft) => {
  return lifeLeft >= 0 && lifeLeft <= lifeMax && Math.round(lifeLeft) - lifeLeft === 0;
};
const isValidArgumentsValue = (answers, lifeLeft) => {
  return isValidAnswersValue(answers) && isValidLifeValue(lifeLeft);
};
const countAnswerScore = (answers) => {
  return answers.reduce((acc, answer) => {
    if (!answer.status) {
      return acc;
    }
    acc += score.RIGHT_ANSWER;
    if (answer.time <= timeBound1) {
      acc += score.QUICK_ANSWER;
      return acc;
    }
    if (answer.time > timeBound2) {
      acc += score.SLOW_ANSWER;
    }
    return acc;
  }, 0);
};
const countLifeScore = (lifeLeft) => {
  return lifeLeft * score.LIFE_LEFT;
};

export default (answers, lifeLeft) => {
  if (!isProperArgumentsTypes(answers, lifeLeft)) {
    return NaN;
  }
  if (!isValidArgumentsValue(answers, lifeLeft)) {
    return -1;
  }
  const answerScore = countAnswerScore(answers);
  const lifeScore = countLifeScore(lifeLeft);
  return answerScore + lifeScore;
};
