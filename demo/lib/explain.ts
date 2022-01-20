import { encode, decode } from "../../src/index.ts";
import { groupN } from "../../src/common.ts";
import {
  rawToTernary,
  ternaryToBinary,
  bitsWithPadding,
  binaryToIntegers,
} from "../../src/encode.ts";
import {
  binaryFromIntegers,
  bitsWithoutPadding,
  rawFromTernary,
  ternaryLookup,
} from "../../src/decode.ts";
import { validateHexBytes, validateTwoby } from "./validate";

const asBytes = (input, n = 2) => {
  const bytes = [...input]
    .map((n) => {
      return groupN(n.toString(16), 2)[0];
    })
    .join("");
  return groupN(bytes, n, "");
};

const toBinary = (value, pad) => {
  const padded = binaryFromIntegers(value);
  if (pad) {
    return padded;
  }
  return bitsWithoutPadding(padded);
};

const fromBinary = (binaryInput, radix, padLen = 1) => {
  return binaryInput
    .map((s) => {
      return parseInt(s, 2).toString(radix).padStart(padLen, "0");
    })
    .filter((n) => !isNaN(parseInt(n, radix)));
};

const checkTernary = (t, pad, padLen = 1) => {
  if (t.length % padLen !== 0) {
    return null;
  }
  if (t.match(/22/) || t.match(/2$/)) {
    return null;
  }
  const decoded = pad
    ? rawFromTernary(t)
    : decode(binaryToIntegers(bitsWithPadding(ternaryToBinary(t))));
  const encoded = encode(decoded);
  if (decode(encoded).join(",") !== decoded.join(",")) {
    return null;
  }
  return decoded;
};

const explainResults = ({ in8, twoby8, out8 }) => {
  const validate = validateHexBytes;
  return [
    ["Input hex bytes", asBytes(in8, 2), " ", validate],
    ["Twoby hex bytes", asBytes(twoby8, 2), " ", null],
    ["Integers", [...out8], ", ", null],
  ];
};

const explainSteps = ({ in8, twoby8, pad, choice }) => {
  const ternaryInput = rawToTernary(in8);
  const binaryInput = ternaryInput.split("2").filter((n) => !!n);

  if (!choice) {
    return [[`Input`, binaryInput, " ", validateTwoby]];
  }

  const { sep, radix, padLen, label, numBits } = choice;
  const clusters =
    radix === 3
      ? 16
      : ((info) => {
          return info % 1 ? 1 : info;
        })(24 / Math.log2(radix));

  const binaryValue = toBinary(twoby8, pad);
  const bitLists = groupN(binaryValue, numBits);
  const toRadix = (b, p) => fromBinary(b, radix, p);
  function validate(v) {
    return validateString(v, { ...this, radix, sep });
  }
  const validateInput = validate.bind({ padLen: 0 });
  const validateOutput = validate.bind({ padLen });

  const { unit, base, text, textInput } = label;

  if (radix === 3) {
    const _tern = [...binaryInput].map((b) => ["2", b]);
    const tern = [].concat(..._tern).slice(1);

    const out_tern = groupN(ternaryLookup(binaryValue).join(""), padLen);
    return [
      [
        textInput,
        tern,
        " ",
        (i) => {
          const split = i.split(" ");
          const ints = split.map((ii) => {
            return parseInt(ii, 3);
          });
          if (ints.some((ii) => isNaN(ii))) {
            return null;
          }
          if (split.slice(-1).includes("2")) {
            return null;
          }
          return split
            .map((ii) => {
              return parseInt(ii, 2);
            })
            .filter((ii) => !isNaN(ii));
        },
      ],
      [
        text,
        out_tern,
        " ",
        (i) => {
          if (i.match(/ $/)) {
            return null;
          }
          const str = i.replace(/ +/g, "");
          if (pad && str.length % clusters) {
            return null;
          }
          return checkTernary(str, pad, padLen);
        },
      ],
    ];
  }
  return [
    [textInput, toRadix(binaryInput, 0), " ", validateInput],
    [
      text,
      toRadix(bitLists, padLen),
      " ",
      (i) => {
        const encoded = validateOutput(i);
        if (encoded) {
          const t = rawToTernary(encoded);
          return checkTernary(t, pad, 1);
        }
      },
    ],
  ];
};

export { explainSteps, explainResults };
