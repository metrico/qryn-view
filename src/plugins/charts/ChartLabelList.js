import { LabelsContainer, ChartLabel, ColorLabel } from "./styled";

export default function ChartLabelsList({ onLabelClick, labels }) {
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
        onLabelClick(labels, val);
    };
    return (
        <LabelsContainer divHeight={matchHeight(labels?.length)}>
            {labels?.length &&
                labels?.map((val, idx) => (
                    <ChartLabel
                        isVisible={!isLabelsSelected ? true : setIsVisible(val)}
                        key={idx}
                        onClick={(e) => handleLabelClick(val)}
                    >
                        <ColorLabel color={val.color} />
                        {val.label}
                    </ChartLabel>
                ))}
        </LabelsContainer>
    );
}
