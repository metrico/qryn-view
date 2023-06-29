import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import { panelAction } from "./helpers";
import { QLInputGroup, QLLabel, Input } from "./styles";

export default function QueryLimit(props: any) {
    const dispatch: any = useDispatch();
    const { id }: any = props.data;
    const { name }: any = props;
    const panelQuery = useSelector((store: any) => store[name]);
    const [editedValue, setEditedValue] = useState(props.data.limit);
    const limitFromProps = useMemo(() => props.data.limit, [props.data.limit]);

    useEffect(() => {
        setEditedValue(limitFromProps);
    }, [limitFromProps, setEditedValue]);

    function onLimitChange(e: any) {
        let limitTxt = e.target.value;
        if (limitTxt > 20000) {
            limitTxt = 20000;
        }
        const panel = [...panelQuery];

        panel.forEach((query) => {
            if (query.id === id) {
                query.limit = limitTxt;
            }
        });

        dispatch(panelAction(name, panel));
    }

    return (
        <QLInputGroup>
            <QLLabel>Query Limit</QLLabel>
            <Tooltip title="max 20000">
                <Input
                    type={"number"}
                    value={editedValue}
                    onChange={onLimitChange}
                />
            </Tooltip>
        </QLInputGroup>
    );
}
