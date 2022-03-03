import React from "react";
import { useState } from "react";
import styles from "./main.module.scss";
import { Outlet } from "react-router-dom";
import { listQuality } from "../lib/quality";
import { useCache } from "../hooks/useCache";
import { useHash, usePage } from "../hooks/useHash";
import { NavLinks } from "./pages/navLinks";
import Choices from "./choices";
import Results from "./results";

const Main = (props) => {
  const hist = props.history;
  const { noChoices = false } = props;
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

  const noExplore = noChoices;
  const choiceProps = { pad, qualia, choices, choice, choose, togglePad };
  const result = { cls: styles.row, cache, updateCache, setInput };
  const results = { result, in8, choice, qualia, noExplore };
  const activePage = usePage();
  const items = [
    <Results key={0} {...results} />,
    noChoices ? "" : <Choices key={1} {...choiceProps} />,
    <div key={2} className={styles.row}>
      <Outlet />
    </div>,
  ];

  if (activePage === "text") {
    items.reverse();
  }

  const links = [
    { to: "/list/", text: "Basic Examples" },
    { to: "/text/", text: "Text Encoding" },
    { to: "/heat/", text: "Heatmap Graph" },
  ].filter(({ to }) => !to.match(new RegExp("^/" + activePage)));

  return (
    <>
      <NavLinks {...{ links }} />
      <div className={styles.main}>{items}</div>
    </>
  );
};

export default Main;
