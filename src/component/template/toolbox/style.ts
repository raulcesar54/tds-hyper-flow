import styled from "styled-components";

export const ToolboxContainer = styled.div`
  background: #fff;
  position: absolute;
  left: 0;
  height: 100%;
  width: 100px;
  padding: 36px 14px;
  align-items: center;
  display: flex;
  z-index: 1000;
  flex-direction: column;
  border-right: 1px solid #cecece;
`;
export const ToolboxButton = styled.button`
  border: none;
  background-color: #00000010;
  padding: 16px;
  border-radius: 8px;

  &:hover {
    background-color: #000000 !important;
  }
`;
