import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


  
  export interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    theme:any
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
  }
  
  export const StyledTabs = styled((props: any) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))(({theme})=>({
    '& .MuiButtonBase-root-MuiTab-root':{
        maxHeight:'20px',
    },
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
  
    
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: theme?.primary,
    },
  }))

  
  export const StyledTab = styled((props: any) => (
    <Tab disableRipple {...props} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
    padding:0,

    marginRight: '8px',
    color: theme.lightContrast,
    '&.Mui-selected': {
      color: theme.contrast,
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }));