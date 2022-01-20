/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { groupN } from "./common";

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

const ternaryLookup = (bin: string) => {
  return groupN(bin, 3).map((bits: string) => {
    return parseInt(bits, 2).toString(3).padStart(2, "0");
  });
};

const ternaryFromBinary = (bin: string) => {
  return ternaryLookup(bin).join("").replace(/^2/, "");
};

const rawFromTernary = (tern: string) => {
  return tern
    .split("2")
    .map((bits: string) => {
      return parseInt(bits, 2);
    })
    .filter((n: number) => !isNaN(n));
};

const decode = (ints: number[]) => {
  const binPad = binaryFromIntegers(ints);
  const bin = bitsWithoutPadding(binPad);
  const tern = ternaryFromBinary(bin);
  return rawFromTernary(tern);
};

export {
  binaryFromIntegers,
  bitsWithoutPadding,
  ternaryFromBinary,
  rawFromTernary,
  ternaryLookup,
  decode,
};
