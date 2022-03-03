import { toBlockPadding, toBytes, parsers } from "./transcode.ts";
import { toLabel } from "./label.ts";
import { codes } from "./codes.ts";

const toStep = (choice) => {
  const { parse, code, src } = choice;
  const options = { bits: 8, ...choice };
  const { name } = { ...code, ...choice };
  const label = toLabel({ ...options, name }).text;
  const text = parse.bitParser(options)(src);
  return { options, label, text };
};

const asCodeBlock = (choice) => {
  const { bits, code } = choice;
  const { radix } = code;
  const realRadix = Math.pow(2 ** code.bits, 1 / code.padding);
  const padding = toBlockPadding({ radix: realRadix, bits });
  return toStep({ padding, sep: " ", ...choice, radix });
};

const asBlock = (choice) => {
  const padding = toBlockPadding(choice);
  return toStep({ padding, sep: " ", ...choice });
};

const asList = (choice) => {
  return toStep({ padding: 0, sep: ",", ...choice });
};

const unicodeStep = ({ in8 }) => {
  const code = codes.uint8;
  const parse = parsers.englishText;
  const core = { parse, code, bits: 8, radix: 0, sep: "" };
  return [asList({ ...core, name: "Text", src: toBytes(in8) })];
};

const oneStep = ({ value }) => {
  const parse = parsers.uint8;
  const core = { parse, code: codes.uint8, bits: 8, radix: 10 };
  return [asList({ ...core, src: toBytes([value]) })];
};

const resultSteps = ({ in8, code8, out8 }) => {
  const parse = parsers.uint8;
  const code = codes.uintVarQuat;
  const core = { parse, code: codes.uint8, bits: 8, radix: 16 };
  return [
    asBlock({ ...core, name: "Input", src: toBytes(in8) }),
    asBlock({ ...core, code, name: "Output", src: toBytes(code8) }),
    asList({ ...core, name: "", radix: 10, src: toBytes(out8) }),
  ];
};

const exploreSteps = ({ in8, code8, choice }) => {
  const noCode = codes.uint8;
  const noParse = parsers.uint8;
  const code = codes.uintVarQuat;
  const parse = parsers.uintVarQuat;
  const coreIn = { parse: noParse, code: noCode, sep: " + ", radix: 4 };
  const output = [asList({ ...coreIn, name: "Input", src: toBytes(in8) })];

  if (choice !== null) {
    const coreInner = { parse, code, ...choice };
    const coreChoice = { parse: noParse, code, ...choice };
    return output.concat([
      asCodeBlock({ ...coreInner, name: "Internal", src: toBytes(code8) }),
      asBlock({ ...coreChoice, src: toBytes(code8) }),
    ]);
  }
  return output;
};

export { oneStep, unicodeStep, exploreSteps, resultSteps };
