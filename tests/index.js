import { suite } from "uvu";
import * as assert from "uvu/assert";
import { encode, decode } from "../src/index.ts";

const listTestsForUint8 = () => {
  const evenOdd20 = [1, 2, 3, 4, 9, 18, 19, 20];
  const small2 = [0, 1, 2, 4, 8, 16, 32, 64, 128];
  const alt50 = [51, 52, 51, 52, 51, 52, 51, 52, 51];
  return [[0], evenOdd20, alt50, small2];
};

const listTestsForUint64 = () => {
  const huge1 = BigInt(2) ** BigInt(55);
  const huge2 = BigInt(2) ** BigInt(60);
  const evenOdd20 = ["0", "12349", "181920"];
  const altHuge = [huge1, "0", huge2, huge1, huge2];
  const descend = ["987654321", "8765432", "7654"];
  return [["0"], evenOdd20, altHuge, descend];
};

const testUint8 = (input) => {
  const in8 = Uint8Array.from(input);
  const twob = Uint8Array.from(encode(in8));
  const out8 = Uint8Array.from(decode(twob));
  assert.equal(in8, out8);
};

const bigToString = (input) => {
  return [...input].map((n) => n.toString());
};

const testUint64 = (input) => {
  const in64 = BigUint64Array.from(input);
  const twob = BigUint64Array.from(encode(in64));
  const out64 = BigUint64Array.from(decode(twob));
  const in64s = bigToString(in64);
  const out64s = bigToString(out64);
  assert.equal(in64s, out64s);
};

// Test parse of hash
const runTestSuite = (label, input) => {
  const TestSuite = suite(`Test ${label}`);
  TestSuite(label, tester);
  return TestSuite;
};

// Run the tests
listTestsForUint8().forEach((input) => {
  tester = () => testUint8(input);
  runTestSuite("Twoby Integration 8bit", tester).run();
});

listTestsForUint64().forEach((input) => {
  tester = () => testUint64(input);
  runTestSuite("Twoby Integration 64bit", tester).run();
});
