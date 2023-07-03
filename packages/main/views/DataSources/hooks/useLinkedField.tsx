import { useMemo } from "react";


export function useLinkedFields (linkedFields:any) {
   return useMemo(() => {
        let fo:any = {};
        for (let field of linkedFields) {
            if(Object.keys(fo).length > 0) {
                fo[field.dataSource].push(field)
            } else {
                fo[field.dataSource] = []
                fo[field.dataSource].push(field)
            }
        }
        return fo
    }, [linkedFields]);
}