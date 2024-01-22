import { useEffect, useState } from "react";

// this is for test purposes
export async function getMaintenance() {
    return await fetch("http://localhost:8081/api/v1/maintenance")
}


export function useMaintenance () {

    const [maintenance, setMaintenance] = useState([]);

    useEffect(() => {
        getMaintenance()
            .then((res) => res.json())
            .then((data) => {
             
                setMaintenance(data);
            });
    },[]);




    return maintenance;
}