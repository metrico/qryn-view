import {createSlice} from '@reduxjs/toolkit'

export interface DataSourceHeaderState {
    name: string;
    isDefault: boolean;
}

const initialState:DataSourceHeaderState = {
    name: 'Logs',
    isDefault:true,
}
export interface NamePayload  {
  payload:string
}

export interface IsDefaultPayload {
    payload: boolean;
}

const setName = (state:DataSourceHeaderState, action:NamePayload) => {
    state.name = action.payload
}

const setIsDefault = (state:DataSourceHeaderState, action: IsDefaultPayload) => {
    state.isDefault = action.payload
}
export const dataSourceHeaderSlice = createSlice({
    name:'dataSourceHeader',
    initialState,
    reducers: {
        setName,
        setIsDefault

    },  
})