/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const TERN8 = [...Array(8)].map((_, n) => {
  return n.toString(3).padStart(2, "0");
});

const groupN = (s: string, n = 8, p = "0") => {
  const len = Math.ceil(s.length / n) * n;
  const regex = new RegExp(`.{${n}}`, "g");
  return s.padStart(len, p).match(regex) || [];
};

const rawToTernary = (raw: number[]) => {
  return [...raw]
    .map((n) => {
      return n.toString(2);
    })
    .join("2");
};

const ternaryToBinary = (tern: string) => {
  const ternPairs = groupN(tern, 2, "2");
  return ternPairs
    .map((t2: string) => {
      const num = TERN8.indexOf(t2);
      return num.toString(2).padStart(3, "0");
    })
    .join("");
};

const binaryToIntegers = (bin: string) => {
  const bytes = groupN(bin, 8);
  return bytes.map((s: string) => parseInt(s, 2));
};

const bitsWithPadding = (bin: string) => {
  return groupN("1" + bin, 24).join("");
};

const encode = (raw: number[]) => {
  const tern = rawToTernary(raw);
  const bin = ternaryToBinary(tern);
  const binPad = bitsWithPadding(bin);
  return binaryToIntegers(binPad);
};

const rawFromTernary = (tern: string) => {
  return tern
    .split("2")
    .map((bits: string) => {
      return parseInt(bits, 2);
    })
    .filter((n: number) => !isNaN(n));
};

const ternaryLookup = (bin: string) => {
  return groupN(bin, 3).map((bits: string) => {
    return TERN8[parseInt(bits, 2)];
  });
};

const ternaryFromBinary = (bin: string) => {
  return ternaryLookup(bin).join("").replace(/^2/, "");
};

const binaryFromIntegers = (ints: number[]) => {
  return [...ints]
    .map((n) => {
      return n.toString(2).padStart(8, "0");
    })
    .join("");
};

const bitsWithoutPadding = (binPad: string) => {
  const i0 = 1 + binPad.indexOf("1");
  return binPad.slice(i0);
};

const decode = (ints: number[]) => {
  const binPad = binaryFromIntegers(ints);
  const bin = bitsWithoutPadding(binPad);
  const tern = ternaryFromBinary(bin);
  return rawFromTernary(tern);
};

export {
  bitsWithoutPadding as _bitsWithoutPadding,
  binaryFromIntegers as _binaryFromIntegers,
  ternaryFromBinary as _ternaryFromBinary,
  binaryToIntegers as _binaryToIntegers,
  bitsWithPadding as _bitsWithPadding,
  ternaryToBinary as _ternaryToBinary,
  rawFromTernary as _rawFromTernary,
  rawToTernary as _rawToTernary,
  ternaryLookup as _ternaryLookup,
  groupN as _groupN,
  encode,
  decode,
};
