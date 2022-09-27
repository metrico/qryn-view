import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";



export interface LinkedFieldState {
    id:string;
    name: string;
    regex: RegExp;
    query: string;
    url: string; // internal link switch: true: query, false: url
    urlLabel: string;
    internalLink: boolean;
    dataSource: string;
}

export interface LinkedFieldsState {
    linkedFields:LinkedFieldState[]
}


export interface LinkedFieldsPayload {
    payload:LinkedFieldState
}

export const initialState = {
    linkedFields: [
        {   id:nanoid(),
            name: "traceId",
            regex: /^.*?traceI[d|D]=(\w+).*$/,
            query: "${__value.raw}",
            url: "",
            urlLabel: "",
            internalLink: true,
            dataSource: "Tempo",
        },
        {   id:nanoid(),
            name: "traceID",
            regex: /^.*?"traceID":"(\w+)".*$/,
            query: "${__value.raw}",
            url: "",
            urlLabel: "",
            internalLink: true,
            dataSource: "Tempo",
        },
    ]
}


 const addLinkedField = (state:LinkedFieldsState,action:LinkedFieldsPayload) => {
    state.linkedFields = [...state.linkedFields, action.payload]
}

 const removeLinkedField = (state:LinkedFieldsState, action: LinkedFieldsPayload) => {
    const {id} = action.payload 

    const filtered = state.linkedFields.filter(f => f.id !== id)
    state.linkedFields = filtered
}

 const updateLinkedField = (state:LinkedFieldsState, action: LinkedFieldsPayload) => {
    const {id} = action.payload

    const stateClone = JSON.parse(JSON.stringify(state.linkedFields));
    stateClone.forEach((linkField:LinkedFieldState)=> {
        if(linkField.id === id) {
            linkField = action.payload
        }
    })
    state.linkedFields = stateClone

}

export const linkedFieldsSlice = createSlice({
    name:'linkedFieldsSlice',
    initialState,
    reducers: {
        addLinkedField,
        removeLinkedField,
        updateLinkedField
    }
})

export {addLinkedField, removeLinkedField, updateLinkedField} 

export default linkedFieldsSlice.reducer

