import React from "react";
import styled from "styled-components";
import styles from "./matrix.module.scss";
import { createClassFromSpec } from "react-vega";
import { useHash } from "../../hooks/useHash";
import { useCache } from "../../hooks/useCache";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useComparison } from "../../hooks/useComparison";
import { toSpec } from "../../lib/charts/table";
import { oneStep } from "../../lib/steps";
import { NavLinks } from "../navLinks";
import Status from "../status";

import type { Shape } from "../../lib/charts/table";

const scale = ({ width, height }: Shape, x: number, y: number) => {
  return { width: width * x, height: height * y };
};

const gradient = (() => {
  const color = (alpha) => `rgba(244,244,255,${alpha})`;
  return [color(0.2), color(0.8), color(0.9), color(1)].join(",");
})();
const Main = styled.div`
  background-image: linear-gradient(${gradient});
  grid-auto-rows: auto;
  position: fixed;
  display: grid;
  height: 40vh;
  width: 100%;
  z-index: 100;
  bottom: 0;
  left: 0;
`;

const Footer = styled.div`
  height: ${(props) => props.height}px;
  grid-template-rows: auto auto 1fr;
  display: grid;
`;

const isElement = (x = {}): x is HTMLElement => {
  return ["Width", "Height"].every((k) => `client${k}` in x);
};

const shapeRef = (setShape: (s: Shape) => void) => {
  return (el: unknown) => {
    if (el && isElement(el)) {
      const height = el.clientHeight;
      const width = el.clientWidth;
      setShape({ width, height });
    }
  };
};

const useOnSignal = (setValue) => {
  return (_, v) => setValue(v);
};

const useChoose = () => {
  const { hash, updateHash } = useHash();
  const [choice, setChoice] = React.useState(null);
  const choose =  (reps) => {
    return (_, choice) => {
      setChoice(choice);
      const input = chooseInput(choice, reps)
      updateHash({ input, reps });
    }
  }
  return { hash, choice, choose };
}

const chooseInput = (v, reps) => {
  const input = [];
  if (v && "x" in v && "y" in v) {
    while (input.length < reps * 2) {
      input.push(v.x) && input.push(v.y);
    }
  }
  return input;
}

const labelChoice = (choice) => {
  const defaults = { count: 0, x: "X", y: "Y" };
  const { count, x, y } = { ...defaults, ...choice };
  const cShort = count.toFixed(2).replace(/0?\.?0*$/, "");
  const cPrefix = parseFloat(cShort) !== count ? "~" : "";
  return {
    nBytes: cShort ? `${cPrefix + cShort} Bytes` : "??? Bytes",
    nXnY: `${x},${y}`,
  };
};

const Matrix = (props) => {
  const actions = false;
  const hist = props.history;
  const maxShape = useWindowSize();
  const [shape, setShape] = React.useState(maxShape);
  const { cache, updateCache } = useCache(hist);
  const { hash, choice, choose} = useChoose();
  const rootRef = React.useMemo(() => shapeRef(setShape), [maxShape]);
  const spec = React.useMemo(() => {
    return toSpec(scale(shape, 0.8, 0.5), [0, 2]);
  }, [shape]);

  const { nBytes, nXnY } = labelChoice(choice);
  const data = { ...useComparison(hash), text: [{ nBytes }] };
  const setReps = ([reps]) => {
    choose(reps)("", choice);
  }
  const HeatMap = React.useMemo(() => {
    return createClassFromSpec({ spec });
  }, [spec]);

  const status = (
    <Status
      {...{
        ...oneStep({ value: hash.reps })[0],
        label: `Repetitions of "${nXnY}"`,
        uuid: "repetitions",
        setInput: setReps,
        updateCache,
        cache,
      }}
    />
  );

  const footerHeight = shape.height * 2;
  const signalListeners = { click: choose(hash.reps) };
  const heatMap = { data, actions, signalListeners };
  const links = [{ to: "/list/", text: "View Examples" }];

  return (
    <>
      <Main>
        <div className={styles.row}>
          <div ref={rootRef}>
            <HeatMap {...heatMap} />
          </div>
        </div>
      </Main>
      <Footer height={footerHeight}>
        <div className={styles.row}>
          <NavLinks {...{ links }} />
          <h3>HeatMap Controls</h3>
          <div>{status}</div>
        </div>
      </Footer>
    </>
  );
};

export default Matrix;
