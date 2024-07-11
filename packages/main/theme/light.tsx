import { colors } from "./colors";
import { type QrynTheme, type QrynColors } from "./types";
import { createTheme } from "@mui/material";
const defaultTheme = createTheme();

export const light: QrynColors = {
    background: colors.white.w100, //       hsl(0, 0%, 10%) background background background
    shadow: colors.white.w200, //           hsl(0, 0%, 16%) shadow shadow shadow shadow inputlabelbg
    // items background
    activeBg: colors.white.w100, //         hsl(0, 0%, 4%) activeBg activeBg

    lightActiveBg: colors.white.w200, //    hsl(0, 0%, 8%) lightActiveBg
    // text
    contrast: colors.darkgrey.dg100, //    hsl(0, 0%, 76%) contrast
    lightContrast: colors.lightgrey.lg700, //hsl(0, 0%, 44%) lightContrast
    hardContrast: colors.black.b300, //     hsl(0, 0%, 92%) hardContrast
    maxContrast: colors.white.w200, //      hsl(0, 0%, 96%) maxContrast
    // text
    accent: colors.orange.or100, //         hsl(39, 100%, 50%) accent
    // input bg, negative space
    deep: colors.white.w300, //              hsl(0, 0%, 7%) deep
    ultraDeep: "#fff", //          #111111 ultraDeep
    // primary (colored)
    primary: colors.turquoise.tq200, //     hsl(180, 62%, 28%) primary primary
    primaryLight: colors.turquoise.tq300, //hsl(180, 62%, 44%) primaryLight
    primaryAccent: colors.turquoise.tq1, // hsl(181, 98%, 21%) primaryAccent
    // neutral colors (button default colors)
    neutral: colors.white.w200, //      hsl(0, 0%, 28%) neutral
    lightNeutral: colors.white.w700, //  hsla(0, 0%, 48%, 0.333) lightNeutral
    accentNeutral: colors.lightgrey.lg100, //hsl(0, 0%, 36%) accentNeutral
    contrastNeutral: colors.lightgrey.lg400, //hsl(0, 0%, 68%) alphaNeutral,
    alphaNeutral: colors.lightgrey.lg400, //      hsla(0, 0%, 7%, 0.404) alphaNeutral
    alphaPlusNeutral: colors.darkgrey.dg60, //hsla(0, 0%, 48%, 0.5) alphaPlusNeutral
    secondaryNeutral: "hsl(158, 64%, 85%, 86%)", //'hsl(158, 64%, 85%, 86%)'  buttonSecondaryBg
    bgNeutral: colors.darkgrey.dg40, //      #6c6b6b38 bgNeutral
};

export const lightTheme: QrynTheme = {
    ...defaultTheme,
    ...light,
};
