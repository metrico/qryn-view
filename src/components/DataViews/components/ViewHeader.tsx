import { ThemeProvider } from "@emotion/react";
import { Tooltip } from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { ViewLabel } from "./ViewLabel";
import { themes } from "../../../theme/themes";
import { HeadLabelsCont, LabelChip, ViewHeaderStyled } from "../styled";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { InfoDialog } from "./InfoDialog";

export function ViewHeader(props: any) {
    const { fixedSize } = props || { fixedSize: false };
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(true);

    const theme = useSelector((store: any) => store.theme);
    const { actualQuery, dataView, type, total, setMinimize, setMaxHeight } =
        props;

    const headerType = useMemo(() => {
        const isMatrixTable = type === "matrix" && actualQuery?.tableView;
        const isStreamTable = type === "stream" && actualQuery?.tableView;
        if ((type === "matrix" || type === "flux") && !actualQuery?.tableView) {
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

    const handleViewOpen = useCallback(() => {
        if (viewOpen) {
            setMinimize();
            setViewOpen(false);
        } else {
            setMaxHeight();
            setViewOpen(true);
        }
    }, [viewOpen, setMinimize, setMaxHeight]);

    const handleInfoOpen = useCallback(() => {
        setOpen(true);
    }, []);

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
                        {dataView.labels.map((name: any, index: any) => (
                            <LabelChip key={index}>
                                <ViewLabel name={name} {...props.theme} />
                            </LabelChip>
                        ))}
                    </>
                );
            }
        }
    }, [dataView.labels, props.theme]);

    if (actualQuery) {
        const { idRef, expr, limit, queryType } = actualQuery;
        return (
            <ThemeProvider theme={(themes as any)[theme]}>
                <ViewHeaderStyled>
                    <div className="view-header-info">
                        <span>
                            <span className="exp">{headerType}</span>
                        </span>
                        <Tooltip title={actualQuery?.expr || ""}>
                            <span>
                                {" "}
                                <span className="exp">
                                    {actualQuery?.idRef}
                                </span>
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
                                    onClick={handleInfoOpen}
                                />

                                <ViewOpenButton
                                    isOpen={viewOpen}
                                    onClick={handleViewOpen}
                                />
                            </>
                        )}
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
                            onClose={(e: any) => setOpen(false)}
                        />
                    )}
                </ViewHeaderStyled>
            </ThemeProvider>
        );
    }

    return null;
}

export interface ViewOpenProps {
    isOpen: boolean;
    onClick: (e: any) => void;
}
export const ViewOpenButton = (props: ViewOpenProps) => {
    const { isOpen, onClick } = props;

    if (isOpen) {
        return (
            <KeyboardArrowDownIcon
                className="header-icon"
                onClick={onClick}
                style={{ fontSize: "14px" }}
            />
        );
    }

    return (
        <ChevronLeftIcon
            className="header-icon"
            onClick={onClick}
            style={{ fontSize: "14px" }}
        />
    );
};
