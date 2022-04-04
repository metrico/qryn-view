import styled from "@emotion/styled";
import { isSameRange } from "../utils";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    button {
        background: none;
        text-align: left;
        border: none;
        padding: 10px;
        line-height: 1.5;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
            background: #11111155;
        }
    }
`;

const Ranges = (props) => {
    return (
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
                                : "white",
                        }}
                    >
                        {range.label}
                    </span>
                </button>
            ))}
        </StyledList>
    );
};

export default Ranges;
