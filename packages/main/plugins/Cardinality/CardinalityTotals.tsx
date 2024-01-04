import { useState } from "react";
import { MaintainanceItem } from "./api/types";
import { totalsMock } from "./api/mock";
import { css, cx } from "@emotion/css";
import { Tooltip } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

import {format} from 'date-fns'


export const TotalRowStyle = css`
    display: flex;
    flex: 1;
    flex-direction: column;

    .table {
        display: table;
        width: 100%;
    }
    .table-header {
        display:table-header-group;
        font-size:10px;
        text-transform:uppercase;
        .cell {
            font-size:10px;
            letter-spacing: 1px;
            
        }
    }
    .table-row {
        display: table-row-group;
        border-bottom: 1px solid gray;
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        
        &:hover {
            background: black;
        }
    }
    .cell {
        display: table-cell;
        font-size: 12px;
      //  margin: 10px;
        padding: 10px;
        max-width: 10%;
        
    }

    button {
        padding: 4px 12px;
        color:white;
        border:none;
        background: #01686a;
        border-radius: 3px;
        border-color: hsl(180, 62%, 33%);
        cursor: pointer;
        outline:none;
       
       
    }
    
`;

export type MaintainanceActions = {
    undoAction: (id: string, type: string, status: string) => void;
};

export function Total(props: MaintainanceItem & MaintainanceActions) {
    const {
        id,
        type,
        status,
        created_sec,
        from_sec,
        to_sec,
        series_dropped,
        series_created,
        logs,
        undoAction,
    } = props;
    // here we should cancel the action with a button

    return (
        <div className="table-row">
            <div className="cell">{status}</div>
            <div className="cell"> {type} </div>
            <div className="cell">{format(created_sec*1000,"dd-MM-yyyy hh:mm:ss")}</div>
            <div className="cell"> {format(from_sec*1000,"dd-MM-yyyy hh:mm:ss") } </div>
            <div className="cell"> {format(to_sec*1000,"dd-MM-yyyy hh:mm:ss")}</div>
            <div className="cell"> {series_dropped} </div>
            <div className="cell"> {series_created}</div>
            <div className="cell"> <code>{JSON.stringify(logs)}</code> </div>
            <div className="cell">
              <Tooltip title="undo action">
                <button onClick={() => undoAction(id, type, status)}>
                  <ReplayIcon style={{width:'14px', height:'14px'}}/>
                </button>                
                </Tooltip>
            </div>
        </div>
    );
}

export default function CardinalityTotals() {
    const [totals, setTotals] = useState(totalsMock);
    const onUndoAction = (id: string, type: string, status: string) => {
        console.log(id, type, status);
        setTotals(totalsMock);
    };

    return (
        <>
            {" "}
            <div className={cx(TotalRowStyle)}>
                <div className="table">
                <div className="table-header">
                    <div className="cell">Status</div>
                    <div className="cell">Type</div>
                    <div className="cell">Created sec</div>
                    <div className="cell">From sec</div>
                    <div className="cell">To sec</div>
                    <div className="cell">Series Dropped</div>
                    <div className="cell">Series Created</div>
                    <div className="cell">Logs</div>
                    <div className="cell">Undo</div>
                </div>
                <>
                    {totals?.length ? (
                        totals?.map((total,key) => (
                            <Total
                                undoAction={onUndoAction}
                                key={key}
                                {...total}
                            />
                        ))
                    ) : (
                        <> no totals </>
                    )}
                </>
                </div>
            </div>
        </>
    );
}
