import { HashLink as Link } from "react-router-hash-link";
import styled from "styled-components";

export const UnstyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
