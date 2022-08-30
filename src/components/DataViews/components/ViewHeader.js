import { ThemeProvider } from "@emotion/react";
import { Tooltip } from "@mui/material";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { ViewLabel } from "./ViewLabel";
import { setLeftDataView } from "../../../actions/setLeftDataView";
import { setRightDataView } from "../../../actions/setRightDataView";
import { themes } from "../../../theme/themes";
import { HeadLabelsCont, LabelChip, ViewHeaderStyled } from "../styled";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import InfoIcon from "@mui/icons-material/Info";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { InfoDialog } from "./InfoDialog";


export function ViewHeader(props) {
    const { fixedSize } = props || { fixedSize: false };
    const dispatch = useDispatch();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const [open, setOpen] = useState(false);
    const theme = useSelector((store) => store.theme);
    const isEmbed = useSelector((store)=> store.isEmbed)
    const { actualQuery, dataView, name, type, total } = props;
    const DataViewList = useSelector((store) => store[`${name}DataView`]);
    const action = (name) => {
        if (name === "left") {
            return setLeftDataView;
        } else {
            return setRightDataView;
        }
    };

    const headerType = useMemo(() => {
        const isMatrixTable = type === "matrix" && actualQuery?.tableView;
        const isStreamTable = type === "stream" && actualQuery?.tableView;
        if (type === "matrix" && !actualQuery?.tableView) {
            return "Chart";
        }
        if (type === "stream" && !actualQuery?.tableView) {
            return "Logs";
        }
        if (type === "vector" || isMatrixTable || isStreamTable) {
            return "Table";
        }
        if (type === "empty") {
            return "No Results";
        }
    }, [type, actualQuery?.tableView]);

    function onClose() {
        const filtered = DataViewList.filter((f) => f.id !== dataView.id) || [];
        dispatch(action(name)([]));
        dispatch(action(name)(filtered));
        props.onClose();
    }
    function onMinimize() {
        props.onMinimize();
    }
    function onMaximize() {
        props.onMaximize();
    }

    const labelsLegend = useMemo(
        () => dataView?.labels?.join("  |  ") || "",
        [dataView.labels]
    );
    const labelsList = useMemo(() => {
        if (dataView?.labels?.length) {
            if (dataView?.labels.length > 4) {
                const cropped = [...dataView.labels].slice(0, 4);
                return (
                    <>
                        {cropped.map((name, index) => (
                            <LabelChip key={index}>
                                <ViewLabel name={name} {...props.theme} />
                            </LabelChip>
                        ))}{" "}
                        ...
                    </>
                );
            } else {
                return (
                    <>
                        {dataView.labels.map((name, index) => (
                            <LabelChip key={index}>
                                <ViewLabel name={name} {...props.theme} />
                            </LabelChip>
                        ))}
                    </>
                );
            }
        }
    }, [dataView.labels, props.theme]);

    const { idRef, expr, limit, queryType } = actualQuery;

    return (
        <ThemeProvider theme={themes[theme]}>
            <ViewHeaderStyled>
                <div className="view-header-info">
                    <span>
                        <span className="exp">{headerType}</span>
                    </span>
                    <Tooltip title={actualQuery?.expr || ""}>
                        <span>
                            {" "}
                            <span className="exp">{actualQuery?.idRef}</span>
                        </span>
                    </Tooltip>
                    {!isTabletOrMobile && (
                        <>
                            <span>
                                limit:{" "}
                                <span className="exp">
                                    {actualQuery?.limit}
                                </span>
                            </span>
                            <span>
                                count: <span className="exp">{total}</span>
                            </span>
                        </>
                    )}

                    {dataView?.labels?.length > 0 && !isTabletOrMobile && (
                        <span>
                            <HeadLabelsCont title={labelsLegend}>
                                labels:
                                {labelsList}
                            </HeadLabelsCont>
                        </span>
                    )}
                </div>

                <div className="header-actions">
                    {!fixedSize && (
                        <>
                            <InfoIcon
                                className="header-icon"
                                style={{ fontSize: "12px" }}
                                onClick={(e) => setOpen(true)}
                            />
                            <CropSquareIcon
                                className="header-icon"
                                onClick={onMaximize}
                                style={{ fontSize: "12px" }}
                            />
                            <MinimizeIcon
                                className="header-icon"
                                onClick={onMinimize}
                                style={{ fontSize: "12px" }}
                            />
                        </>
                    )}
                    {!isEmbed && 
                           <CloseIcon
                           className="header-icon"
                           onClick={onClose}
                           style={{ fontSize: "12px" }}
                       />
                    }
             
                </div>
                {open && (
                    <InfoDialog
                        labels={dataView.labels || []}
                        limit={limit}
                        expr={expr}
                        queryType={queryType}
                        idRef={idRef}
                        open={open}
                        total={total}
                        onClose={(e) => setOpen(false)}
                    />
                )}
            </ViewHeaderStyled>
        </ThemeProvider>
    );
}
