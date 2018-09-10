import styled from "styled-components";
import { css } from "styled-components";
import { Twitter } from "styled-icons/fa-brands";

const breakpoints = {
  desktop: 1040,
  tablet: 840,
  mobile: 540
};

const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 90vw;
  margin: auto;
  ${media.tablet`width: 50vw;`};
`;

export const Heading = styled.h1`
  text-align: center;
  padding-top: 2rem;
  color: #21a4d0;
`;

export const TextBlock = styled.p`
  font-size: 1.1rem;
  line-height: 2;
  padding-bottom: 2rem;
`;

export const ApiImg = styled.img`
  width: 80%;
  ${media.tablet`width: 40%;`};
`;

export const OrderedList = styled.ol`
  font-size: 1.1rem;
  line-height: 2;
`;

export const StrongText = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  padding-top: 1rem;
  color: #21a4d0;
`;

export const StackImg = styled.img`
  width: 100%;
  ${media.tablet`width: 90%; padding-left: 5%;`};
`;

export const FollowButton = styled.a`
  border: none;
  background-color: #21a4d0;
  width: auto;
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: Helvetica;
  font-size: 1rem;
  line-height: 1.5em;
  margin: 0 auto 3rem;
  display: table;
  text-decoration: none;
`;

export const TwitterIcon = styled(Twitter)`
  width: 16px;
  margin-top: 4px;
`;

export const CenterText = styled.p`
  text-align: center;
  font-weight: lighter;
  color: #6cb4cb;
`;
