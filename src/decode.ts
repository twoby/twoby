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

const ternaryLookup = (bin: string) => {
  return groupN(bin, 3).map((bits: string) => {
    return parseInt(bits, 2).toString(3).padStart(2, "0");
  });
};

const ternaryFromBinary = (bin: string) => {
  return ternaryLookup(bin).join("");
};

const removePadding = (bin: string) => {
  return bin.slice(bin.indexOf("1"));
};

const rawFromTernary = (tern: string) => {
  return tern
    .split("2")
    .slice(1)
    .map((bits: string) => {
      return parseInt(bits, 2);
    })
    .filter((n: number) => !isNaN(n));
};

const decode = (ints: number[]) => {
  const binPad = binaryFromIntegers(ints);
  const bin = removePadding(binPad);
  const tern = ternaryFromBinary(bin);
  return rawFromTernary(tern);
};

export {
  binaryFromIntegers,
  ternaryFromBinary,
  rawFromTernary,
  removePadding,
  ternaryLookup,
  decode,
};
