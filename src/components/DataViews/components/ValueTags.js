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
const ValueTagsStyled = styled.div`
    color: ${(props) => props.theme.textPrimary};
    flex: 1;
    display: flex;
    &:hover {
        background: ${(props) => props.theme.widgetContainer};
    }
`;
const TracesButton = styled.div`
    color: ${(props) => props.theme.buttonText};
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
function alreadyExists(exp, op, k, v) {
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

export function ValueTagsCont(props) {
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

export async function addLabel(e, key, value, isExcluded = false, queryObj) {
    e.preventDefault();

    e.stopPropagation();
    const { expr, panel, id } = queryObj;

    const isAlreadyExcluded = alreadyExists(expr, "!=", key, value);

    const isAlreadySelected = alreadyExists(expr, "=", key, value);

    if (
        (isAlreadyExcluded && isExcluded) ||
        (isAlreadySelected && !isExcluded)
    ) {
        return;
    }

    queryBuilderWithLabels(expr, panel, id, [key, value], isExcluded);
}

export class Panel {
    set(keys, values) {
        keys.forEach((key, i) => {
            this[key] = values[i];
        });
    }
    get() {
        return this;
    }
}

export default function ValueTags(props) {
    const { tags, actQuery, dataSourceData, linkedFieldTags } = props;
    const dataSources = useSelector((store) => store.dataSources);
    const theme = useSelector((store) => store.theme);
    const isEmbed = useSelector((store) => store.isEmbed);
    const dispatch = useDispatch();
    const rightPanel = useSelector((store) => store.right);

    const openTraces = (e, key, value, linkID, currentUrl, linkType) => {
        e.stopPropagation();
        if (props.actQuery.panel === "left") {
            dispatch(setSplitView(true));
        }

        let previousRight = JSON.parse(JSON.stringify(rightPanel));

        const panelCP = JSON.parse(JSON.stringify(props.actQuery));

        const newRight = {
            ...previousRight[0],
            id: previousRight[0].id,
            idRef: linkType + "=" + value,
            panel: "right",
            queryType: "range",
            dataSourceType: linkType.toLowerCase(),
            dataSourceId: linkID,
            currentUrl,
            expr: value,
            limit: 100,
            step: 100,
            tableView: false,
            isShowTs: false,
            browserOpen: false,
            labels: [],
            values: [],
            direction: "forward",
        };

        dispatch(setRightPanel([newRight]));

        dispatch(
            getData(
                linkType.toLowerCase(),
                value,
                "range",
                panelCP.limit || 100,
                "right",
                newRight.id,
                "forward",
                linkID, // datasourceid
                currentUrl
            )
        ); // url
    };

    function linkButton(key, value) {
        const { linkedFields } = dataSourceData;
        const fieldsFromParent = linkedFieldTags?.fields
            .map((m) => {
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

        const fieldNames = fieldsFromParent?.map((m) => m.name);

        const { linkID, linkType, internalLink } = linkedFields[0];
        const currentDataSource = dataSources?.find((f) => f.id === linkID);
        const currentURL = currentDataSource?.url;

        if (fieldNames.includes(key) && value && internalLink === true) {
            return (
                <TracesButton
                    onClick={(e) => {
                        openTraces(e, key, value, linkID, currentURL, linkType);
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

        return null;
    }
    return (
        <ThemeProvider theme={themes[theme]}>
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
                            {linkButton(key, value)}
                        </span>
                    </div>
                </ValueTagsStyled>
            ))}
        </ThemeProvider>
    );
}
