type DiffNumberProps = {
    theme: any;
    diff: number;
};
// this component is used to display the diff number in the cardinality rows
export const DiffNumber = ({ theme, diff }: DiffNumberProps) => {
    return (
        <span
            className="c-diff"
            title={`diff from previous day: ${diff}`}
            style={{
                fontSize: "10px",
                padding: "5px",
                paddingBottom: "8px",
                color: diff > 0 ? theme.accent : theme.primary,
            }}
        >
            {diff === 0 ? "" : diff > 0 ? "↑" : "↓"}
            {diff === 0 ? "" : diff}{" "}
        </span>
    );
};
