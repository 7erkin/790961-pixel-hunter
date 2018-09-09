const LIFE_MAX = 3;
const getLifesStatus = (lifeLeft) => {
  return `${new Array(lifeLeft)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
  ${new Array(LIFE_MAX - lifeLeft)
            .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
            .join(``)}`;
};

export default (data) => {
  return `
    <header class="header">
        <button class="back">
            <span class="visually-hidden">Вернуться к началу</span>
            18<svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink18:href="img/sprite.svg#arrow-left"></use>
            </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
        </button>
        <div class="game__timer">${data.gameState.time}</div>
        <div class="game__lives">
            ${getLifesStatus(data.gameState.life)}
        </div>
    </header>`;
};
