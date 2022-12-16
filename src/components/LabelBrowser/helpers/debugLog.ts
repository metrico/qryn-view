export default function debugLog(query: any) {
    const logicQueryBar = () => {
        console.log("🚧 LOGIC/QueryBar/", typeof query, query.length);
    };
    const queryBarDispatch = () => {
        console.log(
            "🚧 LOGIC/QueryBar/ dispatch ",
            query !== "{}",
            query.length > 0,
            query !== "{}" || query.length > 1
        );
    };
    return { logicQueryBar, queryBarDispatch };
}
