import React from "react";
import Result from "./result";
import { roundTrip } from "../lib/io";
import { compareLength } from "../lib/quality";
import { resultSteps } from "../lib/steps";
import styles from "./results.module.scss";

const Results = ({ result, in8, choice, qualia }) => {
  const { code8, out8 } = roundTrip(in8);
  const { className } = compareLength(in8, code8, qualia);
  const msg = compareLength(in8, code8, [
    "✗ Encoding is longer than input",
    "Encoding is same length as input",
    "✓ Encoding is shorter than input",
  ]);
  const list = [
    {
      ...result,
      prefix: "i0",
      header: { msg, El: "div", cls: className },
      items: resultSteps({ in8, code8, out8 }),
    },
  ];
  const results = list.map((r) => <Result key={r.prefix} {...r} />);
  return (
    <>
      <h2>Input/Output Bytes</h2>
      Here, you can play around with the list of encoded values.
      The "input" hexedecimal bytes will be familiar to any programmer.
      The "output" bytes result from my 2-bit variable-length encoding.
      {results}
    </>
  );
};

export default Results;
