import styled, { css } from "styled-components";

const Heading = styled.h1`
  font-size: "20px";
  font-weight: 600;
  /* background-color: yellow; */
  ${(props) =>
    props.as == "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as == "h2" &&
    css`
      font-size: 4rem;
      font-weight: 700;
    `}
	${(props) =>
    props.as == "h3" &&
    css`
      font-size: 5rem;
      font-weight: 800;
    `}
`;

export default Heading;
