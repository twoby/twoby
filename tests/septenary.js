import { suite } from "uvu";
import * as assert from "uvu/assert";
import { encode, decode } from "../src/index.ts";
import { septenary } from "../src/index.ts";

const TESTS = [[255, 127, 63, 3, 1, 0]];
const encode7 = septenary.encode;
const decode7 = septenary.decode;

const testUint8 = (input, opts) => {
  const in8 = Uint8Array.from(input);
  const twob = Uint8Array.from(encode(in8, {...opts, handler: encode7}));
  const out8 = Uint8Array.from(decode(twob, {...opts, handler: decode7}));
  assert.equal(in8, out8);
};

// Test parse of hash
const testRoundtrip = (label, { input, opts }) => {
  const TestRoundtrip = suite(`Test ${label}: round trip`);

  TestRoundtrip(`test uint8`, () => {
    testUint8(input, opts);
  });

  return TestRoundtrip;
};

// Run the tests
TESTS.forEach((input) => {
  testRoundtrip("Twoby", {
    input,
    opts: {
      order: [3, 1, 0]
    }
  }).run();
});
