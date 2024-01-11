
export function getRandomNumber(length) {
  let n = Math.round(Math.pow(10, length) * Math.random());
  if (n < Math.pow(10, length - 1))
    return getRandomNumber(length);
  else
    return n;
}

