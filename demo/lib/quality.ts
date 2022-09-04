const listQuality = (obj) => {
  return ["✗", "✗", "✓"].map((symbol, i) => {
    const list = [obj.worse, obj.equal, obj.better];
    return { symbol, className: list[i] };
  });
};

const compareValue = (a, b, source) => {
  const diff = Math.sign(a - b);
  return source[diff + 1];
};

const compareLength = (a, b, source) => {
  return compareValue(a.length, b.length, source);
};

export { listQuality, compareLength, compareValue };
