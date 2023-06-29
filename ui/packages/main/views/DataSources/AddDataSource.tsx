import { nanoid } from "nanoid"




/**
 * It should: 
 * add a new datasource, and opening it at full size view 
 * add a dynamic link to datasource
 * 
 */

export default function AddDataSource() {
    return <></>
}


export const DATASOURCE_A = {
    type: 'logs',
    name: 'Logs-A', // => this one should be shown
    icon: 'logs-icon',
    url: 'localhost:3100', //
    headers: { // here inside also auth

    },
    derivedFileds: [
        //.. derived fields
    ]
 


}

export class DataSource {


    get id(): any {
        return this.id
    }

    set id(val) {
        this.id = val
    }


    get type (): any {
        return this.type
    }
    set type (val) {
        this.type = val
    }

    get name (): any {
        return this.name
    }

    set name (val) {
        this.name = val
    }

    get icon (): any {
        return this.icon
    }

    set icon (val) {
        this.icon = val
    }

    get url (): any {
        return this.url;

    }

    set url (val) {
        this.url = val


    }

get headers(): any {
    return this.headers;
}

set headers(val) {
    this.headers = val
}

get derivedFileds(): any {
    return this.derivedFields
}

set derivedFields(val: any) {
    this.derivedFields = val
}

    constructor(){
        this.id = nanoid()

    }

}


export function dataSourceGenerator(type: any) {

    let dataSource = new DataSource()

    function setName(name: any) {
        
        dataSource.name = name
    }

    function setType(type: any) {
        dataSource.type = type
    }

    function setIcon(type: any) {

        switch(type){
            case 'logs': 
            dataSource.icon = 'logs_icon';
            break;
            case 'metrics':
                dataSource.icon = 'metrics_icon';
            break;
            case 'traces':
                dataSource.icon = 'traces_icon';
            break;
            default :
            dataSource.icon = 'logs_icon'
        }
    }

    function setHeaders(headers: any) {
        dataSource.headers = headers
    }

    function setDerivedFields(derivedFields: any) {
        dataSource.derivedFields = derivedFields
    }

}

