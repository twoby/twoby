import {
  decode as decodeTwoby,
  encode as encodeTwoby,
} from "../../src/index.ts";

const BYTE = 8;

const codes = {
  get uint8() {
    return {
      decode: (v) => v,
      encode: (v) => v,
      name: "Uint8",
      block: BYTE,
      radix: 2,
    };
  },
  get uintVarTern() {
    return {
      decode: decodeTwoby,
      encode: encodeTwoby,
      name: "Twoby",
      block: null,
      radix: 3,
    };
  },
};

export { codes };
