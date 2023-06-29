import {type Theme } from '@mui/material'

export type QrynColors = {
    background: string;
    shadow: string;
    activeBg: string;
    lightActiveBg: string;
    contrast: string;
    lightContrast: string;
    hardContrast: string;
    maxContrast: string;
    accent: string;
    deep: string;
    ultraDeep: string;
    primary: string;
    primaryLight: string;
    primaryAccent: string;
    neutral: string;
    lightNeutral: string;
    accentNeutral: string;
    contrastNeutral: string;
    alphaNeutral: string;
    alphaPlusNeutral: string;
    secondaryNeutral: string;
    bgNeutral: string;
};

export type QrynTheme = Theme & QrynColors