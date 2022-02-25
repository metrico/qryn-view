

import styled from "@emotion/styled"
import { createTheme, ThemeProvider } from "@mui/material";

import Drawer from '@mui/material/Drawer';


export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main:'#fff'
        }
    }
})

const SearchHistoryContainer = styled.div `

height:50px;
background: #666;
display:flex;
`

const SearchHistoryDrawer = () => {

    return(
        <ThemeProvider theme={theme}>
         <Drawer
        anchor={'bottom'}
        open={true}
        variant={'persistent'}
         >
             {/* history info will come in here */}
        </Drawer>
</ThemeProvider>
 
    )

}


const SearchHistory = () => {


return (
  <SearchHistoryDrawer/>
)


}

export default SearchHistory
