/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

type NewPair = "00" | "01" | "02" | "03";
type MidPair = "10" | "11" | "12" | "13";
export type Pair = NewPair | MidPair;
export type Nums = bigint[] | number[];

const parseBig = (s: string) => BigInt(`0b${s}`);
const parseSmall = (s: string) => parseInt(s, 2);

const bitsToQuat = (bits: string) => {
  return parseInt(bits, 2).toString(4).padStart(2, "0");
};

function isBigList(ints: Nums): ints is bigint[] {
  const intKey = typeof [...ints.slice(0)].pop();
  return intKey == "bigint";
}

function bitsToInts(bits: string[], useBigInt: true): bigint[];
function bitsToInts(bits: string[], useBigInt: false): number[];
function bitsToInts(bits: string[], useBigInt: boolean): Nums {
  if (useBigInt) {
    return bits.map((s: string) => parseBig(s)) as bigint[];
  }
  return bits.map((s: string) => parseSmall(s)) as number[];
}

const parseIntegers = (nums: number[]): bigint[] => {
  return [...nums].map((n: number) => BigInt(n));
};

const bitsFromInts = (nums: bigint[]) => {
  return [...nums].map((n) => {
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
  parseBig,
  isBigList,
  bitsFromInts,
  bitsToInts,
  parseIntegers,
  bitsToQuat,
};
