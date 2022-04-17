/*
 * This Source Code Form is subject to the terms of the Mozilla Public
:30
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const PATTERN = [..."555551112".replace(/5/g, "111121112")].map((i) =>
  parseInt(i)
);
const SEQUENCE = ([] as number[]).concat(
  ...PATTERN.map((reps) => {
    return [...Array(reps)].map((_) => 5).concat([7]);
  })
);

const findIrregularSequence = (idx: number) => {
  return [...Array(idx + 1).keys()].map((i) => {
    return SEQUENCE[i % SEQUENCE.length];
  });
};

const summation = (o: number[], v: number) => {
  const last = o.slice(-1)[0] || 5;
  return [...o, last + v];
};

const isIrregular = (exp: number) => {
  const maxExp = Math.max(1, Math.ceil(exp / 4));
  const partial = findIrregularSequence(maxExp).reduce(summation, []);
  return partial.reduce((o: boolean, p: number) => {
    if (o) return o;
    return p === exp;
  }, false);
};

export { isIrregular };
