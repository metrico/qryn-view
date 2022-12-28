import { ThemeProvider } from "@emotion/react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../store/store";
import { themes } from "../../theme/themes";
import { DataViewItem } from "./components/DataViewItem";
import { DataviewsContainer } from "./styled";

export default function DataViews(props: any) {
    const { name} = props;
    const theme = useSelector((store: any) => store.theme);
    const [side] = useState(name);
    const dataViews = useSelector((store: any) => store[`${side}DataView`]);
    const queries = useSelector((store: any) => store[side]);
    const viewsMemo = useMemo(()=>{
        return dataViews.sort((a: any, b: any) => {
            return queries.findIndex((query: any) => query.id === a.id) - queries.findIndex((query: any) => query.id === b.id)
        })
    },[dataViews, queries])
    if (viewsMemo.length > 0 ) {

        return (
            <ThemeProvider theme={(themes as any)[theme]}>
                <DataviewsContainer>
                    {viewsMemo?.map((dv: any, index: any) => (
                        <DataViewItem
                            key={index}
                            {...props}
                            dataView={dv}
                        />
                    ))}
                </DataviewsContainer>
            </ThemeProvider>
        );
    }

    return null;
}
