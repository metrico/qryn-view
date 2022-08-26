import { useMemo } from "react";
import { useMatchHeight } from "./hooks";
import { LabelsContainer, ChartLabel, ColorLabel } from "./styled";

export default function ChartLabelsList({ onLabelClick, labels }) {
    const labelsSelected = JSON.parse(localStorage.getItem("labelsSelected"));

    const isLabelsSelected = useMemo(()=>labelsSelected?.length > 0,[labelsSelected]);

    const matchHeight = useMatchHeight({ length: labels?.length || 0 });

    function setIsVisible(label) {
        return labelsSelected?.some((f) => f.id === label.id);
    }
    const handleLabelClick = (val) => {
        val.isVisible = val.isVisible ? false : true;
        onLabelClick(labels, val);
    };
    return (
        <LabelsContainer divHeight={matchHeight}>
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
