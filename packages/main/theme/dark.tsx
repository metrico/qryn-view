import { colors } from "./colors";
import {type QrynTheme, type QrynColors } from "./types";
import { createTheme } from "@mui/material";
const defaultTheme = createTheme();

export const dark: QrynColors = {
    background: colors.black.b300, //       hsl(0, 0%, 10%)  
    shadow: colors.black.b400, //           hsl(0, 0%, 16%) 
    // items background
    activeBg: colors.black.b100, //         hsl(0, 0%, 4%) 
    lightActiveBg: colors.black.b200, //    hsl(0, 0%, 8%) 
    // text
    contrast: colors.lightgrey.lg200, //    hsl(0, 0%, 76%) 
    lightContrast: colors.darkgrey.dg500, //hsl(0, 0%, 44%) 
    hardContrast: colors.white.w300, //     hsl(0, 0%, 92%) 
    maxContrast: colors.white.w200, //      hsl(0, 0%, 96%) 
    // text
    accent: colors.orange.or100, //         hsl(39, 100%, 50%) 
    // input bg, negative space
    deep: colors.black.b15, //              hsl(0, 0%, 7%) 
    ultraDeep: colors.black.b1, //          #111111
    // primary (colored)
    primary: colors.turquoise.tq200, //     hsl(180, 62%, 28%) 
    primaryLight: colors.turquoise.tq300, //hsl(180, 62%, 44%) 
    primaryAccent: colors.turquoise.tq1, // hsl(181, 98%, 21%) 
    // neutral colors (button default colors)
    neutral: colors.darkgrey.dg100, //      hsl(0, 0%, 28%) 
    lightNeutral: colors.darkgrey.dg15, //  hsla(0, 0%, 48%, 0.333) 
    accentNeutral: colors.darkgrey.dg300, //hsl(0, 0%, 36%) 
    contrastNeutral: colors.lightgrey.lg400, //hsl(0, 0%, 68%) alphaNeutral,
    alphaNeutral: colors.black.b10, //      hsla(0, 0%, 7%, 0.404) alphaNeutral
    alphaPlusNeutral: colors.darkgrey.dg60,//hsla(0, 0%, 48%, 0.5) alphaPlusNeutral
    secondaryNeutral: colors.darkgrey.dg30,//#4a525c  buttonSecondaryBg
    bgNeutral: colors.darkgrey.dg40, //      #6c6b6b38 bgNeutral
};

export const darkTheme : QrynTheme = {
    ...defaultTheme,
    ...dark
}