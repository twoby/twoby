import React from "react";
import { useState } from "react";
import styles from "./main.module.scss";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { parseInput, roundTrip } from "../lib/io";
import { explainSteps, explainResults } from "../lib/explain";
import { compareLength, indexQuality } from "../lib/quality.ts";
import { toLabel } from "../lib/label";
import Choices from "./choices";
import Status from "./status";

const SEP = ",";
const Main = (props) => {
  const { cacheText, setCacheText } = props;
  const { input } = {
    input: "",
    ...useParams(),
  };
  const navigate = useNavigate();
  const setInput = (in8) => {
    const output = [...in8].join(SEP);
    const pathname = `/${output}`;
    navigate({ pathname });
  };
  const inString = input.split(SEP);
  const in8 = parseInput(inString, {
    radix: 10,
    sep: SEP,
  });
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
    setCacheText(new Map());
    setChoice(value);
  };
  const togglePad = () => {
    setCacheText(new Map());
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
              const text = cacheText.get(label) || val;
              const setText = (t) => {
                setCacheText(new Map([...cacheText, [label, t]]));
              };
              const fullWidth = key === results.length - 1;
              const cls = fullWidth ? styles.fullWidth : null;
              const statusProps = {
                label,
                text,
                setText,
                key,
                validate,
                setInput,
                cls,
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
              const text = cacheText.get(label) || val;
              const setText = (t) => {
                setCacheText(new Map([...cacheText, [label, t]]));
              };
              const statusProps = {
                label,
                text,
                setText,
                key,
                validate,
                setInput,
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
