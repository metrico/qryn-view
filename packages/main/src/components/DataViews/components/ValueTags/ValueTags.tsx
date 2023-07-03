import { useSelector, useDispatch } from "react-redux";
import { setSplitView } from "../../../StatusBar/components/SplitViewButton/setSplitView";
import { ThemeProvider } from "@emotion/react";
import { setRightPanel } from "@ui/store/actions/setRightPanel";
import getData from "@ui/store/actions/getData";
import { useMediaQuery } from "react-responsive";
import { LinkButtonWithTraces } from "./LinkButtonWithTraces";
import { ValueTagsStyled } from "./styled";
import { FilterButtons } from "./FilterButtons";
import  useTheme  from "@ui/theme/useTheme";

/**
 *
 * @param {Event} e // event
 * @param {String} key // label key
 * @param {String} value // label value
 * @param {Boolean} isExcluded // if it was excluded ('!=')
 * @param {Object} queryObj // actual query object
 * @returns Component for the Tags for the Log rows
 */


export default function ValueTags(props: any) {
    const { tags, actQuery, dataSourceData, linkedFieldTags } = props;
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1013px)" });
    //  const dataSources = useSelector((store: any) => store.dataSources);
    const theme = useTheme();
    const isEmbed = useSelector((store: any) => store.isEmbed);
    const dispatch: any = useDispatch();
    const rightPanel = useSelector((store: any) => store.right);

    const openTraces = (
        e: any,
        key: any,
        value: any,
        linkID: any,
        currentUrl: any,
        linkType: any
    ) => {
        // debugger;
        e.stopPropagation();
        if (props?.actQuery?.panel === "left" && !isTabletOrMobile) {
            dispatch(setSplitView(true));
        }

        let previousRight = JSON.parse(JSON.stringify(rightPanel));
        const panelCP = JSON.parse(JSON.stringify(props.actQuery));
        // debugger;
        try {
            const newRight = {
                ...previousRight[0],
                id: previousRight[0].id,
                idRef: linkType + "=" + value,
                panel: "right",
                queryType: "range",
                dataSourceType: linkType.toLowerCase() || "traces",
                dataSourceId: linkID || "32D16h5uYBqUUzhD",
                dataSourceURL: currentUrl,
                expr: value,
                limit: 100,
                step: 100,
                tableView: false,
                chartView: false,
                isShowTs: false,
                browserOpen: false,
                labels: [],
                values: [],
                direction: "forward",
                loading: false,
                open: true,
            };
            // debugger;
            dispatch(
                getData(
                    linkType.toLowerCase() || "traces",
                    value,
                    "range",
                    panelCP.limit || 100,
                    "right",
                    newRight.id,
                    "forward",
                    linkID || "32D16h5uYBqUUzhD", // datasourceid
                    currentUrl
                )
            );
            dispatch(setRightPanel([newRight]));
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <ThemeProvider theme={theme}>
            {Object.entries(tags).map(([label, value]:[string,string], k) => (
                <ValueTagsStyled key={k}>
                    <div className={"value-tags"} key={k}>
                        {!isEmbed && (
                            <FilterButtons
                                label={label}
                                value={value}
                                actQuery={actQuery}
                            />
                        )}

                        <span>{label}</span>
                        <span style={{ flex: 1 }}>
                            {value}
                            <LinkButtonWithTraces
                                {...props}
                                dataSourceData={dataSourceData}
                                linkedFieldTags={linkedFieldTags}
                                buttonKey={label}
                                value={value}
                                openTraces={openTraces}
                            />
                        </span>
                    </div>
                </ValueTagsStyled>
            ))}
        </ThemeProvider>
    );
}
