import { createAlert } from "@ui/store/actions";
import store from "@ui/store/store";
import { useCallback, useEffect, useState } from "react";

// this is for test purposes
export async function getMaintenance() {
    return await fetch("http://localhost:8081/api/v1/maintenance");
}

export async function undoAction(id: string) {
    return await fetch(`http://localhost:8081/api/v1/undo/${id}`)
        .then((res) => {
            if (res.status === 200) {
                store.dispatch(
                    createAlert({
                        type: "success",
                        message: "Successfully restored fingerprints",
                    })
                );
                return res.json();
            } else {
                store.dispatch(
                    createAlert({
                        type: "error",
                        message: "Failed to restore fingerprints",
                    })
                );
                return {
                    error: "Failed to restore fingerprints",
                };
            }
        })
        .then((data) => {
            return data;
        });
}

export function useMaintenance() {
    const [maintenance, setMaintenance] = useState([]);

    const undoActionCB = useCallback(
        async (id: string) => {
            const undoData = await undoAction(id);

            if (!undoData.error) {
                setMaintenance(undoData);
            }
        },
        [maintenance]
    );

    useEffect(() => {
        getMaintenance()
            .then((res) => res.json())
            .then((data) => {
                setMaintenance(data);
            });
    }, []);

    return { maintenance, undoActionCB };
}
