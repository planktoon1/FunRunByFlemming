import { Link } from "react-router-dom";
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
