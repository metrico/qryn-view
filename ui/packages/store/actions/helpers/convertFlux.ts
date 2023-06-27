import Papa from "papaparse";

export async function convertFlux(csv: any) {
    try {
        var response: any = {
            meta: [],
            data: [],
            statistics: { elapsed: 0.360986682, rows_read: 0, bytes_read: 0 },
        };

        var json: any = Papa.parse(csv, {
            header: true,
            comments: true,
            dynamicTyping: true,
        } as any);

        response.data = await json.data.map(function (item: any) {
            delete item[""];
            delete item.table;
            delete item.result;
            return item;
        });

        response.data.length = response.data.length - 2;
        // response.meta = json.meta.fields.slice(3, json.meta.fields.length);
        for (const [key, value] of Object.entries(response.data[0])) {
            response.meta.push({ name: key, type: typeof value });
        }
        response.rows = response.data.length;

        return response;
    } catch (e) {
        return csv;
    }
}

export function csvJSON(csvText: any) {
    let lines: any[] = [];
    const linesArray = csvText.split('\n');
    // for trimming and deleting extra space 
    linesArray.forEach((e: any) => {
        const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
        lines.push(row);
    });
    // for removing empty record
    lines.splice(lines.length - 1, 1);
    const result = [];
    const headers = lines[0].split(",");
    
    for (let i = 1; i < lines.length; i++) {
    
        const obj: any = {};
        const currentline = lines[i].split(",");
    
        for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //return result; //JavaScript object
    // return JSON.stringify(result); //JSON
    return result;
    }