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


    get id() {
        return this.id
    }

    set id(val) {
        this.id = val
    }


    get type () {
        return this.type
    }
    set type (val) {
        this.type = val
    }

    get name () {
        return this.name
    }

    set name (val) {
        this.name = val
    }

    get icon () {
        return this.icon
    }

    set icon (val) {
        this.icon = val
    }

    get url () {
        return this.url;

    }

    set url (val) {
        this.url = val


    }

get headers() {
    return this.headers;
}

set headers(val) {
    this.headers = val
}

get derivedFileds() {
    return this.derivedFields
}

set derivedFields(val) {
    this.derivedFields = val
}

    constructor(){
        this.id = nanoid()

    }

}


export function dataSourceGenerator(type) {

    let dataSource = new DataSource()

    function setName(name) {
        
        dataSource.name = name
    }

    function setType(type) {
        dataSource.type = type
    }

    function setIcon(type) {

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

    function setHeaders(headers) {
        dataSource.headers = headers
    }

    function setDerivedFields(derivedFields) {
        dataSource.derivedFields = derivedFields
    }

}

