import React from "react";

const wikiVarLen = "https://en.wikipedia.org/wiki/Variable-length_code";
const wikiFreq = "https://en.wikipedia.org/wiki/Frequency_analysis"
const wikiAscii = "https://en.wikipedia.org/wiki/ASCII"
const home = "https://tvquizphd.com"

const WikiVarLen = () => {
  return (
    <>
      {" "}<a href={wikiVarLen}>variable-length</a>{" "}
    </>
  );
}

const WikiFreq = () => {
  return (
    <>
      {" "}<a href={wikiFreq}>frequency&nbsp;analysis</a>{" "}
    </>
  );
}

const WikiAscii = () => {
  return (
    <>
      {" "}<a href={wikiAscii}>ASCII text</a>{" "}
    </>
  );
}

const Home = () => {
  return (
    <>
      {" "}<a href={home}>TVQuizPhD.com</a>{" "}
    </>
  );
}
export {
  WikiVarLen,
  WikiFreq,
  WikiAscii,
  Home
}
