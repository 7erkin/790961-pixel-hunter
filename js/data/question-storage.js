import {QuestionType} from '../lib/index';

class QuestionStorage {
  constructor() {
    this.storage = new Map();
    this.counter = Object.keys(QuestionType).reduce((acc, key) => {
      acc[QuestionType[key]] = 0;
      return acc;
    }, {});
  }
  adapt(response) {
    response.forEach((element) => {
      element.answers.forEach((answer) => {
        if (answer.type === `painting`) {
          answer.type = `paint`;
        }
      });
    });
  }
  init(response) {
    this.adapt(response);
    Object.keys(QuestionType).forEach((key) => {
      this.storage.set(QuestionType[key], response.filter((question) => {
        return question.type === QuestionType[key];
      }));
    });
  }
  reset() {
    Object.keys(this.counter).forEach((key) => {
      this.counter[key] = 0;
    });
  }
  changeCounter(type) {
    const length = this.storage.get(type).length;
    const nextIndex = this.counter[type] + 1;
    if (nextIndex + 1 > length) {
      this.counter[type] = 0;
    } else {
      this.counter[type] = nextIndex;
    }
  }
  getQuestionByType(type) {
    const index = this.counter[type];
    this.changeCounter(type);
    return this.storage.get(type)[index];
  }
}

export default new QuestionStorage();
