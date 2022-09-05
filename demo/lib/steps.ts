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
  return [asList({ ...core, name: "ASCII Text Input:", src: toBytes(in8) })];
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
    asList({ ...core, name: "", radix: 10, src: toBytes(out8) }),
    asBlock({ ...core, name: "Input", src: toBytes(in8) }),
    asBlock({ ...core, code, name: "Output", src: toBytes(code8) }),
  ];
};

export { oneStep, unicodeStep, resultSteps };
