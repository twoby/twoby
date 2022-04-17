/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export type In = {
  label: "B3" | "B9";
  input: bigint;
};

const minB9 = BigInt(256);

const chooseEncoder = (input: bigint): In => {
  const label = input >= minB9 ? "B9" : "B3";
  return { input, label };
};

export { chooseEncoder, minB9 };
