import React from "react";
import { getProps } from "../lib/props";
import { createGlobalStyle } from 'styled-components'
import styled from "styled-components";
import Main from "./main";
import Examples from "./examples";
import { useHashHistory } from "use-hash-history";
import { Routes, Route } from "react-router-dom";
import { 
  unstable_HistoryRouter as HistoryRouter
} from "react-router-dom";
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
`

const Page = (props: Props) => {
  const { hashRoot, inputs } = props;
  const history = useHashHistory({ hashRoot });
  const mainProps = { history };
  const routerProps = { history };
  const examplesProps = { inputs };
  const main = <Main {...mainProps} />;
  const examples = <Examples {...examplesProps} />;

  const twobyLink = <a href="https://github.com/twoby/twoby">Twoby</a>;

  return (
    <HistoryRouter {...routerProps}>
      <MainDiv>
        <h2>{twobyLink} (two-separated binary)</h2>
        <Routes>
          <Route path="/" element={main}>
            <Route path=":input" element={examples} />;
            <Route path="" element={examples} />;
          </Route>
        </Routes>
      </MainDiv>
      <BodyStyle/>
    </HistoryRouter>
  );
};

Page.defaultProps = {
  ...getProps("default"),
  inputs: [[0, 0, 0, 0]],
};

export default Page;
