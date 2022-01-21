import { roundTrip } from "../lib/io";

const indexQuality = (i, source = null) => {
  const label = ["worse", "equal", "better"][i];
  return source ? source[label] : label;
};

const compareLength = (in8, source) => {
  const { twoby8 } = roundTrip(in8);
  const diff = Math.sign(in8.length - twoby8.length);
  return indexQuality(diff + 1, source);
};

export { indexQuality, compareLength };
