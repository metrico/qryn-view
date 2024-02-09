import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import FastRewindOutlinedIcon from "@mui/icons-material/FastRewindOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";

const TotalsPagination = ({
    page,
    totalPages,
    setPage,
    rowsPerPage,
    setRowsPerPage,
}) => {
    return (
        <div className="table-footer">
            <button
                className={page === 0 ? "disabled" : ""}
                onClick={() => setPage(() => 0)}
            >
                <FastRewindOutlinedIcon
                    style={{ height: "12px", width: "12px" }}
                />{" "}
                First
            </button>
            <button
                className={page === 0 ? "disabled" : ""}
                onClick={() => setPage(() => Math.max(0, page - 1))}
            >
                <SkipPreviousOutlinedIcon
                    style={{ height: "12px", width: "12px" }}
                />{" "}
                Prev
            </button>
            <p>
                Page {Math.round(page) + 1} of {Math.round(totalPages)}
            </p>
            <button
                className={page === totalPages - 1 ? "disabled" : ""}
                onClick={() =>
                    setPage(() => Math.min(totalPages - 1, page + 1))
                }
            >
                Next{" "}
                <SkipNextOutlinedIcon
                    style={{ height: "12px", width: "12px" }}
                />
            </button>
            <button
                className={page === totalPages - 1 ? "disabled" : ""}
                onClick={() => setPage(totalPages - 1)}
            >
                Last{" "}
                <FastForwardOutlinedIcon
                    style={{ height: "12px", width: "12px" }}
                />
            </button>
        </div>
    );
};

export default TotalsPagination;
