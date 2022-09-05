import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const genericGridStyle = `
  gap: 0.333em;
  display: grid;
  justify-items: center;
  justify-content: space-evenly;
`;

const Wrapper = styled.div`
  ${genericGridStyle}
  grid-template-columns: 1fr auto 1fr;
  padding-top: 1em;
`;

const Row = styled.div`
  ${genericGridStyle}
  grid-template-columns: repeat(${({ n }) => n}, 1fr);
  grid-column: 2;
`;

const Margin = styled.div`
  margin: 0.5em;
`;

const NavLinks = (props) => {
  const { links, noNav = false } = props;

  if (noNav) {
    return "";
  }
  return (
    <Wrapper>
      <Row n={links.length}>
        {links.map(({ text, ...link }, i) => {
          if (link.to.slice(6) == "https:") {
            return (
              <Margin key={i}>
                <a href={link}>{text}</a>
              </Margin>
            );
          }
          return (
            <Margin key={i}>
              <Link {...link}>{text}</Link>
            </Margin>
          );
        })}
      </Row>
    </Wrapper>
  );
};

export { NavLinks };
