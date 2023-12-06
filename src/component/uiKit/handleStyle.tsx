import { Handle } from "reactflow";
import styled, { css } from "styled-components";

interface HandleProps {
  isVectorItems?: boolean;
}
export const HandleStyled = styled(Handle)<HandleProps>`
  padding: 4px;
  border-radius: 0px;
  height: 10px;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 100px;
  ${({ isVectorItems }) =>
    isVectorItems &&
    css`
      top: -20px;
      right: -23px;
    `}
`;
