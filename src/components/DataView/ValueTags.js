import { queryBuilderWithLabels } from "../LabelBrowser/helpers/querybuilder";

import { ZoomIn, ZoomOut } from "@mui/icons-material/";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";

const ValueTagsStyled = styled.div`
    color: ${(props) => props.theme.textPrimary};
    flex: 1;
    z-index: 10000;
    display: flex;
    &:hover {
        background: ${(props) => props.theme.widgetContainer};
    }
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

    // add labels should add the labels to expresion and update labels on selectors

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
                        <span style={{ flex: 4 }}>{value}</span>
                    </div>
                </ValueTagsStyled>
            ))}
        </ThemeProvider>
    );
}
