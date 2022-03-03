/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

type NewPair =  "00" | "01" | "02" | "03";
type MidPair = "10" | "11" | "12" | "13";
export type Pair = NewPair | MidPair;

export interface Handler {
  (state: State, pair: Pair) : State 
}

export type Options = {
  handler?: Handler,
}

export type State = {
  handlers: Handler[],
  out: string[],
  cache: Pair[][]
}

const bitsToInts = (bits: string[]) => {
  return bits.map((s: string) => parseInt(s, 2));
};

const bitsFromQuat = (quats: string) => {
  return parseInt(quats, 4).toString(2).padStart(3, "0");
};

const bitsToQuat = (bits: string) => {
  return parseInt(bits, 2).toString(4).padStart(2, "0");
};

const bitsFromInts = (ints: number[]) => {
  return [...ints]
    .filter((n) => n !== null && !isNaN(n))
    .map((n) => {
      return n.toString(2).padStart(8, "0");
    });
};

const match = (s: string, rx: string) => {
  const regex = new RegExp(rx, "g");
  return s.match(regex) || [];
};

const groupN = (s: string, n = 8, p = "0") => {
  const len = Math.ceil(s.length / n) * n;
  return match(s.padStart(len, p), `.{${n}}`);
};

export { 
  match,
  groupN,
  bitsFromQuat,
  bitsToQuat,
  bitsFromInts,
  bitsToInts,
};
