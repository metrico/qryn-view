import { useMemo } from "react";
import { useMatchHeight } from "./hooks";
import { LabelsContainer, ChartLabel, ColorLabel } from "./styled";

export default function ChartLabelsList({ onLabelClick, labels }: any) {
    const labelsSelected = JSON.parse(localStorage.getItem("labelsSelected") || 'null');

    const isLabelsSelected = useMemo(()=> labelsSelected?.length > 0, [labelsSelected]);
    const matchHeight = useMatchHeight({ length: labels?.length || 0 });

    function setIsVisible(label: any) {
        return labelsSelected?.some((f: any) => f.id === label.id);
    }
    const handleLabelClick = (val: any) => {
        val.isVisible = val.isVisible ? false : true;
        onLabelClick(labels, val);
    };
    return (
        <LabelsContainer divHeight={matchHeight}>
            {labels?.length &&
                labels?.map((val: any, idx: any) => (
                    <ChartLabel
                        isVisible={!isLabelsSelected ? true : setIsVisible(val)}
                        key={idx}
                        onClick={() => handleLabelClick(val)}
                    >
                        <ColorLabel color={val.color} />
                        {val.label}
                    </ChartLabel>
                ))}
        </LabelsContainer>
    );
}
