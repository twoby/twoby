import { groupN } from "../../src/common.ts";

const checkPadLen = (v, opts) => {
  const { padding, sep } = opts;
  if (padding === 0) {
    return true;
  }
  const groups = groupN(v, padding, "");
  const vals = sep ? v.split(sep) : groups;
  const uneven = vals.some((s) => {
    return padding !== s.length;
  });
  return !uneven;
};

const sameLength = ({ length: l0 }, { length: l1 }) => {
  return !!l0 && !!l1 && l0 === l1;
};

const validateString = (v, step) => {
  const { radix, sep } = step;
  const hexChars = new Map([[16, "a-f0-9"]]).get(radix);
  const goodChars = hexChars || "0-" + (radix - 1);
  const badChars = `[^${goodChars}${sep}]`;
  const badCharsRx = new RegExp(badChars, "g");
  const badSepRx = new RegExp(`[${sep}]+`, "g");
  if (v.match(badCharsRx)) {
    return v.replace(badCharsRx, "");
  }
  if (v.match(badSepRx)) {
    return v.replace(badSepRx, sep);
  }
  return v;
};

export { validateString, checkPadLen, sameLength };
