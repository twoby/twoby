/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const TERN8 = [...Array(8)].map((_,n) => {
  return n.toString(3).padStart(2,"0");
});

const groupN = (s, n, p="0") => {
  const len = Math.ceil(s.length / n) * n;
  const regex = new RegExp(`.{${n}}`,"g");
  return s.padStart(len, p).match(regex) || [];
}

const encode = (raw) => {
  const tern = [...raw].map(n => {
    return n.toString(2);
  }).join("2")
  const ternPairs = groupN(tern, 2, "2");
  const bin = ternPairs.map(t2 => {
    const num = TERN8.indexOf(t2);
    return num.toString(2).padStart(3,"0");;
  }).join("");
  const binPad = groupN("1" + bin, 24).join("");
  const bytes = groupN(binPad, 8)
  const out = bytes.map(s=> parseInt(s, 2));
  return out;
}

const decode = (raw) => {
  const binPad = [...raw].map(n => {
    return n.toString(2).padStart(8, "0");
  }).join("")
  const i0 = 1 + binPad.indexOf("1");
  const bin = binPad.slice(i0);
  const tern = groupN(bin, 3).map(bits => {
    return TERN8[parseInt(bits, 2)];
  }).join("").replace(/^2/, "");
  const out = tern.split("2").map(bits => {
    return parseInt(bits, 2);
  }).filter(n => !isNaN(n));
  return out;
}

export {
  groupN as _groupN,
  encode,
  decode
}
