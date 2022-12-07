import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

export const DataViewStyled = styled.div`
  background: ${({ theme }) => theme.mainBgColor};
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  margin: 5px;
  padding: 6px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  flex: 1;
  border-radius: 3px;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme }) => theme.scrollbarThumb};
  }
`;

export const EmptyViewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  font-size: 0.75em;
  letter-spacing: 1px;
  padding: 30px;
  color: ${({ theme }) => theme.textOff};
  background: ${({ theme }) => theme.secondaryWidgetContainer};
  text-align: center;
`;

export const DataViewHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-family: monospace;
  margin: 0px 10px;
  color: ${({ theme }) => theme.textColor};
  span {
    background: ${({ theme }) => theme.inputBg};
    padding: 4px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.buttonBorder};
    margin: 0px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const DataViewCont = styled.div`
  display: flex;
  min-height: min-content;
  flex-direction: column;
  height: 100%;
`;

export const Loader = styled(CircularProgress)`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  margin: auto;
`;

export const DataviewsContainer = styled.div`
  overflow-y: auto;
  margin: 2px;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 100vh;
  &::-webkit-scrollbar {
    background: transparent;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

export const ViewHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  font-size: 12px;
  .header-actions {
    justify-self: flex-end;
    .header-icon {
      padding: 1px 2px;
      margin: 0px 2px;
      border-radius: 3px;
      cursor: pointer;
      color: ${({ theme }) => theme.textColor};
      &:hover {
        background: ${({ theme }) => theme.buttonDefault};
      }
    }
  }
  .view-header-info {
    display: flex;
    flex: 1;
    align-items: center;
    span {
      margin: 0px 3px;
      .exp {
        font-family: monospace;
        font-weight: bold;
      }
    }
  }
`;

export const LabelChip = styled.div`
  margin: 0px 2px;
  padding: 2px;
  font-size: 10px;
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  border-radius: 3px;
`;

export const HeadLabelsCont = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 12px;
  flex: 1;
  max-width: 450px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme }) => theme.scrollbarThumb};
  }
`;

export const StyledInfoContent = styled.div`
  background: ${({ theme }) => theme.widgetContainer};
  color: ${({ theme }) => theme.textColor};
  display: flex;
  flex-direction: column;
  padding: 20px;
  div {
    width: 100%;
    overflow-wrap: break-word;
    font-family: monospace;
  }
  p {
    padding: 10px;
    font-size: 12px;
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    span.label {
      background: ${({ theme }) => theme.buttonBorder};
      color: ${({ theme }) => theme.widgetContainer};
      margin: 2px;
      padding: 2px;
      border-radius: 2px;
    }
  }
  h4 {
    margin-bottom: 20px;
    padding-bottom: 4px;
    border-bottom: 1px solid ${({ theme }) => theme.buttonBorder};
  }
  pre {
    font-family: monospace;
  }
  small {
    font-size: 10px;
  }
`;
