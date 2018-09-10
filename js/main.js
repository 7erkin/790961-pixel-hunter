import Application from './application';
import questionStorage from './data/question-storage';

const URL = `https://es.dump.academy/pixel-hunter/questions`;

window.fetch(URL).
    then((response) => {
      return response.json();
    }, () => {
      document.body.innerHTML = `<h1>Game content hasn't been loaded. Try later</h1>`;
    }).
    then((response) => {
      questionStorage.init(response);
      Application.showIntro();
    });
