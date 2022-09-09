import React from "react";
import Result from "./result";
import { roundTrip } from "../lib/io";
import { useLocation } from 'react-router-dom'
import { WikiAscii } from "./hyperlinks";
import { compareLength } from "../lib/quality";
import { resultSteps } from "../lib/steps";
import styles from "./results.module.scss";

const Results = (props) => {
  const { result, in8, choice, qualia } = props;
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
  let flavorText = "";
  const location = useLocation();
  if (location.pathname.slice(1,5) == "text") {
    flavorText = (
      <>
        Programers, notice "input" hex pairs are <WikiAscii/> bytes.
      </>
    );
  }
  return (
    <>
      <h2>Input/Output Bytes</h2>
      <p id="results">
        Freely change the list of encoded values.
        {flavorText}
        The 2-bit variable-length encoding yields the "output" bytes.
      </p>
      {results}
    </>
  );
};

export default Results;
