import React from "react";
import styled from "styled-components";
import styles from "./matrix.module.scss";
import { createClassFromSpec } from "react-vega";
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

const Controls = styled.div`
  grid-template-rows: 1fr;
  display: grid;
`;

const isElement = (x = {}): x is HTMLElement => {
  return ["Width", "Height"].every((k) => `client${k}` in x);
};

const shapeRef = (setShape: (s: Shape) => void) => {
  return (el: unknown) => {
    if (el && isElement(el)) {
      const w = el.clientWidth;
      setShape({ width: w, height: w });
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
        <p>
        Choose pair of integers from the heatmap to see
        how 2-bit variable length encoding reduces the
        bytes needed to encode small integers.
        </p> 
        <div ref={rootRef}>
          <HeatMap {...heatMap} />
        </div>
      </div>
      <div className={styles.row}>
        <Controls>
          <h2>Number of Copies</h2>
          <p>
          Here, we test longer text by repeating the chosen x,y pair.
          Longer blocks of text show a more gradual effect when it
          comes to deciding whether variable length encoding results
          in a shorter or a longer encoding of the values.
          </p> 
          <p> 
            <strong>The number of copies of the pair:</strong>
          </p> 
          <br/>
          <div className={styles.examples}>
            {inputs.map((reps, key) => {
              const q = compareValue(hash.reps, reps, qualia);
              const { className } = q;
              const onClick = () => setReps(reps);
              const divProps = { key, className, onClick };
              return <div {...divProps}>{reps}</div>;
            })}
          </div>
        </Controls>
      </div>
    </Main>
  );
};

export default Matrix;
