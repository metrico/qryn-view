import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueryType } from "../../actions";
import { themes } from "../../theme/themes";
import QueryLimit from "./components/QueryLimit";
import QueryTypeSwitch from "./components/QueryTypeSwitch";

const QueryTypeCont = styled.div`
    display: flex;
    padding: 4px;
    background: ${(props) => props.theme.widgetContainer};
    color: ${(props) => props.color};
    height: 26px;
`;

export default function QueryTypeBar() {
    const dispatch = useDispatch();
    const theme = useSelector((store) => store.theme);
    const queryType = useSelector((store) => store.queryType);
    const [queryTypeSwitch, setQueryTypeSwitch] = useState(queryType);

    useEffect(() => {
        setQueryTypeSwitch(queryType);
    }, [queryType, setQueryTypeSwitch]);

    const SWITCH_OPTIONS = [
        { value: "range", label: "Range" },
        { value: "instant", label: "Instant" },
    ];

    function onSwitchChange(e) {
        dispatch(setQueryType(e));
    }

    return (
        <ThemeProvider theme={themes[theme]}>
            <QueryTypeCont>
                <QueryTypeSwitch
                    options={SWITCH_OPTIONS}
                    onChange={onSwitchChange}
                    defaultActive={queryTypeSwitch}
                />
                <QueryLimit />
            </QueryTypeCont>
        </ThemeProvider>
    );
}
