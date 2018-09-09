import images from '../../data/images';

const isAnswerRightTask1 = (data) => {
  return data.answers.every((element) => {
    return images.get(element.answer).has(element.source);
  });
};
const isAnswerRightTask2 = (data) => {
  return images.get(`paint`).has(data.answers);
};
const typeAnswerToCheckFunction = new Map([
  [1, isAnswerRightTask1],
  [2, isAnswerRightTask2]
]);
const handleAnswer = (data) => {
  const isAnswerRight = typeAnswerToCheckFunction.get(data.typeGame);
  if (isAnswerRight(data)) {
    data.model.setAnswer(`correct`);
    return;
  }
  data.model.setAnswer(`wrong`);
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
    this.view = new View(model);
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
