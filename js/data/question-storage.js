import {QuestionType} from '../lib/index';

/**
 * @description Класс, задачей которого является хранение и отдача загруженных вопросов с сервера.
 * @class QuestionStorage
 */
class QuestionStorage {
  constructor() {
    this._storage = new Map();
    this._counter = Object.keys(QuestionType).reduce((acc, key) => {
      acc[QuestionType[key]] = 0;
      return acc;
    }, {});
  }
  /**
   * @description Преобразует ответ сервера в другой формат, удобный для обработки
   * @param {Object} response Ответ сервера
   * @memberof QuestionStorage
   */
  adapt(response) {
    response.forEach((element) => {
      element.answers.forEach((answer) => {
        if (answer.type === `painting`) {
          answer.type = `paint`;
        }
      });
    });
  }
  /**
   * @description Инициализирует хранилище ответа сервера
   * @param {Object} response Ответ сервера
   * @memberof QuestionStorage
   */
  init(response) {
    this.adapt(response);
    Object.keys(QuestionType).forEach((key) => {
      this._storage.set(QuestionType[key], response.filter((question) => {
        return question.type === QuestionType[key];
      }));
    });
  }
  /**
   * @description Сбрасывает состояние счетчика, который контроллирует порядок выдачи вопросов
   * @memberof QuestionStorage
   */
  reset() {
    Object.keys(this._counter).forEach((key) => {
      this._counter[key] = 0;
    });
  }
  /**
   * @description Меняет состояние счетчика, в зависимости от отданного вопроса
   * @param {Object} type Тип отданного вопроса
   * @memberof QuestionStorage
   */
  changeCounter(type) {
    const length = this._storage.get(type).length;
    const nextIndex = this._counter[type] + 1;
    if (nextIndex + 1 > length) {
      this._counter[type] = 0;
    } else {
      this._counter[type] = nextIndex;
    }
  }
  /**
  * @description Отдает вопросы
  * @param {Object} type Тип запрошенного вопроса
  * @return {Object} Вопрос
  * @memberof QuestionStorage
  */
  getQuestionByType(type) {
    const index = this._counter[type];
    this.changeCounter(type);
    return this._storage.get(type)[index];
  }
}

export default new QuestionStorage();
