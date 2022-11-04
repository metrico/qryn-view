import { queryBuilderWithLabels } from "../../LabelBrowser/helpers/querybuilder";

import { ZoomIn, ZoomOut } from "@mui/icons-material/";
import { useSelector, useDispatch } from "react-redux";
import { setSplitView } from "../../StatusBar/components/SplitViewButton/setSplitView";
import { themes } from "../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { setRightPanel } from "../../../actions/setRightPanel";
const ValueTagsStyled = styled.div`
    color: ${(props) => props.theme.textPrimary};
    flex: 1;
    display: flex;
    &:hover {
        background: ${(props) => props.theme.widgetContainer};
    }
`;
const TracesButton = styled.div`
    color: ${(props) => props.theme.textPrimary};
    flex: 0;
    background-color: hsl(220, 67%, 55%);
    display: flex;
    margin-left: 5px;
    padding: 0 7px;
    border-radius: 2px;
    font-size: 12px;
    align-items: center;
`
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

 export function ValueTagsCont({ actQuery, tags, showLabels }) {
    if (showLabels) {
        return (
            <div className="value-tags-container">
                <ValueTags tags={tags} actQuery={actQuery} />
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


export default function ValueTags(props) {
    const { tags, actQuery } = props;

    const theme = useSelector((store) => store.theme);
    const isEmbed = useSelector((store) => store.isEmbed);
    const dispatch = useDispatch();

    // add labels should add the labels to expresion and update labels on selectors
    const openTraces = (e, key, value) => {
        e.stopPropagation();
        if (props.actQuery.panel === 'left') {
            dispatch(setSplitView(true));
        }
        const panelCP = JSON.parse(JSON.stringify(props.actQuery));
        panelCP.dataSourceType = 'traces';
        console.log(props.name, panelCP)
        dispatch(setRightPanel([panelCP]));
        console.log(props)
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

                        <span style={{ flex: 1 }}>{key}</span>
                        <span style={{ flex: 4 }}>{value}
                        {key === 'traceID' && (
                            <TracesButton
                                onClick={(e)=>{openTraces(e, key, value)}}
                            > 
                                <OpenInNewIcon                                         
                                    style={{
                                    width: "14px",
                                    height: "14px"
                                    }}
                                />
                                <span>
                                    TRACES
                                </span>
                            </TracesButton>
                        )}
                        </span>
                        
                    </div>
                </ValueTagsStyled>
            ))}
        </ThemeProvider>
    );
}
