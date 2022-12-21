import QueryTypeSwitch from "../QueryTypeBar/components/QueryTypeSwitch";
// use a query switch for switching between query type
const QUERY_TYPE_SELECTOR_OPTIONS = [
    { value: "traceId", label: "TraceId" },
    { value: "search", label: "Search" },
];

export function TraceQueryTypeSelector(props: any) {
    const { onQueryTypeSelectorChange, queryTypeSelectorSelected } = props;
    return (
        <QueryTypeSwitch
            label={"Direction"}
            options={QUERY_TYPE_SELECTOR_OPTIONS}
            onChange={onQueryTypeSelectorChange}
            defaultActive={queryTypeSelectorSelected}
        />
    );
}
