/**
 * Checks if the given number is a perfect square
 * @param x number
 * @returns true | false
 * @link https://en.wikipedia.org/wiki/Perfect_square
 * @link https://www.cuemath.com/algebra/perfect-squares
 */
const isPerfectSquare = (x: number): boolean => {
  let s = Math.floor(Math.sqrt(x));
  return s * s == x;
};

/**
 * Checks if the given number belongs to fibonacci sequence or not
 * @param x number
 * @returns true | false
 * @link https://en.wikipedia.org/wiki/Fibonacci_number#Recognizing_Fibonacci_numbers
 * @link https://math.stackexchange.com/questions/9999/checking-if-a-number-is-a-fibonacci-or-not
 */
const isFibonacciNumber = (x: number): boolean => {
  return isPerfectSquare(5 * x * x + 4) || isPerfectSquare(5 * x * x - 4);
};

/**
 * Checks if the given array is a fibonacci sequence or not
 * @param array the array to search fibonacci sequence
 * @returns true | false
 */
const isFibonacciArray = (array: number[]): boolean => {
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
