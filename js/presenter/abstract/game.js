import questionStorage from '../../data/question-storage';
import {QuestionType, AnswerType, ImageType} from '../../lib/index';

const isAnswerRightTask1 = (data) => {
  const answers = data.answers;
  const question = data.question;
  return answers.every((answer) => {
    return question.answers.some((element) => {
      return element.image.url === answer.source && element.type === answer.answer;
    });
  });
};
const getProperType = (question) => {
  const quantity = question.answers.reduce((acc, answer) => {
    if (answer.type === ImageType.PHOTO) {
      ++acc;
    }
    return acc;
  }, 0);
  return quantity === 1 ? ImageType.PHOTO : ImageType.PAINT;
};
const isAnswerRightTask2 = (data) => {
  const answer = data.answers;
  const question = data.question;
  const type = getProperType(question);
  return question.answers.some((element) => {
    return element.image.url === answer && element.type === type;
  });
};
const typeAnswerToCheckFunction = new Map([
  [QuestionType.TWO_OF_TWO, isAnswerRightTask1],
  [QuestionType.TINDER_LIKE, isAnswerRightTask1],
  [QuestionType.ONE_OF_THREE, isAnswerRightTask2]
]);
const handleAnswer = (data) => {
  const isAnswerRight = typeAnswerToCheckFunction.get(data.typeGame);
  if (isAnswerRight(data)) {
    data.model.setAnswer(AnswerType.CORRECT);
    return;
  }
  data.model.setAnswer(AnswerType.WRONG);
};

const EventName = {
  NEXT_GAME: `nextGame`,
  END_GAME: `endGame`,
  TO_INTRO: `toIntro`,
  Time: {
    CHANGE: `timeChange`,
    END: `timeEnd`,
  }
};

export default class GameScreen {
  constructor(View, callback, model, typeGame) {
    this.question = questionStorage.getQuestionByType(typeGame);
    this.view = new View(model, this.question);
    this.model = model;
    this.callback = callback;
    this.typeGame = typeGame;
  }
  init() {
    this.model.init();
    this.model.subscribe(EventName.NEXT_GAME, this.callback.showNextGame);
    this.model.subscribe(EventName.END_GAME, this.callback.showStats);
    this.model.subscribe(EventName.TO_INTRO, this.callback.showIntro);
    this.model.subscribe(EventName.Time.CHANGE, this.view.updateTime.bind(this.view));
    this.view.onAnswer = (answers) => {
      handleAnswer({
        answers,
        question: this.question,
        model: this.model,
        typeGame: this.typeGame
      });
    };
    this.view.onBack = () => {
      this.model.flushGame();
    };
  }
  get element() {
    return this.view.element;
  }
}
