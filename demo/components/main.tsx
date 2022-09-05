import React from "react";
import { useState } from "react";
import styles from "./main.module.scss";
import { Outlet } from "react-router-dom";
import { listQuality } from "../lib/quality";
import { useCache } from "../hooks/useCache";
import { useHash, usePage } from "../hooks/useHash";
import { NavLinks } from "./pages/navLinks";
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

  const choiceProps = {
    pad, qualia, choices,
    choice, choose, togglePad
  };
  const result = { cls: styles.row, cache, updateCache, setInput };
  const results = { result, in8, choice, qualia };
  const activePage = usePage();
  const links = [
    { to: "/list/", text: "Explanation!" },
    { to: "/text/", text: "English Text" },
    { to: "/heat/", text: "Trend Chart" },
  ].filter(({ to }) => !to.match(new RegExp("^/" + activePage)));

  return (
    <>
      <NavLinks {...{ links }} />
      <div className={styles.main}>
        <div className={styles.row}>
          <Outlet />
        </div>
        <Results key={0} {...results}/>
        <div className={styles.row}>
        </div>
      </div>
    </>
  );
};

export default Main;
