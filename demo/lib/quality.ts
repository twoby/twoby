const listQuality = (obj) => {
  return ["✗", "✗", "✓"].map((symbol, i) => {
    const list = [obj.worse, obj.equal, obj.better];
    return { symbol, className: list[i] };
  });
};

const compareLength = (a, b, source) => {
  const diff = Math.sign(a.length - b.length);
  return source[diff + 1];
};

export { listQuality, compareLength };
