import styled from "@emotion/styled";
import { isSameRange } from "../utils";
import { ThemeProvider } from '@emotion/react';
import useTheme from "@ui/theme/useTheme"

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    max-height: 250px;
    overflow-y: auto;
    flex: 1;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    &::-webkit-scrollbar {
        width: 5px;
        background: ${(props:any) => props.theme.lightNeutral};
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
      }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${(props:any) => props.theme.neutral};
    }
    button {
        background: none;
        text-align: left;
        border: none;
        padding: 10px;
        line-height: 1.5;
        border-radius: 3px;
        font-size: 12px;
        cursor: pointer;
        &:hover {
            background: ${(props:any) => props.theme.lightNeutral};
        }
    }
`;

const Ranges = (props:any) => {
    const theme = useTheme()
    
    return (
        <ThemeProvider theme={theme}>
        <StyledList>
            {props.ranges.map((range:any, idx:any) => (
                <button
                    key={idx}
                    onClick={() => {
                        props.setRange(range);
                        props.onClose();
                    }}
                >
                    <span
                        style={{
                            fontWeight: isSameRange(range, props.selectedRange)
                                ? "bold"
                                : "normal",
                            color: isSameRange(range, props.selectedRange)
                                ? "orange"
                                : theme.contrast,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {range.label}
                    </span>
                </button>
            ))}
        </StyledList>
        </ThemeProvider>
    );
};

export default Ranges;
