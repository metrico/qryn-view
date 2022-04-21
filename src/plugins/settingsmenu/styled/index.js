import styled from "@emotion/styled";
import darkTheme from "../../../theme/dark";
const theme = darkTheme;

export const MenuButton = styled.button`
  border: none;
  background: ${theme.buttonDefault};
  color: ${theme.buttonText};
  padding: 3px 12px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  line-height: 20px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 26px;
`;
