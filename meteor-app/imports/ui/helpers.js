const digitize = (number) => {
  let str = number.toString();

  if(str.length == 1) {
    str = `0${str}`;
  }
  return str;
};

export const millisecondsToTime = (timestamp) => {
  const timestampSeconds = Math.ceil(timestamp / 1000);
  const hours = Math.floor(timestampSeconds / (60 * 60));

  const minutes = Math.floor(timestampSeconds / 60) % 60;

  const seconds = timestampSeconds % 60;

  return `${digitize(hours)}:${digitize(minutes)}:${digitize(seconds)}`;
};

export const randomColor = () => {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const toUnderscore = (str) => {
  return str.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);
};