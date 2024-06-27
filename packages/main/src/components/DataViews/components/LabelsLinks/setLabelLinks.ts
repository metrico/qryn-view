export interface LabelLink {
    id:string;
    name: string;
    dataSource: string;
    regex:RegExp;
    query: string;
    urlLabel:string;
    internalLink:boolean;
    linkType: string;
}

export interface labelLinkDispatchObj {
    type: string,
    linkedFields: LabelLink[]
}

export interface labelLinkAddDispatchObj {
    type: string,
    labelLink: LabelLink
}
 
export type dispatchFn = (object: labelLinkDispatchObj) => void

export default function setLabelLinks(linkedFields:LabelLink[])  {
    return function(dispatch:dispatchFn):void{
        dispatch({
            type: 'SET_LABEL_LINKS',
            linkedFields
        })
    }
} 
