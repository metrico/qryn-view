import { ThemeProvider } from "@emotion/react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PluginRenderer from "../../plugins/PluginsRenderer";
import { DataViewItem } from "./components/DataViewItem";
import { useTheme } from "./components/QueryBuilder/hooks";
import { DataviewsContainer } from "./styled";

export default function DataViews(props: any) {
    const { name, open } = props;
    const theme = useTheme();

    const [side] = useState(name);
    const dataViews = useSelector((store: any) => store[`${side}DataView`]);
    const queries = useSelector((store: any) => store[side]);
    const viewsMemo = useMemo(() => {
        return dataViews.sort((a: any, b: any) => {
            return (
                queries.findIndex((query: any) => query.id === a.id) -
                queries.findIndex((query: any) => query.id === b.id)
            );
        });
    }, [dataViews, queries]);
    if (viewsMemo.length > 0) {
        return (
            <ThemeProvider theme={theme}>
                <DataviewsContainer>
                    <PluginRenderer section={"Data Views"} localProps={props} />
                    {viewsMemo?.map((dv: any, index: any) => (
                        <DataViewItem
                            key={index}
                            {...props}
                            splitted={open}
                            dataView={dv}
                        />
                    ))}
                </DataviewsContainer>
            </ThemeProvider>
        );
    }

    return null;
}
