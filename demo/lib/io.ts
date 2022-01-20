import { encode, decode } from "../../src/index.ts";

const toUint8 = (input) => {
  return Uint8Array.from(input);
};

const parseInput = (input, { radix = 10 }) => {
  const inputList = input
    .map((n) => {
      return parseInt(n, radix);
    })
    .filter((n) => !isNaN(n));
  return toUint8(inputList);
};

const roundTrip = (in8) => {
  const twoby8 = toUint8(encode(in8));
  const out8 = toUint8(decode(twoby8));
  return { twoby8, out8 };
};

export { parseInput, toUint8, roundTrip };
