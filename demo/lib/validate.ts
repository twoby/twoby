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

const changer = (o, [pattern, constant]) => {
  return replaceAll(o, pattern, constant);
}

const cleanText = (v, step) => {
  const { sep } = step;
  const sepRx = `[${sep}]+?<!$`;
  const goodChars = getGoodChars(step);
  const badChars = `[^${goodChars}${sep}]`;
  const changes = [
    ...(goodChars ? [[badChars, ""]] : []),
    ...(sep ? [[sepRx, sep]] : []),
  ];
  const max = 255;
  const clean = changes.reduce(changer, v);
  const { radix, padding } = step;
  if (padding != 0 || radix != 10) {
    return clean;
  }
  // Special Decimal cleaning
  const endChars = `[^${goodChars}]$`;
  const end = v.match(endChars) ? sep : "";
  return clean.split(sep).reduce((o, s) => {
    const len = s.length;
    if (len == 0) {
      return o;
    }
    if (parseInt(s, radix) <= max) {
      return `${o}${sep}${s}`;
    }
    const s0 = s.slice(0, len - 1);
    const s1 = s.slice(len - 1);
    const s2 = s.slice(0, 2);
    const s3 = s.slice(2);
    if (parseInt(s0, radix) <= max) {
      return `${o}${sep}${s0}${sep}${s1}`;
    }
    return `${o}${sep}${s2}${sep}${s3}`;
  }, "").slice(1) + end;
};

const checkTextEnd = (v, step) => {
  const goodChars = getGoodChars(step);
  const goodEndRx = new RegExp(`[${goodChars}]$`);
  return !goodChars || v.match(goodEndRx);
};

export { cleanText, checkTextEnd, checkPadLen, sameLength };
