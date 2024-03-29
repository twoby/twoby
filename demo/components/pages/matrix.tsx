import React from "react";
import styled from "styled-components";
import styles from "./matrix.module.scss";
import { createClassFromSpec } from "react-vega";
import { Scroll } from "../scroll";
import { WikiVarLen } from "../hyperlinks";
import { useHash } from "../../hooks/useHash";
import { useCache } from "../../hooks/useCache";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useComparison } from "../../hooks/useComparison";
import { compareValue, listQuality } from "../../lib/quality.ts";
import { toSpec } from "../../lib/charts/table";
import { oneStep } from "../../lib/steps";
import Status from "../status";

import type { Shape } from "../../lib/charts/table";

const scale = ({ width, height }: Shape, x: number, y: number) => {
  return { width: width * x, height: height * y };
};

const Main = styled.div`
  display: grid;
  width: 100%;
`;

const isElement = (x = {}): x is HTMLElement => {
  return ["Width", "Height"].every((k) => `client${k}` in x);
};

const shapeRef = (setShape: (s: Shape) => void) => {
  return (el: unknown) => {
    if (el && isElement(el)) {
      const w = el.clientWidth;
      setShape({ width: w, height: w*0.75 });
    }
  };
};

const useOnSignal = (setValue) => {
  return (_, v) => setValue(v);
};

const useChoose = () => {
  const { hash, updateHash } = useHash();
  const [choice, setChoice] = React.useState(null);
  const choose = (reps) => {
    return (_, choice) => {
      setChoice(choice);
      const input = chooseInput(choice, reps);
      updateHash({ input, reps });
    };
  };
  return { hash, choice, choose };
};

const chooseInput = (v, reps) => {
  const input = [];
  if (v && "x" in v && "y" in v) {
    while (input.length < reps * 2) {
      input.push(v.x) && input.push(v.y);
    }
  }
  return input;
};

const labelChoice = (choice) => {
  const defaults = { count: 0, x: "X", y: "Y" };
  const { count, x, y } = { ...defaults, ...choice };
  const cShort = count.toFixed(2).replace(/0?\.?0*$/, "");
  const cPrefix = parseFloat(cShort) !== count ? "≈" : "";
  return {
    nBytes: cShort ? `${cPrefix + cShort} Bytes` : "??? Bytes",
    nXnY: `${x},${y}`,
  };
};

const Matrix = (props) => {
  const actions = false;
  const hist = props.history;
  const maxShape = useWindowSize();
  const { cache, updateCache } = useCache(hist);
  const { hash, choice, choose } = useChoose();
  const [shape, setShape] = React.useState(maxShape);
  const rootRef = React.useMemo(() => shapeRef(setShape), [maxShape]);
  const spec = React.useMemo(() => {
    return toSpec(scale(shape, 0.8, 0.5), [0, 2]);
  }, [shape]);

  const { nBytes, nXnY } = labelChoice(choice);
  const data = { ...useComparison(hash), text: [{ nBytes }] };
  const setReps = (reps) => {
    choose(reps)("", choice);
  };
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
        updateCache: (k, v) => {
          updateCache(k, v);
        },
        cache,
      }}
    />
  );

  const signalListeners = { click: choose(hash.reps) };
  const heatMap = { data, actions, signalListeners };

  const qualia = listQuality(styles);
  const inputs = [
    1, 2, 3, 10, 16, 32
  ];
  return (
    <Main>
      <div className={styles.row}>
        <p id="matrix">
        Choose a pair of numbers here. Pairs of small
        numbers need {"< 1"} byte in 2-bit
        <WikiVarLen/> encoding.
        </p> 
        <div ref={rootRef}>
          <HeatMap {...heatMap} />
        </div>
      </div>
      <div className={styles.row}>
        <h2>Number of Copies</h2>
        <p>
        If large numbers (65 to 255) pair with
        small numbers ({"<16"}), the trend tends
        toward 75–95% of typical bytes used. If
        most numbers are small, the ratio shrinks.
        </p> 
        <div className={styles.examples}>
          {inputs.map((reps, key) => {
            const q = compareValue(hash.reps, reps, qualia);
            const { className } = q;
            const selector = "#matrix";
            const onClick = () => setReps(reps);
            const sProps = { key, className, onClick, selector };
            return <Scroll {...sProps}>{reps} Copies</Scroll>;
          })}
        </div>
        <p>
        Many repeated small values lead to a shorter encoding.
        </p> 
      </div>
    </Main>
  );
};

export default Matrix;
