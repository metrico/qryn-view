import { queryBuilderWithLabels } from "../../LabelBrowser/helpers/querybuilder";

import { ZoomIn, ZoomOut } from "@mui/icons-material/";
import { useSelector, useDispatch } from "react-redux";
import { setSplitView } from "../../StatusBar/components/SplitViewButton/setSplitView";
import { themes } from "../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { setRightPanel } from "../../../actions/setRightPanel";
import getData from "../../../actions/getData";
import { useMediaQuery } from "react-responsive";

const ValueTagsStyled: any = styled.div`
    color: ${({ theme }: any) => theme.textPrimary};
    flex: 1;
    display: flex;
    &:hover {
        background: ${({ theme }: any) => theme.widgetContainer};
    }
`;
const TracesButton: any = styled.div`
    color: ${({ theme }: any) => theme.buttonText};
    flex: 0;
    background-color: hsl(220, 67%, 55%);
    display: flex;
    margin-left: 5px;
    padding: 0 4px;
    border-radius: 2px;
    font-size: 12px;
    align-items: center;
    white-space: nowrap;
`;
function alreadyExists(exp: any, op: any, k: any, v: any) {
    return exp.includes(`${k}${op}"${v}"`);
}

/**
 *
 * @param {Event} e // event
 * @param {String} key // label key
 * @param {String} value // label value
 * @param {Boolean} isExcluded // if it was excluded ('!=')
 * @param {Object} queryObj // actual query object
 * @returns
 */

export function ValueTagsCont(props: any) {
    const { showLabels, tags, actQuery } = props;

    if (showLabels) {
        return (
            <div className="value-tags-container">
                <ValueTags {...props} tags={tags} actQuery={actQuery} />
            </div>
        );
    }
    return null;
}

export async function addLabel(
    e: any,
    key: any,
    value: any,
    isExcluded = false,
    queryObj: any
) {
    e.preventDefault();

    e.stopPropagation();
    const { expr, panel, id, dataSourceType } = queryObj;

    const isAlreadyExcluded = alreadyExists(expr, "!=", key, value);

    const isAlreadySelected = alreadyExists(expr, "=", key, value);

    if (
        (isAlreadyExcluded && isExcluded) ||
        (isAlreadySelected && !isExcluded)
    ) {
        return;
    }

    queryBuilderWithLabels(
        expr,
        panel,
        id,
        [key, value],
        isExcluded,
        dataSourceType
    );
}

export class Panel {
    set(keys: any, values: any) {
        keys.forEach((key: any, i: any) => {
            (this as any)[key] = values[i];
        });
    }
    get() {
        return this;
    }
}

export default function ValueTags(props: any) {
    const { tags, actQuery, dataSourceData, linkedFieldTags } = props;
    //console.log(dataSourceData);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    //  const dataSources = useSelector((store: any) => store.dataSources);
    const theme = useSelector((store: any) => store.theme);
    const isEmbed = useSelector((store: any) => store.isEmbed);
    const dispatch = useDispatch();
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
        <ThemeProvider theme={(themes as any)[theme]}>
            {Object.entries(tags).map(([key, value], k) => (
                <ValueTagsStyled key={key}>
                    <div className={"value-tags"} key={k}>
                        {!isEmbed && (
                            <>
                                <span
                                    aria-label="Filter for value"
                                    title="Filter for value"
                                    onClick={(e) =>
                                        addLabel(e, key, value, false, actQuery)
                                    }
                                    className={"icon"}
                                >
                                    <ZoomIn
                                        color="primary"
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                        }}
                                    />
                                </span>
                                <span
                                    aria-label="Filter out value"
                                    title="Filter out value"
                                    onClick={(e) =>
                                        addLabel(e, key, value, true, actQuery)
                                    }
                                    className={"icon"}
                                >
                                    <ZoomOut
                                        color="primary"
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                        }}
                                    />
                                </span>
                            </>
                        )}

                        <span>{key}</span>
                        <span style={{ flex: 1 }}>
                            {value}
                            <LinkButton
                                {...props}
                                dataSourceData={dataSourceData}
                                linkedFieldTags={linkedFieldTags}
                                buttonKey={key}
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

export const LinkButton = (props: any) => {
    const { dataSourceData, linkedFieldTags, buttonKey, value, openTraces } =
        props;
    const dataSources = useSelector((store: any) => store.dataSources);

    if (dataSourceData?.linkedFields) {
        const { linkedFields } = dataSourceData;
        const fieldsFromParent = linkedFieldTags?.fields
            .map((m: any) => {
                if (m?.tagGroups) {
                    const tagEntries = Object.entries(m?.tagGroups);
                    const entriesMapped = tagEntries?.map(([key, val]) => ({
                        name: key,
                        value: val,
                    }));

                    return entriesMapped;
                }

                return [];
            })
            ?.flat();

        const fieldNames = fieldsFromParent?.map((m: any) => m.name);
        if (linkedFields?.length > 0) {
            const { dataSourceId, linkType, internalLink } = linkedFields[0];
            const currentDataSource = dataSources?.find(
                (f: any) => f.id === dataSourceId
            );
            const currentURL = currentDataSource?.url;

            if (
                fieldNames.includes(buttonKey) &&
                value &&
                internalLink === true
            ) {
                return (
                    <TracesButton
                        onClick={(e: any) => {
                            openTraces(
                                e,
                                buttonKey,
                                value,
                                dataSourceId,
                                currentURL,
                                linkType
                            );
                        }}
                    >
                        <OpenInNewIcon
                            style={{
                                width: "14px",
                                height: "14px",
                            }}
                        />
                        <span>{linkType}</span>
                    </TracesButton>
                );
            }
        }
    }

    return null;
};
