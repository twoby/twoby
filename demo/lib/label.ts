import { toBlockPadding } from "./transcode";

const capFirst = (str) => {
  return str.replace(/^\w/, (c) => {
    return c.toUpperCase();
  });
};

const toSepLabel = ({ sep }) => {
  const patterns = new Map([[".*2.*", "joined by 2"]]);
  const pattern = [...patterns.keys()].find((regex) => {
    return sep?.match(new RegExp(regex));
  });
  const suffix = patterns.get(pattern) || "";
  return suffix.split(" ");
};

const toUnitLabel = (choice) => {
  const bytePadding = toBlockPadding(choice);
  const { padding } = { padding: bytePadding, ...choice };
  const key = `${padding}x${choice.bits || 0}`;
  const patterns = new Map([
    ["0x.*", ""],
    [".*x24", "byte trios"],
    [".*x3", "bit trios"],
    [".*x4", "nibbles"],
    [".*x8", "bytes"],
    ["1x.*", "digits"],
    ["2x.*", "pairs"],
    ["3x.*", "trios"],
  ]);
  const pattern = [...patterns.keys()].find((regex) => {
    return key.match(new RegExp(regex));
  });
  const suffix = patterns.get(pattern) || "";
  return suffix.split(" ");
};

const matchLabel = (o) => {
  return [o.name, toBase(o), ...toUnitLabel(o), ...toSepLabel(o)];
};

const toBase = ({ radix }) => {
  return (
    new Map([
      [2, "binary"],
      [3, "ternary"],
      [10, "decimal"],
      [16, "hex"],
    ]).get(radix) || `base-${radix}`
  );
};

const toLabel = (choice) => {
  const labels = matchLabel(choice).filter((v) => v);
  return {
    text: capFirst(labels.join(" ")),
    value: labels.join("-"),
  };
};

export { toLabel, capFirst, toBase };
