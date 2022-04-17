/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { encodeValue, packValues } from "./b3b9/encode";
import { isBigList, bitsToInts, parseIntegers } from "./common";

import type { Nums } from "./common";

const bitsFromBlocks = (bits: string[]) => {
  const inputs = bitsToInts(packValues(bits), true);
  const encoded = inputs.map(encodeValue);
  return packValues(encoded);
};

const bitsToCode = (bin: string) => {
  const inputs = bitsToInts(packValues([bin]), true);
  return inputs.map(encodeValue);
};

function encode (ints: number[]): number[];
function encode (ints: bigint[]): bigint[];
function encode (ints: Nums): Nums {
  const useBigInt = isBigList(ints)
  const inputs = useBigInt ? ints : parseIntegers(ints);
  const packed = packValues([...inputs].map(encodeValue));
  if (useBigInt) {
    return bitsToInts(packed, true);
  }
  return bitsToInts(packed, false);
};

export { bitsFromBlocks, bitsToCode, encode };
