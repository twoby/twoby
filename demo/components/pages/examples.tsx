import React from "react";
import styles from "./examples.module.scss";
import { WikiVarLen } from "../hyperlinks";
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
      <h2>Numerical Encoding</h2>
      <p>
      Instead of storing numbers as 8 bits, my <WikiVarLen/>
      uses as few 2-bit blocks as possible. Each block has
      a single-bit prefix, so:
      </p>
      <ul>
        <li>1 or 2-bit numbers {"< 4"} need 3-bits.</li>
        <li>3 or 4-bit numbers {"< 16"} need 6-bits.</li>
        <li>5 or 6-bit numbers {"< 64"} need 9-bits.</li>
        <li>7 or 8-bit numbers {"< 256"} need 12-bits.</li>
      </ul>
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
      <br/>
      <p className={styles.high}>
       Lists with many smaller numbers need {" "}
       <span {...qualia[2]}>fewer&nbsp;bits</span>{". "}
       Lists with many larger numbers need {" "}
       <span {...qualia[0]}>more&nbsp;bits</span>{". "}
       Many lists of numbers will be
       <span {...qualia[1]}>somewhere&nbsp;inbetween</span>{", "}
       with roughly as many bits as standard 8-bit integers.
      </p>
    </>
  );
};

export default Examples;
