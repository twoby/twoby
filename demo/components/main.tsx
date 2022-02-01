import React from "react";
import { useState } from "react";
import styles from "./main.module.scss";
import { Outlet } from "react-router-dom";
import { roundTrip } from "../lib/io";
import { explainSteps, explainResults } from "../lib/explain";
import { compareLength, indexQuality } from "../lib/quality";
import { useHash } from "../hooks/useHash";
import { useCache } from "../hooks/useCache";
import { handleText } from "../lib/handler";
import { toLabel } from "../lib/label";
import Choices from "./choices";
import Status from "./status";

const Main = (props) => {
  const hist = props.history;
  const { hash, updateHash } = useHash();
  const { cache, setCache, updateCache } = useCache(hist);
  const setInput = (input) => updateHash({ input });
  const in8 = hash.input;
  const msg = compareLength(in8, {
    better: "✓ Encoding is shorter than input",
    worse: "✗ Encoding is longer than input",
    equal: "Encoding is same length as input",
  });
  const msgClass = compareLength(in8, styles);
  const { twoby8, out8 } = roundTrip(in8);

  const results = explainResults({ in8, twoby8, out8 });

  const choices = [
    { radix: 2, padLen: 3 },
    { radix: 2, padLen: 8 },
    { radix: 3, padLen: 2, bits: 3 },
    { radix: 3, padLen: 16, bits: 24 },
    { radix: 4, padLen: 12 },
    { radix: 8, padLen: 8 },
    { radix: 16, padLen: 6 },
  ].map((choice) => {
    const { radix, padLen, bits } = choice;
    const numBits = bits ? bits : Math.ceil(Math.log2(radix ** padLen));
    const label = toLabel({ radix, padLen, numBits });
    return {
      ...choice,
      label,
      numBits,
      sep: " ",
    };
  });

  const [pad, setPad] = useState(true);
  const [choice, setChoice] = useState(null);

  const steps = explainSteps({ in8, twoby8, pad, choice });
  const choose = (value) => {
    setCache(new Map());
    setChoice(value);
  };
  const togglePad = () => {
    setCache(new Map());
    setPad(!pad);
  };
  const { padSymbol, padClass } = ((i) => {
    const symbols = { better: "✓" };
    const padClass = indexQuality(i, styles);
    const padSymbol = indexQuality(i, symbols) || "✗";
    return { padClass, padSymbol };
  })(!choice ? 1 : 2 * !!pad);
  const choiceStyles = {
    dropdownClassName: styles.dropdown,
    activeItemClassName: styles.active,
    itemClassName: styles.item,
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.row}>
          <div className={msgClass}>{msg}.</div>
          <div className={styles.result}>
            {results.map(([label, value, sep, validate], key) => {
              const val = [...value].join(sep);
              const text = cache.get(label) || val;
              const setText = (t) => updateCache(label, t);
              const onChange = handleText({
                setInput, setText, validate
              })
              const statusProps = {
                key,
                text,
                label,
                validate,
                onChange
              };
              return <Status {...statusProps} />;
            })}
          </div>
        </div>
        <div className={styles.row}>
          <h3>Explore</h3>
          <div className={styles.result}>
            {steps.map(([label, value, sep, validate], key) => {
              const val = [...value].join(sep);
              const text = cache.get(label) || val;
              const setText = (t) => updateCache(label, t);
              const onChange = handleText({
                setInput, setText, validate
              })
              const statusProps = {
                key,
                text,
                label,
                validate,
                onChange,
              };
              return <Status {...statusProps} />;
            })}
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.center}>
            <span>Integer format</span>
          </div>
          <Choices
            {...{
              choiceStyles,
              choices,
              choice,
              choose,
            }}
          />
          <div className={styles.right}>
            <button onClick={togglePad} className={padClass}>
              {padSymbol} Padding
            </button>
          </div>
        </div>
        <div className={styles.row}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
