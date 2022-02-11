import React from "react";
import Status from "./status";
import { roundTrip } from "../lib/io";
import { compareLength } from "../lib/quality";
import { exploreSteps, resultSteps } from "../lib/steps";
import styles from "./results.module.scss";

const Header = ({ El, cls = null, msg = "" }) => {
  return <El className={cls}>{msg}</El>;
};

const Result = (props) => {
  const { prefix, header, items, cache } = props;
  const { updateCache, setInput } = props;
  return (
    <div className={props.cls}>
      <Header {...header} />
      <div className={styles.result}>
        {items.map((item, key) => {
          return (
            <Status
              {...{
                ...item,
                uuid: `${prefix}-${key}`,
                updateCache,
                setInput,
                cache,
                key,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const Results = ({ result, in8, choice, qualia }) => {
  const { code8, out8 } = roundTrip(in8);
  const { className } = compareLength(in8, code8, qualia);
  const msg = compareLength(in8, code8, [
    "✗ Encoding is longer than input",
    "Encoding is same length as input",
    "✓ Encoding is shorter than input",
  ]);
  const results = [
    {
      ...result,
      prefix: "i0",
      header: { msg, El: "div", cls: className },
      items: resultSteps({ in8, code8, out8 }),
    },
    {
      ...result,
      prefix: "i1",
      header: { msg: "Explore", El: "h3" },
      items: exploreSteps({ in8, code8, choice }),
    },
  ].map((r) => <Result key={r.prefix} {...r} />);
  return <>{results}</>;
};

export default Results;
