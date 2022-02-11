import { toBlockPadding, fromBinary, toBytes, parsers } from "./transcode.ts";
import { toLabel } from "./label.ts";
import { codes } from "./codes.ts";

const toStep = (choice) => {
  const { parse, code, src } = choice;
  const options = { bits: 8, ...choice };
  const { name } = { ...code, ...choice };
  const label = toLabel({ ...options, name }).text;
  const bin = parse.bitParser(options)(src);
  const text = fromBinary(bin, options);
  return { options, label, text };
};

const asBlock = (choice) => {
  const padding = toBlockPadding(choice);
  return toStep({ ...choice, padding, sep: " " });
};

const asList = (choice) => {
  return toStep({ ...choice, padding: 0, sep: "," });
};

const oneStep = ({ value }) => {
  const parse = parsers.uint8;
  const core = { parse, code: codes.uint8, bits: 8, radix: 10 };
  return [asList({ ...core, src: toBytes([value]) })];
};

const resultSteps = ({ in8, code8, out8 }) => {
  const parse = parsers.uint8;
  const core = { parse, code: codes.uint8, bits: 8, radix: 16 };
  return [
    asBlock({ ...core, name: "Input", src: toBytes(in8) }),
    asBlock({ ...core, name: "Output", src: toBytes(code8) }),
    asList({ ...core, name: "", radix: 10, src: toBytes(out8) }),
  ];
};

const exploreSteps = ({ in8, code8, choice }) => {
  const noCode = codes.uint8;
  const noParse = parsers.uint8;
  const code = codes.uintVarTern;
  const parse = parsers.uintVarTern;
  const coreIn = { parse: noParse, code: noCode, sep: ",2,", radix: 2 };
  const output = [asList({ ...coreIn, name: "Input", src: toBytes(in8) })];
  if (choice !== null) {
    const coreInner = { parse, code, ...choice, radix: 3 };
    const coreChoice = { parse: noParse, code, ...choice };
    return output.concat([
      asBlock({ ...coreInner, name: "Internal", src: toBytes(code8) }),
      asBlock({ ...coreChoice, src: toBytes(code8) }),
    ]);
  }
  return output;
};

export { oneStep, exploreSteps, resultSteps };
