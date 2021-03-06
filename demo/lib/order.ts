const englishOrderObject = {
  "0": 24,
  "1": 25,
  "2": 28,
  "3": 41,
  "4": 40,
  "5": 27,
  "6": 44,
  "7": 51,
  "8": 42,
  "9": 32,
  " ": 0,
  e: 1,
  t: 2,
  a: 3,
  o: 4,
  n: 5,
  i: 6,
  s: 7,
  r: 8,
  h: 9,
  l: 10,
  d: 11,
  c: 12,
  u: 13,
  m: 14,
  f: 15,
  p: 16,
  g: 17,
  y: 18,
  w: 19,
  ",": 20,
  ".": 21,
  b: 22,
  v: 23,
  k: 26,
  T: 29,
  S: 30,
  '"': 31,
  A: 33,
  M: 34,
  "-": 35,
  C: 36,
  I: 37,
  N: 38,
  "'": 39,
  B: 43,
  R: 45,
  P: 46,
  E: 47,
  D: 48,
  H: 49,
  x: 50,
  W: 52,
  L: 53,
  O: 54,
  F: 55,
  Y: 56,
  G: 57,
  J: 58,
  z: 59,
  j: 60,
  U: 61,
  q: 62,
  "\n": 63,
  ":": 64,
  ")": 65,
  "(": 66,
  $: 67,
  K: 68,
  ";": 69,
  V: 70,
  "*": 71,
  "?": 72,
  Q: 73,
  "/": 74,
  X: 75,
  "&": 76,
  Z: 77,
  "!": 78,
  "%": 79,
  "+": 80,
  ">": 81,
  "<": 82,
  "=": 83,
  "#": 84,
  "@": 85,
  "[": 86,
  "\\": 87,
  "]": 88,
  "^": 89,
  _: 90,
  "`": 91,
  "{": 92,
  "|": 93,
  "}": 94,
  "~": 95,
};
const sortOrder = (o) => {
  return Object.keys(o).sort((a, b) => o[a] - o[b]);
};

const englishOrder = {
  dict: englishOrderObject,
  list: sortOrder(englishOrderObject),
};

export { englishOrder };
