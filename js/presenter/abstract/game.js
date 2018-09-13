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

const GameEventName = {
  NEXT_GAME: `nextGame`,
  END_GAME: `endGame`,
  TO_INTRO: `toIntro`,
  TIME_CHANGE: `timeChange`,
};

export default class GameScreen {
  constructor(View, callback, model, typeGame) {
    this._question = questionStorage.getQuestionByType(typeGame);
    this._view = new View(model, this._question);
    this._model = model;
    this._callback = callback;
    this._typeGame = typeGame;
  }
  init() {
    this._model.init();
    this._model.subscribe(GameEventName.NEXT_GAME, this._callback.showNextGame);
    this._model.subscribe(GameEventName.END_GAME, this._callback.showStats);
    this._model.subscribe(GameEventName.TO_INTRO, this._callback.showIntro);
    this._model.subscribe(GameEventName.TIME_CHANGE, this._view.updateTime.bind(this._view));
    this._model.subscribe(GameEventName.NEXT_GAME, this._view.destruct.bind(this._view));
    this._model.subscribe(GameEventName.END_GAME, this._view.destruct.bind(this._view));
    this._model.subscribe(GameEventName.TO_INTRO, this._view.destruct.bind(this._view));
    this._view.onAnswer = (answers) => {
      handleAnswer({
        answers,
        question: this._question,
        model: this._model,
        typeGame: this._typeGame
      });
    };
    this._view.onBack = () => {
      this._model.flushGame();
    };
  }
  get element() {
    return this._view.element;
  }
}
