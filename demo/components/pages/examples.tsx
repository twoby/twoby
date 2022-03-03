import React from "react";
import styles from "./examples.module.scss";
import { roundTrip, toUint8 } from "../../lib/io";
import { compareLength, listQuality } from "../../lib/quality.ts";
import { Link } from "react-router-dom";

// Types
import type { Props as AllProps } from "../lib/props";
type Props = Pick<AllProps, "inputs">;

const Examples = (props: Props) => {
  const { inputs } = props;
  const qualia = listQuality(styles);
  return (
    <>
      <h3>Examples</h3>
      <div className={styles.examples}>
        {inputs.map((list, key) => {
          const text = list.join(", ");
          const in8 = toUint8(list);
          const { code8 } = roundTrip(in8);
          const to = "/list/" + list.join(",");
          const { className } = compareLength(in8, code8, qualia);
          const linkProps = { key, className, to };
          return <Link {...linkProps}>[{text}]</Link>;
        })}
      </div>
    </>
  );
};

export default Examples;
