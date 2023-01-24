import styled from "@emotion/styled";

export const MenuButton = styled.button`
  border: none;
  background: ${(props:any)=>(props.theme.buttonDefault)};
  border:1px solid ${(props:any)=>props.theme.buttonBorder};
  color: ${(props:any)=>(props.theme.textColor)};
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
