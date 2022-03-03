import React from "react";
import { getProps } from "../lib/props";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Main from "./main";
import Examples from "./pages/examples";
import Unicode from "./pages/unicode";
import Matrix from "./pages/matrix";
import { useHashHistory } from "use-hash-history";
import { Routes, Route } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

// Types
import type { Props } from "../lib/props";

const fontColor = "203220";
const mainColor = "f4f4ff";
const fontList = ["Tahoma", "Verdana", "sans-serif"];

const MainDiv = styled.div`
  font-family: ${fontList.join(",")};
  grid-template-columns: minmax(66vw, auto);
  justify-content: space-evenly;
  grid-auto-rows: auto;
  display: grid;
`;
const BodyStyle = createGlobalStyle`
  body {
    background-color: #${mainColor};
    color: #${fontColor};
  }
`;

const Page = (props: Props) => {
  const { hist, inputs } = props;
  const history = useHashHistory(hist);

  const baseProps = { history };
  const mainProps = { ...baseProps, noChoices: false };
  const matrixProps = { ...baseProps };
  const unicodeProps = { ...baseProps };
  const examplesProps = { inputs };
  const main = <Main {...mainProps} />;
  const matrix = <Matrix {...matrixProps} />;
  const unicode = <Unicode {...unicodeProps} />;
  const examples = <Examples {...examplesProps} />;

  //const twobyLink = <a href="https://github.com/twoby/twoby">Twoby</a>;

  return (
    <HistoryRouter {...{ history }}>
      <MainDiv>
        <Routes>
          <Route path="/" element={main}>
            <Route path="heat/:reps/:input" element={matrix} />;
            <Route path="heat/:reps" element={matrix} />;
            <Route path="heat" element={matrix} />;
            <Route path="list/:input" element={examples} />;
            <Route path="list" element={examples} />;
            <Route path="text/:input" element={unicode} />;
            <Route path="text" element={unicode} />;
            <Route path="" element={unicode} />;
          </Route>
        </Routes>
      </MainDiv>
      <BodyStyle />
    </HistoryRouter>
  );
};

Page.defaultProps = {
  ...getProps("default"),
  inputs: [[0, 0, 0, 0]],
};

export default Page;
