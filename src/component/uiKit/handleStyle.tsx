import { Handle } from "reactflow";
import styled, { css } from "styled-components";

interface HandleProps {
  isVectorItems?: boolean;
}
export const HandleStyled = styled(Handle)<HandleProps>`
  padding: 4px;
  border-radius: 0px;
  height: -20px;
  border: 2px solid black;
  border-radius: 100px;
  background-color: #fff;
  ${({ isVectorItems }) =>
    isVectorItems &&
    css`
      top: -22px;
      right: -22px;
    `}
`;
