import { binaryFromIntegers, ternaryFromBinary } from "../../src/decode.ts";
import { binaryToIntegers, ternaryToBinary } from "../../src/encode.ts";
import { groupN } from "../../src/common.ts";

const BYTE = 8;

const parsers = {
  uint8: {
    textParser: (step) => {
      return (text) => toBinary(text, step);
    },
    bitParser: (step) => {
      return (src) => groupN(src, step.bits);
    },
  },
  uintVarTern: {
    textParser: ({ sep }) => {
      return (text) => {
        const ternPad = text.replaceAll(sep, "");
        const binPad = ternaryToBinary(ternPad);
        return groupN(binPad, BYTE);
      };
    },
    bitParser: ({ padding }) => {
      return (src) => {
        const trits = ternaryFromBinary(src);
        return groupN(trits, padding).map((v) => {
          return parseInt(v, 3).toString(2);
        });
      };
    },
  },
};

const toBlockPadding = ({ bits, radix }) => {
  const entropy = Math.log(2 ** (bits || 8));
  return Math.ceil(entropy / Math.log(radix));
};

const toBytes = (value) => {
  return binaryFromIntegers(value);
};

const fromBytes = (str) => {
  return binaryToIntegers(str);
};

const toBinary = (str, { radix, bits, sep }) => {
  const padding = toBlockPadding({ bits, radix: 2 });
  return str.split(sep).map((s) => {
    return parseInt(s, radix).toString(2).padStart(padding, "0");
  });
};

const fromBinary = (bitList, { radix, padding, sep }) => {
  return bitList
    .map((s) => {
      return parseInt(s, 2).toString(radix).padStart(padding, "0");
    })
    .join(sep);
};

export { fromBinary, toBinary, parsers };
export { fromBytes, toBytes, toBlockPadding };
