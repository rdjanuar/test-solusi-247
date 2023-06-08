/* eslint-disable @typescript-eslint/no-non-null-assertion */
const generateArray = (n: number) =>
  Array.from({ length: n })
    .map((_, i) => i)
    .fill(0);

const chunkArray = (arr: number[], size = 5) => {
  const newArr = [];

  for (let i = 0; i < arr.length; i += size) {
    const sliceArr = arr.slice(i, i + size);
    newArr.push(sliceArr);
  }

  return newArr;
};

const randomFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateRandomNumber = (n: number) => {
  const generate = generateArray(n);
  const result = [];
  for (let i = 0; i < generate.length; i++) {
    result.push(randomFromInterval(-1000000, 1000000));
  }

  return chunkArray(result);
};

export const getTheLowestPositiveValueOfGeneratedArrayNumber = (
  arr: number[]
) => {
  return Math.min(...arr.filter((val) => val > 0));
};

export const getTheMissingLowestValueOfLowestPositiveValue = (n: number) => {
  return n < 0 ? n : n - 1;
};
