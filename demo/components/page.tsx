import React from "react";
import { useState } from "react";
import { getProps } from "../lib/props";
//import styled from 'styled-components/macros';
import Controls from "./controls";
import Examples from "./examples";
import { HashRouter, Routes, Route } from "react-router-dom";

// Types
import type { Props } from "../lib/props";

const Page = (props: Props) => {
  const [cacheText, setCacheText] = useState(new Map());
  const controlsProps = { cacheText, setCacheText };
  const clearCache = () => setCacheText(new Map());
  const examplesProps = {
    ...props,
    clearCache,
  };

  const controls = <Controls {...controlsProps} />;
  const examples = <Examples {...examplesProps} />;

  const twobyLink = <a href="https://github.com/twoby/twoby">Twoby</a>;

  return (
    <HashRouter history={history}>
      <h2>{twobyLink} (two-separated binary)</h2>
      <div>
        <Routes>
          <Route path="/" element={controls}>
            <Route path=":input" element={examples} />;
            <Route path="" element={examples} />;
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
};

Page.defaultProps = {
  ...getProps("default"),
  inputs: [[0, 0, 0, 0]],
};

export default Page;
