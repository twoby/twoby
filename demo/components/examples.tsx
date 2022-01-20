import React from "react";
import styles from "./examples.module.scss";
import { Link } from "react-router-dom";
import { encode, decode } from "../../src/index.ts";

// Types
import type { Props } from "../lib/props";

const toUint8 = (input) => {
  return Uint8Array.from(input);
};

const roundTrip = (in8) => {
  const twoby8 = toUint8(encode(in8));
  const out8 = toUint8(decode(twoby8));
  return { twoby8, out8 };
};

const indexQuality = (i, source = null) => {
  const label = ["worse", "equal", "better"][i];
  return source ? source[label] : label;
};

const compareLength = (in8, source) => {
  const { twoby8 } = roundTrip(in8);
  const diff = Math.sign(in8.length - twoby8.length);
  return indexQuality(diff + 1, source);
};

const Examples = (props: Props) => {
  const { inputs, clearCache } = props;
  const onClick = () => {
    clearCache();
  };
  return (
    <>
      <h3>Examples</h3>
      <div className={styles.examples}>
        {inputs.map((list, key) => {
          const text = list.join(", ");
          const to = "/" + list.join(",");
          const in8 = toUint8(list);
          const className = compareLength(in8, styles);
          const linkProps = { key, className, to, onClick };
          return <Link {...linkProps}>[{text}]</Link>;
        })}
      </div>
    </>
  );
};

export default Examples;
