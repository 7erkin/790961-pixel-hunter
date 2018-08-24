const isArgumentValueValid = (lifeRemain) => {
  if (lifeRemain < 0) {
    return false;
  }
  if (Math.round(lifeRemain) - lifeRemain !== 0) {
    return false;
  }
  return true;
};
const isArgumentTypeValid = (lifeRemain) => {
  return typeof lifeRemain === `number`;
};

export default (lifeRemain) => {
  if (!isArgumentTypeValid(lifeRemain)) {
    return NaN;
  }
  if (!isArgumentValueValid(lifeRemain)) {
    return NaN;
  }
  return --lifeRemain;
};
