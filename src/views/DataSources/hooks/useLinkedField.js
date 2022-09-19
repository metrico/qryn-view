import { useMemo } from "react";


export function useLinkedFields (linkedFields) {
   return useMemo(() => {
        let fo = {};
        for (let field of linkedFields) {
            if(Object.keys(fo).length > 0) {
                fo[field.ds_id].push(field)
            } else {
                fo[field.ds_id] = []
                fo[field.ds_id].push(field)
            }
        }
        return fo
    }, [linkedFields]);
}