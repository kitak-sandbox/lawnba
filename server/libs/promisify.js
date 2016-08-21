module.exports = (fn) => {
  const slice = Array.prototype.slice;
  return function () {
    let args = slice.call(arguments);

    return new Promise((resolve, reject) => {
      args.push(function () {
        let args = slice.call(arguments);
        let err = args.shift();
        if (err) {
          reject(err);
          return;
        }
        resolve(args);
      });
      fn.apply(null, args);
    });
  };
};
