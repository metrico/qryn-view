import styled from "@emotion/styled";

const LabelsContainer = styled("div")`
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    max-height: calc(100% - 300px);
    overflow-y: auto;
    margin-top: 10px;
    padding-bottom: 10px;
    &::-webkit-scrollbar {
        width: 10px;
        background: black;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #444;
    }
`;

const ChartLabel = styled("div")`
    font-size: 12px;
    color: #aaa;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    line-height: 1.5;
    padding-right: 10px;
    cursor: pointer;
    opacity: ${(props) => (props.isVisible ? "1" : ".5")};
    border-radius: 3px;
    &:hover {
        background: black;
    }
`;

const ColorLabel = styled("div")`
    height: 4px;
    width: 16px;
    margin-right: 8px;
    background: ${(props) => props.color};
    content: " ";
`;

export const ChartLabelList = (props) => {
    const labelsSelected = JSON.parse(localStorage.getItem("labelsSelected"));

    const isLabelsSelected = labelsSelected?.length > 0;

    const matchHeight = (length) => {
        if (length <= 12) {
            return 150;
        } else if (length <= 20) {
            return 250;
        } else if (length <= 15) {
            return 175;
        } else if (length > 0) {
            return 450;
        }
    };

    function setIsVisible(label) {
        return labelsSelected?.some((f) => f.id === label.id);
    }
    const handleLabelClick = (val) => {
        val.isVisible = val.isVisible ? false : true;
        props.onLabelClick(props.labels, val);
    };
    return (
        <LabelsContainer divHeight={matchHeight(props?.labels?.length)}>
            {props?.labels?.length &&
                props.labels.map((val, idx) => (
                    <ChartLabel
                        isVisible={!isLabelsSelected ? true : setIsVisible(val)}
                        key={idx}
                        onClick={(e) => handleLabelClick(val)}
                    >
                        <ColorLabel color={val.color} />
                        {val.label}
                        {/* <SearchButton /> */}
                    </ChartLabel>
                ))}
        </LabelsContainer>
    );
};
