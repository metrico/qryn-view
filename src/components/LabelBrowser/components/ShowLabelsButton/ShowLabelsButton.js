import { ShowLabelsBtn } from "../styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { themes } from "../../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { setPanelsData } from "../../../../actions/setPanelsData";

export default function ShowLabelsButton(props) {
    const LOG_BROWSER = "Labels";
    const theme = useSelector((store) => store.theme);
    const labels = useSelector((store) => store.labels);
    const panels = useSelector(({ panels }) => panels);
    const dispatch = useDispatch()
     const [isBrowserOpen, setIsBrowserOpen] = useState(props.data.browserOpen);

    const query = useMemo(
        () => panels[props.name].queries.find(({ id }) => id === props.data.id),
        [props.data.id, props.name, panels]
    );

    const JSONClone = (arr) => {
        const arrToJSON = JSON.stringify(arr);
        const actArr = JSON.parse(arrToJSON);
        return actArr;
    };

    useEffect(() => {
        setIsBrowserOpen(query.browserOpen)
    },[setIsBrowserOpen, query.browserOpen])
   
    function handleBrowserOpen(){
        
        const panelName = props.name;
        const panel = panels[panelName]
        const actPanels = JSONClone(panels)
        let actQueries = JSONClone(panel.queries)

        for (let query of actQueries) {
            if (query.id === props.data.id) {
                query.browserOpen = isBrowserOpen ? false : true
            }
        }
        const finalPanel = {
            ...actPanels,
            [panelName]: {
                queries: [...actQueries]
            }
        }
        
        dispatch(setPanelsData(finalPanel))

    }
    return (
        <ThemeProvider theme={themes[theme]}>
            <ShowLabelsBtn
                title={
                    labels?.length > 0
                        ? "Show / Hide Labels"
                        : "Labels Not Available"
                }
                onClick={handleBrowserOpen}
                browserActive={isBrowserOpen}
                isMobile={props.isMobile}
            >
                {isBrowserOpen ? (
                    <KeyboardArrowDownIcon
                        style={{ height: "18px", width: "18px" }}
                    />
                ) : (
                    <KeyboardArrowRightIcon
                        style={{ height: "18px", width: "18px" }}
                    />
                )}{" "}
                {LOG_BROWSER}
            </ShowLabelsBtn>
        </ThemeProvider>
    );
}
