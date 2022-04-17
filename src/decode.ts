/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Pair, Nums } from "./common";

import { isBigList, groupN, parseIntegers } from "./common";
import { decodeValues, decodeB3B9 } from "./b3b9/decode";

const bitsFromQuatPairs = (quats: Pair[]) => {
  const ints = quats.map((q: Pair) => parseInt(q, 4));
  return decodeB3B9(ints);
};

const bitsFromCode = (bin: string) => {
  const trios = groupN(bin, 3, "0");
  const ints = trios.map((t: string) => parseInt(t, 2));
  return decodeB3B9(ints);
};

function decode(ints: number[]): number[];
function decode(ints: bigint[]): bigint[];
function decode(ints: Nums): Nums {
  const useBigInt = isBigList(ints)
  const inputs = useBigInt ? ints : parseIntegers(ints);
  const outs = decodeValues([...inputs]);
  return useBigInt ? outs: outs.map((n: bigint) => Number(n));
};

export { bitsFromQuatPairs, bitsFromCode, decode };
