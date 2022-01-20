/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { groupN } from "./common";

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
      const num = parseInt(t2, 3);
      return num.toString(2).padStart(3, "0");
    })
    .join("");
};

const bitsWithPadding = (bin: string) => {
  return groupN("1" + bin, 24).join("");
};

const binaryToIntegers = (bin: string) => {
  const bytes = groupN(bin, 8);
  return bytes.map((s: string) => parseInt(s, 2));
};

const encode = (raw: number[]) => {
  const tern = rawToTernary(raw);
  const bin = ternaryToBinary(tern);
  const binPad = bitsWithPadding(bin);
  return binaryToIntegers(binPad);
};

export {
  rawToTernary,
  ternaryToBinary,
  bitsWithPadding,
  binaryToIntegers,
  encode,
};
