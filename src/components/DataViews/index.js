import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { DataViewItem } from "./components/DataViewItem";
import { DataviewsContainer } from "./styled";

export default function DataViews(props) {
    const { name } = props;

    const theme = useSelector((store) => store.theme);
    const [side] = useState(name);
    const dataViews = useSelector((store) => store[`${side}DataView`]);
    if (dataViews.length > 0) {
        return (
            <ThemeProvider theme={themes[theme]}>
                <DataviewsContainer>
                    {dataViews?.map((dv, index) => (
                        <DataViewItem key={index} {...props} dataView={dv} />
                    ))}
                </DataviewsContainer>
            </ThemeProvider>
        );
    }

    return null;
}
