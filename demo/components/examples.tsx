import React from "react";
import styles from "./examples.module.scss";
import { Link } from "react-router-dom";
import { compareLength } from "../lib/quality.ts";

// Types
import type { Props as AllProps } from "../lib/props";
type Props = Pick<AllProps, "inputs">

const toUint8 = (input) => {
  return Uint8Array.from(input);
};

const Examples = (props: Props) => {
  const { inputs } = props;
  return (
    <>
      <h3>Examples</h3>
      <div className={styles.examples}>
        {inputs.map((list, key) => {
          const text = list.join(", ");
          const to = "/" + list.join(",");
          const in8 = toUint8(list);
          const className = compareLength(in8, styles);
          const linkProps = { key, className, to };
          return <Link {...linkProps}>[{text}]</Link>;
        })}
      </div>
    </>
  );
};

export default Examples;
