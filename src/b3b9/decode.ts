/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { minB9 } from "./chooseEncoder";
import { groupN, parseBig, bitsFromInts } from "../common";

type Out = {
  trios: number[];
  out: bigint;
};

const setBit = (bits: string, order: number) => {
  return `${+!order}${bits}`;
};

const filter3 = (trios: number[]) => {
  return trios.filter((t: number, i: number) => i % 3 == 0);
};

const findStop = (trios: number[]) => {
  return trios.findIndex((t: number, i: number) => i > 0 && t < 4);
};

const splitStop = (trios: number[], stopIndex: number) => {
  const idx = stopIndex >= 0 ? stopIndex : trios.length;
  const theseTrios = trios.slice(0, idx);
  const nextTrios = trios.slice(idx);
  return [theseTrios, nextTrios];
};

const decodeB3 = (trios: number[]) => {
  const stopIndex = findStop(trios);
  const [theseTrios, nextTrios] = splitStop(trios, stopIndex);
  const maxQuat = theseTrios.length - 1;
  const decoded = theseTrios.reduce((out: bigint, t: number, i: number) => {
    const scale = BigInt(4 ** (maxQuat - i));
    return out + BigInt(t % 4) * scale;
  }, BigInt(0));
  return {
    trios: nextTrios,
    out: decoded,
  };
};

const decodeB9 = (trios: number[]): Out => {
  const stopIndex = findStop(filter3(trios)) * 3;
  const [theseTrios, nextTrios] = splitStop(trios, stopIndex);
  const theseNines = filter3(theseTrios);
  const maxByte = theseNines.length - 1;
  const decoded = theseNines.reduce((out: bigint, _: number, i9: number) => {
    const i = i9 * 3;
    const [n0, n1, n2] = theseTrios.slice(i, i + 3);
    const b9 = (n0 % 4) * 64 + n1 * 8 + n2;
    const scale = BigInt(256 ** (maxByte - i9));
    return out + BigInt(b9 % 256) * scale;
  }, minB9);
  return {
    trios: nextTrios,
    out: decoded,
  };
};

const decodeValue = (trios: number[]): Out => {
  const [t0, t1 = 0] = trios;
  if (!t0 && t1 >= 4) return decodeB9(trios.slice(1));
  if (t1 > 0) return decodeB3(trios);
  return {
    out: BigInt(t0 % 4),
    trios: trios.slice(1),
  };
};

const decodeB3B9 = (trios: number[]): bigint[] => {
  const output = { result: [] as bigint[], trios };
  while (output.trios.length) {
    const { out, trios } = decodeValue([...output.trios]);

    const outputTrios = output.trios;
    if (output.trios.length <= trios.length) {
      return output.result;
    }
    output.result.push(out);
    output.trios = trios;
  }
  return output.result;
};

const parseTrios = (bin: string) => {
  const allBits = bin.slice(bin.indexOf("1"));
  return groupN("0" + allBits.slice(1), 3, "0");
};

const decodeValues = (vals: bigint[]) => {
  const trios = parseTrios(bitsFromInts(vals).join(""));
  return decodeB3B9(trios.map((t) => parseInt(t, 2)));
};

export { decodeValues, decodeB3B9 };
