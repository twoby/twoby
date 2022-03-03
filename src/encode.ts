/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { match, groupN, bitsFromInts, bitsToInts } from "./common";

import type { State } from "./common";

const BYTE = 8;
const THRESH = 64
const shouldEscape = (i: number) => i >= THRESH;

const toBit3 = ([i, j]: number[], b: string) => {
  const isComma = `${+(!i || !!j)}`;
  return [`${isComma}`, ...b].join("");
};

const parseBlock = (out: string[], block: string, i: number) => {
  const last = out.slice(-1)[0] || "";
  const pack = BYTE - last.length;

  const varBlock = groupN(block.replace(/^0+/, "") || "0", 2, "0");
  const bits = varBlock.map((b, j) => toBit3([i, j], b)).join("");
  const next = match(bits.slice(pack), `.{1,${BYTE}}`);

  return out.concat(bits.slice(0, pack), next);
};

const defaultHandler = (state: State, block: string, i: number) => {
  if (block === "" || i < 0 ) {
    return {...state, cache: [] };
  }
  const out = parseBlock(state.out, block, i);
  return {...state, out, cache: [] };
}

const blockHandler = (state: State, block: string, i: number) => {
  if (state.cache.length > 0) {
    const newState = defaultHandler(state, "", -1);
    return defaultHandler(newState, block, i);
  }
  return defaultHandler(state, block, i);
}

const bitsFromBlock = (state: State, block: string, i: number) => {
  const { out } = blockHandler(state, block, i);
  return { ...state, out }
}

const bitsFromBlocks = (bits: string[]) => {
  const state = { out: [], cache: [] };
  const result = bits.reduce(bitsFromBlock, state);
  return groupN(result.out.join(""), BYTE, "0");
};

const bitsToCode = (bin: string) => {
  const bits = groupN(bin, BYTE, "0");
  return bitsToInts(bitsFromBlocks(bits));
};

const encode = (ints: number[]) => {
  const bin = bitsFromInts(ints).join("");
  return bitsToCode(bin);
};

export { bitsFromBlocks, bitsToCode, encode };
