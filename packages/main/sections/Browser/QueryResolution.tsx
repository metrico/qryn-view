import { useState } from "react";
import { useDispatch } from "react-redux";
import { DEFAULT_RESOLUTION, RESOLUTION_OPTIONS } from "./consts";
import { setQueryResolution } from "./actions";
import { Label, ResSelect } from "./styles";

export default function QueryResolution() {
    const dispatch: any = useDispatch();
    const [resValue, setResValue]: any = useState(DEFAULT_RESOLUTION.value);

    function handleResChange(e: any): void {
        setResValue(parseInt(e.target.value));
        dispatch(setQueryResolution(parseInt(e.target.value)));
    }

    return (
        <>
            <Label>Resolution</Label>
            <ResSelect value={resValue.value} onChange={handleResChange}>
                {RESOLUTION_OPTIONS.map((res: any, idx: number) => (
                    <option key={idx} value={res.value}>
                        {res.label}
                    </option>
                ))}
            </ResSelect>
        </>
    );
}
