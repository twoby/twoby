import React from "react";
import styles from "./unicode.module.scss";
import { roundTrip } from "../../lib/io";
import { useCache } from "../../hooks/useCache";
import { useHash } from "../../hooks/useHash";
import { compareLength, listQuality } from "../../lib/quality.ts";
import { unicodeStep } from "../../lib/steps";
import Result from "../result";

const Unicode = (props) => {
  const hist = props.history;
  const { noNav = false } = props;
  const { hash, updateHash } = useHash();
  const { cache, updateCache } = useCache(hist);
  const setInput = (input) => updateHash({ input });

  const in8 = hash.input;
  const { code8 } = roundTrip(in8);
  const diff = code8.length - in8.length;
  const sign = ["-", "", "+"][Math.sign(diff) + 1];
  const percent = Math.abs(100 * (diff / in8.length)).toFixed(1);
  const msg = compareLength(in8, code8, [
    `✗ Encoding is ${diff} more bytes (${sign}${percent}%).`,
    `Both ASCII and encoding are ${in8.length} bytes.`,
    `✓ Encoding is ${-diff} fewer bytes (${sign}${percent}%).`,
  ]);
  const { className } = compareLength(in8, code8, listQuality(styles));
  const resultProps = {
    cache,
    setInput,
    updateCache,
    cls: styles.row,
    prefix: "unicode",
    items: unicodeStep({ in8 }),
    header: { msg, El: "div", cls: className },
  };
  return (
    <>
      <h2>ASCII</h2>
      <div className={styles.examples}>
        <Result {...resultProps} />
      </div>
    </>
  );
};

export default Unicode;
