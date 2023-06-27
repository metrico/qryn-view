import { ShowSeries } from "./styled";

interface HandleLimitButtonProps {
    isSpliced: boolean;
    handleNoLimitData: (e: any) => void;
    handleLimitData: (e: any) => void;
    matrixData: any;
}
export default function HandleLimitButton({
    isSpliced,
    handleNoLimitData,
    handleLimitData,
    matrixData,
}: HandleLimitButtonProps) {
    return isSpliced ? (
        <ShowSeries onClick={handleNoLimitData}>
            {matrixData.length > 20
                ? "Showing: 20 Series, Show All "
                : "Showing: "}
            {matrixData.length}
            {" Series"}
        </ShowSeries>
    ) : (
        <ShowSeries onClick={handleLimitData}>
            {"Showing: "}
            {matrixData.length}
            {" Series, Show Only 20 Series"}
        </ShowSeries>
    );
}
