import FindReplaceIcon from "@mui/icons-material/FindReplace";
import styled from "@emotion/styled";




const LabelsContainer = styled("div")`
    display: flex;
    flex-wrap: wrap;
    height: ${props => props.divHeight}px;
    overflow-y: auto;
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
    color: #ddd;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    margin: 2px;
    padding: 4px;
    cursor: pointer;
    opacity: ${(props) => (!props.isVisible ? "1" : ".75")};
    border-radius: 3px;
    height:20px !important;
    &:hover {
        background: black;
    }
`;

const SearchButton = styled(FindReplaceIcon)`
    color: orange;
    font-size: 16px;
    background: #222;
    padding: 2px;
    border-radius: 2px;
    margin-left: 2px;
    opacity: 0.5;
    &:hover {
        opacity: 1;
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

    const matchHeight = (length) => {
        if(length <= 12) {
            return 150
        } else if (length <= 20) {
            return 250
        } else if(length <=15) {
            return 175
        }else if( length > 0) {
            return 450
        }
  
    }

    const handleLabelClick = (val) => {
        val.isVisible = !val.isVisible;
        props.onLabelClick(props.labels, val);
    };
    return (
        <LabelsContainer
        divHeight={matchHeight(props.labels.length)}
        >
            {props.labels.length &&
                props.labels.map((val, idx) => (
                    <ChartLabel
                        isVisible={val.isVisible}
                        key={idx}
                        onClick={(e) => handleLabelClick(val)}
                    >
                        <ColorLabel color={val.color} />
                        {val.label}
                        <SearchButton />
                    </ChartLabel>
                ))}
        </LabelsContainer>
    );
};
