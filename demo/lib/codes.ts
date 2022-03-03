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
      padding: BYTE,
      bits: BYTE,
      radix: 2,
    };
  },
  get uintVarQuat() {
    return {
      decode: decodeTwoby,
      encode: encodeTwoby,
      name: "Twoby",
      padding: 2,
      radix: 4,
      bits: 3,
    };
  },
};

export { codes };
