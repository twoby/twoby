/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const groupN = (s: string, n = 8, p = "0") => {
  const len = Math.ceil(s.length / n) * n;
  const regex = new RegExp(`.{${n}}`, "g");
  return s.padStart(len, p).match(regex) || [];
};

export { groupN };
