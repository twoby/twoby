
import { groupN } from "./common";

import type { Handler, State } from "./common";

const toBin = (int: number, padding: number) => {
  return int.toString(2).padStart(padding, "0");
}
const quatToBin = (pair: Pair) => {
  return toBin(parseInt(pair, 4), 3);
}

const ternToBin = (tern: string) => {
  return toBin(parseInt(tern, 3), 2);
}

const encodeVarTern = (block: string) => {
  const tern = parseInt(block, 2).toString(3);
  return tern.split("").map(ternToBin).join("");
}

const decodeVarTern = (pairs: Pair[]) => {
  if (pairs.length < 1 || pairs.length % 2 === 1) {
    return [];
  }
  const binList = pairs.map(quatToBin);
  const bin = groupN(binList.join(""), 2, "0");
  const varTern = bin.map(x => {
    return parseInt(x, 2).toString(4);
  }).join("").split("3");
  return varTern.map(x => parseInt(x, 3));
}

const handleVarTern = {
  encode: (state: State, block: string, i) => {
    if ( block === "" || i < 0 ) {
      const endings = [["111", "111"], ["111"]];
      const ending = endings[state.out.length % 2];
      const out = [].concat(state.out, ending);
      return {...state, out, cache: []};
    }
    const bin = state.cache.map(encodeVarTern);
    const list = groupN(bin.join(""), 3, "0");
    const out = [].concat(state.out, list);
    return {...state, out, cache: [[]]};
  },
  decode: (state: State, pair: Pair) => {
    const { cache: [ stack, cache = [] ] } = state;
    const nextCache = cache.concat(pair ? [pair] : []);
    if (cache.length % 2 === 1) {
      const last = cache.slice(-1)[0];
      const lastBit = quatToBin(last);
      const next = decodeVarTern(nextCache);
      if (lastBit === "1" && pair == "13") {
        const newCache = [[], []];
        const out = [...state.out, ...next];
        return { ...state, out, cache: newCache};
      }
    }
    const newCache = [stack, nextCache];
    return { ...state, cache: newCache};
  }
}

export { handleVarTern }
