import { setLabels } from "../../actions/setLabels";
import { queryBuilderWithLabels } from "../LabelBrowser/helpers/querybuilder";
import store from "../../store/store";
import loadLabelValues from "../../actions/loadLabelValues";
import loadLogs from "../../actions/loadLogs";
import { ZoomIn, ZoomOut } from "@mui/icons-material/";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";

const ValueTagsStyled = styled.div`
    color: ${(props) => props.theme.textPrimary};
    flex: 1;
    &:hover {
        background: ${(props) => props.theme.widgetContainer};
    }
`;

export default function ValueTags({ tags }) {
    const theme = useSelector((store) => store.theme);
    const isEmbed = useSelector((store) => store.isEmbed);
    const query = useSelector((store) => store.query);
    async function addLabel(e, key, value, isInverted = false) {
        e.preventDefault();
        e.stopPropagation();
        const { labels, apiUrl } = store.getState();
        const label = labels.find((label) => label.name === key);
        const symb = isInverted ? "!=" : "=";
        const isAlreadySelected = query.includes(`${key}="${value}"`);
        const isAlreadyInverted = query.includes(`${key}!="${value}"`);

        if (
            (isAlreadyInverted && isInverted) ||
            (isAlreadySelected && !isInverted)
        ) {
            return;
        }

        if (label) {
            const labelValue = label.values.find((tag) => tag.name === value);
            if (labelValue?.selected && labelValue.inverted === isInverted) {
                return;
            }
            if (labelValue) {
                labelValue.selected =
                    true || labelValue.inverted !== isInverted;
                labelValue.inverted = !labelValue.inverted && isInverted;
                label.selected = label.values.some((value) => value.selected);
                store.dispatch(setLabels(labels));
            } else {
                await store.dispatch(loadLabelValues(label, labels, apiUrl));
                const updatedLabels = store.getState().labels;
                const updatedLabel = updatedLabels.find(
                    (label) => label.name === key
                );
                const labelValue = updatedLabel.values.find(
                    (tag) => tag.name === value
                );
                labelValue.selected =
                    true || labelValue.inverted !== isInverted;
                labelValue.inverted = !labelValue.inverted && isInverted;
                updatedLabel.selected = updatedLabel.values.some(
                    (value) => value.selected
                );
                store.dispatch(setLabels(updatedLabels));
            }
            queryBuilderWithLabels();

            store.dispatch(loadLogs());
        } else {
            queryBuilderWithLabels(true, [`${key}${symb}"${value}"`]);
            store.dispatch(loadLogs());
        }
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
                                    onClick={(e) => addLabel(e, key, value)}
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
                                        addLabel(e, key, value, true)
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
