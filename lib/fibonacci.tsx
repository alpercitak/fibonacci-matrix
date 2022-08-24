const isPerfectSquare = (x: number) => {
  let s = Math.floor(Math.sqrt(x));
  return s * s == x;
};

const isFibonacciNumber = (x: number) => {
  return isPerfectSquare(5 * x * x + 4) || isPerfectSquare(5 * x * x - 4);
};

const isFibonacciArray = (array: number[]) => {
  if (array.length <= 2) {
    return false;
  }

  for (let i = 2; i < array.length; i++) {
    const n0 = array[i];
    const n1 = array[i - 1];
    const n2 = array[i - 2];

    if (n2 === 0 && n1 === 0) {
      return false;
    }

    if (n0 !== n1 + n2) {
      return false;
    }
  }
  return true;
};

export { isFibonacciNumber, isFibonacciArray };
