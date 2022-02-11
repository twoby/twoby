import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Row = styled.div`
  gap: 0.333em;
  display: grid;
  justify-items: center;
  justify-content: space-evenly;
  grid-template-columns: 1fr minmax(auto, 400px) 1fr;
  grid-template-rows: 1fr;
  padding-top: 1em;
`;

const MidLink = styled.div`
  grid-column: 2;
`;

const NavLinks = (props) => {
  const { text, ...link } = props.links[0];

  return (
    <Row>
      <MidLink>
        <Link {...link}>{text}</Link>
      </MidLink>
    </Row>
  );
};

export { NavLinks };
