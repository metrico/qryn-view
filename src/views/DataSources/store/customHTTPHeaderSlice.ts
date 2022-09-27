import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface CustomHttpHeader {
    id: string;
    header: string;
    value: string;
}

export interface CustomHttpHeaderState {
    customHttpHeaders: CustomHttpHeader[];
}

const initialState: CustomHttpHeaderState = {
    customHttpHeaders: [
        {
            id: nanoid(),
            header: "",
            value: "",
        },
    ],
};

export interface CustomHttpHeaderPayload {
    payload: CustomHttpHeader;
}

export interface CustomHttpPayload {
    payload: CustomHttpHeaderState;
}

const addCustomHttpHeader = (
    state: CustomHttpHeaderState,
    action: CustomHttpHeaderPayload
) => {
    const { header, value } = action.payload;
    state.customHttpHeaders = [
        ...state.customHttpHeaders,
        { id: nanoid(), header: header, value: value },
    ];
};

const removeCustomHttpHeader = (
    state:CustomHttpHeaderState,
    action: CustomHttpHeaderPayload
) => {
    const {id} = action.payload
    const filtered = state.customHttpHeaders.filter(f => f.id !== id)
    state.customHttpHeaders = filtered
}

const updateCustomHttpHeader = (
    state:CustomHttpHeaderState,
    action: CustomHttpHeaderPayload
) => {
    const {id} = action.payload
    const stateClone = JSON.parse(JSON.stringify(state.customHttpHeaders))
    stateClone.forEach( (header:CustomHttpHeader )=>{
        if(header.id === id) {
            header = action.payload
        }
    })
    state.customHttpHeaders = stateClone
} 

export const customHTTPHeaderSlice = createSlice({
    name: "customHTTPHeader",
    initialState,
    reducers: {
        addCustomHttpHeader,
        removeCustomHttpHeader,
        updateCustomHttpHeader

    },
});
