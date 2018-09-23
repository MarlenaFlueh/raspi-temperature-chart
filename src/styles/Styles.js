import styled from "styled-components";
import { css } from "styled-components";
import { Twitter } from "styled-icons/fa-brands";
import { ChatBubbleOutline } from "styled-icons/material";
import { User } from "styled-icons/fa-regular";
import { Send } from "styled-icons/feather";

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

export const BubbleIcon = styled(ChatBubbleOutline)`
  width: 20px;
`;

export const UserIcon = styled(User)`
  width: 20px;
  color: rgb(
    ${props => props.inputColor.split(",")[0]},
    ${props => props.inputColor.split(",")[1]},
    ${props => props.inputColor.split(",")[2]}
  );
`;

export const Link = styled.a`
  color: #6cb4cb;
  text-decoration: none;
`;

export const CenterText = styled.p`
  text-align: center;
  font-weight: lighter;
  color: #6cb4cb;
`;

export const Comment = styled.div`
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  width: 85%;
`;

export const UserBox = styled.div`
  display: inline-block;
  width: 10%;
`;

export const FloatDiv = styled.div`
  display: block;
  color: #6cb4cb;
  padding-bottom: 0.5rem;
`;

export const CommentCounter = styled.p`
  text-align: center;
  padding: 30px;
  color: #6cb4cb;
  border-bottom: 1px solid #6cb4cb;
`;

export const FormContainer = styled.div`
  border-top: 1px solid #6cb4cb;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const Textarea = styled.textarea`
  width: 85%;
  line-height: 2;
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
`;

export const SendIcon = styled(Send)`
  width: 25px;
  &:hover {
    cursor: pointer;
  }
`;
