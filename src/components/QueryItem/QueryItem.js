import LabelBrowser from "../LabelBrowser";
import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import { useSelector, useDispatch } from "react-redux";
import { setPanelsData } from "../../actions/setPanelsData";
import { nanoid } from "nanoid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
const QueryContainer = styled.div``;

const QueryItemToolbarStyled = styled.div`
    background: ${({ theme }) => `${theme.secondaryWidgetContainer}`};
    color: ${({ theme }) => `${theme.textColor}`};
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
    margin-bottom: 3px;
    .query-title {
        display: flex;
        align-items: center;
    }
    .query-tools {
        display: flex;
        align-items: center;
    }
    .query-id {
        font-size: 13px;
        font-weight: bold;
        margin-left: 5px;
    }
`;

const ShowQueryButton = styled.button`
    background: none;
    border: none;
    padding: 0px 2px;
    cursor: pointer;
`;

const OpenQuery = styled(KeyboardArrowDownOutlinedIcon)`

    font-size: 13px;
    color: ${({ theme }) => theme.textColor};
`;

const CloseQuery = styled(KeyboardArrowRightOutlinedIcon)`

    font-size: 13px;
    color: ${({ theme }) => theme.textColor};
`;

export const QueryItemToolbar = (props) => (
    <QueryItemToolbarStyled>
        <div className="query-title">
            <ShowQueryButton
                onClick={() => {
                    props.isQueryOpen[1](props.isQueryOpen[0] ? false : true);
                }}
            >
                {props.isQueryOpen[0] ? <OpenQuery /> : <CloseQuery />}
            </ShowQueryButton>
            <p className="query-id">{props.data.idRef}</p>
        </div>

        <div className="query-tools">
            <AddOutlinedIcon
                style={{ fontSize: "15px", cursor: "pointer", padding: "3px" }}
                onClick={props.onAddQuery}
            />
            <DeleteOutlineIcon
                style={{ fontSize: "15px", cursor: "pointer", padding: "3px" }}
                onClick={props.onDeleteQuery}
            />
        </div>
    </QueryItemToolbarStyled>
);

export default function QueryItem(props) {
    const idRefs = useMemo(() => {
        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));
        return alphabet;
    }, []);

    const dispatch = useDispatch();
    const theme = useSelector((store) => store.theme);
    const panels = useSelector((store) => store.panels);
    const isQueryOpen = useState(true);

    const onDeleteQuery = () => {
        const filtered =
            panels[props.name].queries.length > 1
                ? panels[props.name].queries.filter(
                      (query) => query.id !== props.data.id
                  )
                : panels[props.name].queries;
        dispatch(
            setPanelsData({
                ...panels,
                [props.name]: {
                    ...panels[props.name],
                    queries: filtered,
                },
            })
        );
    };

    const onAddQuery = () => {
        const queries = panels[props.name].queries;
        const lastIdx = queries[queries.length - 1].lastIdx;

        const idRef =
            lastIdx > idRefs.length - 1
                ? `${idRefs[0]}${lastIdx}`
                : idRefs[lastIdx];

        dispatch(
            setPanelsData({
                ...panels,
                [props.name]: {
                    ...panels[props.name],
                    queries: [
                        ...panels[props.name].queries,
                        {
                            ...props.data,
                            id: nanoid(),
                            idRef,
                            lastIdx: lastIdx + 1,
                            cp: 0,
                        },
                    ],
                },
            })
        );
    };

    return (
        <ThemeProvider theme={themes[theme]}>
            <QueryContainer>
                <QueryItemToolbar
                    isQueryOpen={isQueryOpen}
                    onDeleteQuery={onDeleteQuery}
                    onAddQuery={onAddQuery}
                    {...props}
                />
                {isQueryOpen[0] && <LabelBrowser {...props} />}
            </QueryContainer>
        </ThemeProvider>
    );
}
