import {
  groupN,
  bitsToQuat,
  bitsFromInts,
  bitsToInts,
} from "../../src/common.ts";
import { bitsFromQuatPairs } from "../../src/decode.ts";
import { encode } from "../../src/encode.ts";
import { checkPadLen } from "./validate";
import { englishOrder } from "./order";

const BYTE = 8;

const groupBytes = (s: string) => {
  return groupN(s, BYTE);
};

const checkPadding = (text, step) => {
  const { name } = step.code;
  const message = `Each item in ${name} must be ${step.padding} chars.`;
  if (!checkPadLen(text, step)) {
    throw new Error(message);
  }
};

const parsers = {
  uint8: {
    textParser: (step) => {
      return (text) => {
        checkPadding(text, step);
        return toBinary(text, step);
      };
    },
    bitParser: (step) => {
      return (src) => {
        return fromBinary(groupN(src, step.bits), step).join(step.sep);
      };
    },
  },
  uintVarQuat: {
    textParser: (step) => {
      return (text) => {
        checkPadding(text, step);
        const { sep, code } = step;
        const { padding, encode } = code;
        const rawText = text.split(sep).join("");
        const quats = groupN(rawText, padding);
        const bits = bitsFromQuatPairs(quats);
        const decoded = bitsToInts(bits);
        const result = encode(decoded);
        return bitsFromInts(result);
      };
    },
    bitParser: (step) => {
      return (src) => {
        const { bits } = step.code;
        const list = groupN(src, bits).map(bitsToQuat);
        return groupN(list.join(""), step.padding).join(step.sep);
      };
    },
  },
  englishText: {
    textParser: (step) => {
      return (text) => {
        const { dict } = englishOrder;
        const result = [...text].map((c) => dict[c]);
        return bitsFromInts(result);
      };
    },
    bitParser: (step) => {
      return (src) => {
        const { sep } = step;
        const { list } = englishOrder;
        const ints = bitsToInts(groupN(src, step.bits));
        const text = ints.map((i) => list[i] || "?").join(sep);
        return text;
      };
    },
  },
};

const toPadding = ({ entropy, radix }) => {
  return Math.ceil(Math.log(entropy) / Math.log(radix));
};

const toBlockPadding = ({ bits, radix }) => {
  const entropy = 2 ** (bits || 8);
  return toPadding({ entropy, radix });
};

const toBytes = (value) => {
  return bitsFromInts(value).join("");
};

const fromBytes = (str) => {
  return bitsToInts(groupBytes(str));
};

const toBinary = (str, { radix, bits, sep }) => {
  const padding = toBlockPadding({ bits, radix: 2 });
  return str.split(sep).map((s) => {
    return parseInt(s, radix).toString(2).padStart(padding, "0");
  });
};

const fromBinary = (bitList, { radix, padding, sep }) => {
  return bitList.map((s) => {
    return parseInt(s, 2).toString(radix).padStart(padding, "0");
  });
};

export { parsers, fromBytes, toBytes, toBlockPadding };
