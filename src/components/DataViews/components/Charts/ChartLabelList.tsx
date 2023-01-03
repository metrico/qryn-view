import { useMemo } from "react";
import { useLabelList } from "./hooks";
import { LabelsContainer, ChartLabel, ColorLabel } from "./styled";

export default function ChartLabelsList({
    onLabelClick,
    labels,
}: {
    onLabelClick: any;
    labels: any;
}) {
    const labelsSelected = useLabelList();

    const isLabelsSelected = useMemo(
        () => labelsSelected?.length > 0,
        [labelsSelected]
    );

    function setIsVisible({ id }: { id: string }) {
        return labelsSelected?.some((f: any) => f.id === id);
    }
    const handleLabelClick = (val: any) => {
        val.isVisible = val.isVisible ? false : true;
        onLabelClick(labels, val);
    };

    return (
        <LabelsContainer>
            {labels?.length &&
                labels?.map((val: any, idx: any) => (
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
