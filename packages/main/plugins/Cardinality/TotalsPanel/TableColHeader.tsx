export type TableColHeaderProps = {
    value: string;
    text: string;
    sortByProperty: (value: string) => void;
};
const TableColHeader = ({
    value,
    text,
    sortByProperty,
}: TableColHeaderProps) => {
    return (
        <div onClick={() => sortByProperty(value)} className="cell">
            {text}
        </div>
    );
};
export default TableColHeader;
