import React from "react";
import { useState } from "react";
import styles from "./main.module.scss";
import { Outlet } from "react-router-dom";
import { listQuality } from "../lib/quality";
import { useCache } from "../hooks/useCache";
import { useHash } from "../hooks/useHash";
import Choices from "./choices";
import Results from "./results";

const Main = (props) => {
  const hist = props.history;
  const { hash, updateHash } = useHash();
  const { cache, setCache, updateCache } = useCache(hist);
  const setInput = (input) => updateHash({ input });
  const in8 = hash.input;
  const qualia = listQuality(styles);
  const choices = [
    { radix: 2, bits: 3 },
    { radix: 2, bits: 4 },
    { radix: 16, bits: 8 },
    { radix: 16, bits: 24 },
  ];

  const [pad, setPad] = useState(true);
  const [choice, setChoice] = useState(choices[0]);

  const choose = (value) => {
    setCache(new Map());
    setChoice(value);
  };
  const togglePad = () => {
    setCache(new Map());
    setPad(!pad);
  };

  const choiceProps = { pad, qualia, choices, choice, choose, togglePad };
  const result = { cls: styles.row, cache, updateCache, setInput };
  const results = { result, in8, choice, qualia };
  return (
    <>
      <div className={styles.main}>
        <Results {...results} />
        <Choices {...choiceProps} />
        <div className={styles.row}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
