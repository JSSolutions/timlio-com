export const hrefReady = ($cardName) => {
  return new Promise((resolve, reject) => {
    const inc = 40;
    let interval = 0;
    const hrefListener = ()  => {
      if ($cardName.attr('href')) {
        resolve('true');
      }
      else {
        if (++interval < inc) {
          setTimeout(() => hrefListener(), 100);
        } else {
          reject('Timeout');
        }
      }
    };

    hrefListener();
  });
};
