import styled from "@emotion/styled";
import { isSameRange } from "../utils";

import { useSelector } from 'react-redux';
import { themes } from "../../../../../theme/themes";
import { ThemeProvider } from '@emotion/react';

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
    button {
        background: none;
        text-align: left;
        border: none;
        padding: 10px;
        line-height: 1.5;
        border-radius: 3px;
        font-size: 0.85em;
        cursor: pointer;
        &:hover {
            background: ${props => props.theme.buttonHover};
        }
    }
`;

const Ranges = (props) => {
    const theme = useSelector((store) => store.theme);
    return (
        <ThemeProvider theme={themes[theme]}>
        <StyledList>
            {props.ranges.map((range, idx) => (
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
                                : themes[theme].textColor,
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
