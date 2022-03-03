/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  groupN,
  bitsFromQuat,
  bitsToQuat,
  bitsFromInts,
  bitsToInts,
} from "./common";

import type { State, Pair } from "./common";

const removePadding = (bin: string) => {
  return bin.slice(bin.indexOf("1")).replace("1", "0");
};

const parseQuatPair = (out: string[], pair: Pair) => {
  const [n0, n1] = [...pair].map((n) => parseInt(n, 4));
  const [last, ...rest] = [out.pop(), ...out];
  const prior = last ? [...rest, last] : rest;
  const next = bitsFromQuat(''+n1).slice(1);

  if (n0 === 1 && last) {
    return rest.concat([last + next]);
  }
  if (n0 === 0) {
    return prior.concat([next]);
  }
  return prior;
};

const quatHandler = (state: State, pair: Pair) => {
  const int = parseQuatPair(state.out, pair);
  return {...state, out: int, cache: [] };
}

const bitsFromQuatPair = ( state: State, pair?: Pair ) => {
  const { cache: [cache = [], ...rest] } = state;
  const basic = quatHandler;
  if (!pair) {
    return cache.reduce(basic, state);
  }
  if (cache.length === 1 && pair[0] === '0') {
    return [...cache, pair].reduce(basic, state);
  }
  if (cache.length === 0 && pair === '00') {
    return { ...state, cache: [[pair]] };
  }
  if (rest.length >= 1) {
    // TODO
    return basic(state, pair);
  }
  return basic(state, pair);
}

const bitsFromQuatPairs = (quats: Pair[]) => {
  const state = { out: [], cache: [] };
  const result = quats.reduce(bitsFromQuatPair, state);
  return bitsFromQuatPair(result).out;
};

const bitsFromCode = (bin: string) => {
  const quats = groupN(bin, 3, "0").map(bitsToQuat);
  return bitsToInts(bitsFromQuatPairs(quats as Pair[]));
};

const decode = (ints: number[]) => {
  const binPad = bitsFromInts(ints).join("");
  const bin = removePadding(binPad);
  return bitsFromCode(bin);
};

export { bitsFromQuatPairs, bitsFromCode, decode };
