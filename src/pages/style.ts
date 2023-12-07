import { Controls } from "reactflow";
import styled from "styled-components";

export const ZoomControl = styled(Controls)`
  button {
    border-bottom: none;
    padding: 16px;
    &:hover {
      background-color: rgb(248 250 252 / var(--tw-bg-opacity));
    }
  }
`;
