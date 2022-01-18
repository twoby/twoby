import { suite } from "uvu";
import * as assert from "uvu/assert";
import { encode, decode } from "../src/index.ts";

const TESTS = [[], [0], [2, 2, 2, 2]];

const testUint8 = (input) => {
  const in8 = Uint8Array.from(input);
  const twob = Uint8Array.from(encode(in8));
  const out8 = Uint8Array.from(decode(twob));
  assert.equal(in8, out8);
};

// Test parse of hash
const testRoundtrip = (label, { input }) => {
  const TestRoundtrip = suite(`Test ${label}: round trip`);

  TestRoundtrip(`test uint8`, () => {
    testUint8(input);
  });

  return TestRoundtrip;
};

// Run the tests
TESTS.forEach((input) => {
  testRoundtrip("Twoby", { input }).run();
});
