import { encode, decode } from "../../src/index.ts";

const toUint8 = (input) => {
  return Uint8Array.from(input);
};

const parseInput = (input, { radix, sep }) => {
  const inputList = input
    .split(sep)
    .map((n) => {
      return parseInt(n, radix);
    })
    .filter((n) => !isNaN(n));
  return toUint8(inputList);
};

const roundTrip = (in8) => {
  const code8 = toUint8(encode(in8));
  const out8 = toUint8(decode(code8));
  return { code8, out8 };
};

export { parseInput, toUint8, roundTrip };
