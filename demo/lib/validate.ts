import { groupN } from "../../src/common.ts";
import { parseInput, toUint8 } from "./io";

const checkPadLen = (v, opts) => {
  const { padLen = 1, sep = " " } = opts;
  if (padLen === 0) {
    return v.split(sep);
  }
  const groups = groupN(v, padLen, "");
  const vals = sep ? v.split(sep) : groups;
  const uneven = vals.some((s) => {
    return padLen !== s.length;
  });
  return !uneven ? vals : null;
};

const sameLength = ({ length: l0 }, { length: l1 }) => {
  return !!l0 && !!l1 && l0 === l1;
};

const validateString = (_v, opts) => {
  const { radix = 2, sep = " " } = opts;
  const sepRegExp = new RegExp(`[${sep}]+`, "g");
  const v = _v.replace(sepRegExp, sep);
  const goodChars = new Map([[16, "a-f0-9"]]).get(radix) || "0-" + (radix - 1);
  const badChars = `[^${goodChars}${sep}]`;
  const rx = new RegExp(badChars, "g");
  if (v.match(rx)) {
    return null;
  }
  const vals = checkPadLen(v, opts) || [];
  const parsed = parseInput(vals, { radix, sep });
  if (sameLength(vals, parsed)) {
    return parsed;
  }
  return null;
};

const validateTwoby = (v) => {
  const [sep, padLen, radix] = [" ", 0, 2];
  return validateString(v, { sep, padLen, radix });
};

const validateHex = (v, opts) => {
  return validateString(v, { ...opts, radix: 16 });
};

const validateHexBytes = (v) => {
  return validateHex(v, { padLen: 2, sep: " " });
};

export { validateString, validateHexBytes, validateTwoby };
