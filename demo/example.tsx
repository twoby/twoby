import React from "react";
import { getProps } from "./exampleProps";
import styles from "./example.module.css";
import {
  useParams,
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { encode, decode, _groupN } from "../src/index.ts";

// Types
import type { Props } from "./exampleProps";

const writeBytes = (input, n = 2) => {
  const bytes = [...input]
    .map((n) => {
      return _groupN(n.toString(16), 2)[0];
    })
    .join("");
  return _groupN(bytes, n).join(" ");
};
const toUint8 = (input) => {
  return Uint8Array.from(input);
};

const parseInput = (input) => {
  const inputList = input.split(",").map((n) => {
    return parseInt(n, 10);
  });
  return toUint8(inputList);
};

const roundTrip = (in8) => {
  const twoby8 = toUint8(encode(in8));
  const out8 = toUint8(decode(twoby8));
  return { twoby8, out8 };
};

const compareLength = (in8, source) => {
  const { twoby8 } = roundTrip(in8);
  const diff = Math.sign(in8.length - twoby8.length);
  return source[["worse", "equal", "better"][diff + 1]];
};

const Status = () => {
  const { input } = {
    input: "",
    ...useParams(),
  };
  const in8 = parseInput(input);
  const cls = compareLength(in8, styles);
  const msg = compareLength(in8, {
    better: "✓ Encoding is shorter than input",
    worse: "✗ Encoding is longer than input",
    equal: "Encoding is same length as input",
  });
  const { twoby8, out8 } = roundTrip(in8);
  return (
    <>
      <div className={cls}>{msg}.</div>
      <div className={styles.result}>
        <div>Input Hex</div>
        <div className={styles.bytes}>{writeBytes(in8, 2)}</div>
        <div>Twoby Hex</div>
        <div className={styles.bytes}>{writeBytes(twoby8, 2)}</div>
        <div>Integers</div>
        <div>{out8.join(", ")}</div>
      </div>
    </>
  );
};

const Example = ({ inputs }: Props) => {
  const element = <Status />;

  const twoby_link = <a href="https://github.com/twoby/twoby">Twoby</a>;
  return (
    <HashRouter history={history}>
      <h2>{twoby_link} (two-separated binary)</h2>
      <div>
        <Routes>
          <Route path="/:input" element={element} />;
          <Route path="*" element={element} />;
        </Routes>
      </div>
      <h3>Examples</h3>
      <div className={styles.options}>
        {inputs.map((list, i) => {
          const in8 = toUint8(list);
          const cls = compareLength(in8, styles);
          const text = list.join(", ");
          const path = list.join(",");
          return (
            <Link key={i} className={cls} to={`/${path}`}>
              [{text}]
            </Link>
          );
        })}
      </div>
    </HashRouter>
  );
};

Example.defaultProps = {
  ...getProps("default"),
  inputs: [[0, 0, 0, 0]],
};

export default Example;
