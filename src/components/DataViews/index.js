import { ThemeProvider } from "@emotion/react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../store/store";
import { themes } from "../../theme/themes";
import { DataViewItem } from "./components/DataViewItem";
import { DataviewsContainer } from "./styled";

export default function DataViews(props) {
    const { name} = props;
    const theme = useSelector((store) => store.theme);
    const [side] = useState(name);
    const dataViews = useSelector((store) => store[`${side}DataView`]);
    const queries = useSelector((store) => store[side]);
    const viewsMemo = useMemo(()=>{
        return dataViews.sort((a,b) => {
            return queries.findIndex((query) => query.id === a.id) - queries.findIndex((query) => query.id === b.id)
        })
    },[dataViews, queries])
    if (viewsMemo.length > 0 ) {

        return (
            <ThemeProvider theme={themes[theme]}>
                <DataviewsContainer>
                    {viewsMemo?.map((dv, index) => (
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
