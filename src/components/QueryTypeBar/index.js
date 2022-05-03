import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueryType } from "../../actions";
import { themes } from "../../theme/themes";
import QueryLimit from "./components/QueryLimit";
import QueryResolution from "./components/QueryResolution";
import QueryTypeSwitch from "./components/QueryTypeSwitch";

/**
 * this bar will:
 * - select either range or instant as query type
 * - limit ( auto 100 )
 * - resolution : 1/1 1/2 1/3 1/4 1/5 1/10
 */

const QueryTypeCont = styled.div`
    display: flex;
    padding: 4px;
    background: ${(props) => props.theme.widgetContainer};
    color: ${(props) => props.color};
    height:26px;
`;

export default function QueryTypeBar() {
    const dispatch = useDispatch();

    // values from store

    const theme = useSelector((store) => store.theme);

    const queryType = useSelector((store) => store.queryType);

    const step = useSelector((store) => store.step);

    // local state values

    const [queryTypeSwitch, setQueryTypeSwitch] = useState(queryType);

    const [resolution, setResolution] = useState(step);

    // effects

    useEffect(() => {
        setQueryTypeSwitch(queryType);
    }, [queryType, setQueryTypeSwitch]);

    useEffect(() => {
        setResolution(step);
    }, [setResolution, step]);

    const SWITCH_OPTIONS = [
        { value: "range", label: "Range" },
        { value: "instant", label: "Instant" },
    ];
    const STEP_VALUES = [1, 2, 3, 4, 5, 10];

    function formatResolution(step) {
        return `1/${step}`;
    }

    function onSwitchChange(e) {
        dispatch(setQueryType(e));
    }

    const stepOptions = () =>
        STEP_VALUES.map((value) => ({ value, label: formatResolution(value) }));

    return (
        <ThemeProvider theme={themes[theme]}>
            <QueryTypeCont>
                <QueryTypeSwitch
                    options={SWITCH_OPTIONS}
                    onChange={onSwitchChange}
                    defaultActive={queryTypeSwitch}
                />
                <QueryLimit />
                <QueryResolution resolution={resolution} />
            </QueryTypeCont>
        </ThemeProvider>
    );

    ///query type

    /// limit

    /// resolution
}
