import { createSlice } from "@reduxjs/toolkit";

export const labelSlice  = createSlice({
    name: 'labels',
    initialState: {
        value: []
    },
    reducers: {
        getLabels: state => state.value,
        setLabel: (value) => { state.value = value},
        getLabelByName: (name) => state.value.find({name})
    }
})

// gives all params from selected label   LABEL = LABEL
// this should autocomple te tag
// chanels should be concatenated inside query