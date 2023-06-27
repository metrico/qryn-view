import { createSlice } from '@reduxjs/toolkit'
import {type RootState} from '@ui/store'

// Define a type for the slice state
interface ThemeState {
    value: 'light' | 'dark'
  }
  
  // Define the initial state using that type
  const initialState = {
    value: 'dark',
  } as ThemeState
  
  export const themeSlice = createSlice({
    name: 'theme',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setLightTheme: (state:ThemeState) => {
        state.value = 'light'
      },
      setDarkTheme: (state:ThemeState) => {
        state.value = 'dark'
      },

    },
  })
  
  export const {setLightTheme, setDarkTheme } = themeSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  export const selectTheme = (state: RootState) => state.theme.value
  
  export default themeSlice.reducer