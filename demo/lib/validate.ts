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

const getGoodChars = ({ radix }) => {
  const specialCases = new Map([
    [0, ""],
    [16, "a-f0-9"],
  ]);
  if (specialCases.has(radix)) {
    return specialCases.get(radix);
  }
  return "0-" + (radix - 1);
};

const replaceAll = (str, pattern, constant) => {
  return str.replace(new RegExp(pattern, "g"), constant);
};

const cleanText = (v, step) => {
  const { sep } = step;
  const sepRx = `[${sep}]+?<!$`;
  const goodChars = getGoodChars(step);
  const badChars = `[^${goodChars}${sep}]`;
  const changes = [
    ...(goodChars ? [[badChars, ""]] : []),
    ...(sep ? [[sepRx, sep]] : []),
  ];
  return changes.reduce((o, [pattern, constant]) => {
    return replaceAll(o, pattern, constant);
  }, v);
};

const checkTextEnd = (v, step) => {
  const goodChars = getGoodChars(step);
  const goodEndRx = new RegExp(`[${goodChars}]$`);
  return !goodChars || v.match(goodEndRx);
};

export { cleanText, checkTextEnd, checkPadLen, sameLength };
