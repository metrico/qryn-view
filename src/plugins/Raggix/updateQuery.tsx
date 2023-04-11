import updatePanel from "./updatePanel";

const updateQuery = (
    panel: "left" | "right",
    queryID: string,
    param: string,
    data: any,
    prev: any  
) => {
   
    let newData = [...prev]; 
    let mapped = newData?.map((item: any) => {
        if (item?.id === queryID) {
            item[param] = data;
            return item;
        }
        return item;
    });

    if (mapped?.length > 0) {
        updatePanel(panel, mapped);
    }
}; 

export default updateQuery
