
export const digitize = (value) => {
  let str = value.toString();

  if(str.length == 1) {
    str = `0${str}`;
  }
  return str;
};

export const getMinutes = (time) => {
  const minutes = time / 60;
  return Math.floor(minutes);
};

export const getHours = (time) => {
  const hours = time / 60 / 60;
  return Math.floor(hours);
};

export const getSeconds = (time) => {
  return time % 60;
};