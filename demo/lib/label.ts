const capFirst = (str) => {
  return str.replace(/^\w/, (c) => {
    return c.toUpperCase();
  });
};

const toUnitLabel = ({ padLen, numBits }) => {
  const patterns = [
    [".*x24", "3-bytes"],
    [".*x8", "bytes"],
    ["1x1", "bits"],
    ["1x.*", "digits"],
    ["2x.*", "pairs"],
    ["3x.*", "trios"],
  ].map(([regex, label]) => ({ regex, label }));
  const key = `${padLen}x${numBits}`;

  return (
    patterns.find(({ regex }) => {
      return key.match(new RegExp(regex));
    })?.label || "???"
  );
};

const toLabel = ({ radix, padLen, numBits }) => {
  const unit = toUnitLabel({ radix, padLen, numBits });
  const base =
    new Map([
      [2, "binary"],
      [3, "ternary"],
      [4, "base-4"],
      [8, "octal"],
      [16, "hex"],
    ]).get(radix) || "???";
  const value = `${base}-${padLen}`;
  const textInput = capFirst(`${base} input`);
  const text = capFirst(`${base} ${unit}`);
  return { value, unit, base, text, textInput };
};

export { toLabel };
