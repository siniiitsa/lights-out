export const makeObservable = (obj, callback) => {
  const keys = Object.keys(obj);
  const copy = keys.reduce((acc, key) => {
    const value =
      typeof obj[key] === 'object'
        ? makeObservable(obj[key], callback)
        : obj[key];
    return {
      ...acc,
      [key]: value,
    };
  }, {});

  return new Proxy(copy, {
    set(target, prop, value) {
      target[prop] = value;
      callback(prop, value, target[prop]);
      return true;
    },
  });
};
