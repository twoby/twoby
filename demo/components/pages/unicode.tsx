import React from "react";
import styles from "./unicode.module.scss";
import { Link } from "react-router-dom";
import { roundTrip } from "../../lib/io";
import { useCache } from "../../hooks/useCache";
import { useHash } from "../../hooks/useHash";
import { WikiFreq, WikiAscii } from "../hyperlinks";
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
      <h2>Shrink English Text</h2>
      <p>
        English <WikiFreq/> shows a few common
        letters occur <em>way more often</em>
        {" "}than most (less common) letters.
        With a <Link to="/list/"> two-bit encoding</Link>,
        it's possible to store common letters with way
        fewer binary bits than rare letters:
      </p>
      <ul>
        <li> "a", "e", "t", and whitespace use 3-bits.</li>
        <li> "c", "d", "f", "h", "i", "l"–"o", "r", "s", and "u" each use 6-bits.</li>
        <li> The rest of the lowercase letters (and some capitals) use 9-bits.</li>
        <li> Other capitals, digits, and symbols need 12-bits. </li>
      </ul>
      <p>
        Since normal <WikiAscii/> uses 8-bits, most
        English text needs fewer bytes without any
        compression.
      </p>
      <div className={styles.examples}>
        <Result {...resultProps} />
      </div>
    </>
  );
};

export default Unicode;
