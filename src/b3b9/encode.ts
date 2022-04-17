/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { groupN } from "../common";
import { isIrregular } from "./isIrregular";
import { chooseEncoder, minB9 } from "./chooseEncoder";

import type { In } from "./chooseEncoder";

const setBit = (bits: string, order: number) => {
  return `${+!order}${bits}`;
};

const encodeB3 = (bits: string, order: number) => {
  const quats = groupN(bits, 2, "0");
  return setBit(quats.join("1"), order);
};

const encodeB9 = (bits: string, order: number) => {
  const bytes = groupN(bits, 8, "0");
  const trios = ([] as string[]).concat(
    ...bytes.map((byte: string) => {
      return groupN(setBit(byte, 0), 3, "0");
    })
  );
  return setBit("00" + trios.join(""), order);
};

const encodeB3B9 = ({ input, label }: In, order: number) => {
  if (label === "B3") {
    const bits = input.toString(2);
    return encodeB3(bits, order);
  }
  const inputB9 = input - minB9;
  const inputB9Real = inputB9 > BigInt(0) ? inputB9 : BigInt(0);
  const bits = inputB9.toString(2);
  return encodeB9(bits, order);
};

const encodeValue = (input: bigint, i: number) => {
  const enc = chooseEncoder(input);
  return encodeB3B9(enc, i);
};

const packValues = (bitList: number[] | string[]) => {
  return groupN(bitList.join(""), 8, "0");
};

export { encodeValue, packValues };
