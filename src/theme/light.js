import defaultTheme from "@mui/material/styles/defaultTheme";
const black = {
    b10: "hsla(0, 0%, 7%, 0.404)",
    b15: "hsl(0, 0%, 7%)",
    b100: "hsl(0, 0%, 4%)",
    b200: "hsl(0, 0%, 8%)",
    b300: "hsl(0, 0%, 10%)",
    b400: "hsl(0, 0%, 16%)",
    b500: "hsl(0, 0%, 20%)",
};

const white = {
    w100: "hsl(0, 0%, 100%)",
    w200: "hsl(0, 0%, 96%)",
    w300: "hsl(0, 0%, 92%)",
    w400: "hsl(0, 0%, 88%)",
    w500: "hsl(0, 0%, 84%)",
};

const lightgrey = {
    lg100: "hsl(0, 0%, 80%)",
    lg200: "hsl(0, 0%, 76%)", //text
    lg300: "hsl(0, 0%, 72%)",
    lg400: "hsl(0, 0%, 68%)", // label
    lg500: "hsl(0, 0%, 64%)",
};

const darkgrey = {
    dg10: "hsla(0, 0%, 48%, 0.231)",
    dg15: "hsla(0, 0%, 48%, 0.333)",
    dg100: "hsl(0, 0%, 28%)",
    dg200: "hsl(0, 0%, 32%)",
    dg300: "hsl(0, 0%, 36%)",
    dg400: "hsl(0, 0%, 40%)",
    dg500: "hsl(0, 0%, 44%)",
};

const turquoise = {
    tq100: "hsl(180, 62%, 28%)",
    tq200: "hsl(180, 62%, 33%)", // button
    tq300: "hsl(180, 62%, 44%)", // button hover
    tq400: "hsl(180, 62%, 52%)",
    tq500: "hsl(180, 62%, 60%)",
};
const palette = {
    primary: turquoise.tq200,
    grey: {
        '700': darkgrey.dg300
    },
    common: {
        white: 'hsl(0, 0%, 100%)'
    }
}
const typography = {
    ...defaultTheme.typography,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
}

const orange = {
    or100: "hsl(39, 100%, 50%)",
};
const bgColor = white.w400;
const textColor = darkgrey.dg200;
const textOff = darkgrey.dg400;
const textPrimary = white.w300;
const inputBg = black.b15;
const primaryDark = turquoise.tq200;
const primaryLight = turquoise.tq300;
const widgetContainer = white.w400;
const buttonDefault = darkgrey.dg100;
const buttonHover = darkgrey.dg15;
const buttonInactive = black.b400;
const buttonText = white.w200;
const inputTextFocus = orange.or100;
const inputLabelColor = lightgrey.lg400;
const inputLabelBg = white.w100;
const viewBg = black.w300;
const scrollbarThumb = "hsla(0, 0%, 48%, 0.122)";
const critical = "hsl(300, 100%, 25%)";
const error = "hsl(0, 100%, 50%)";
const warning = "hsl(60, 100%, 50%)";
const info = "hsl(120, 100%, 25%)";
const debug = "hsl(240, 100%, 50%)";
const trace = "hsl(195, 53%, 79%)";
const unknown = "hsl(0, 0%, 50%)";

const lightTheme = {
    black,
    white,
    lightgrey,
    textColor,
    primaryDark,
    primaryLight,
    widgetContainer,
    buttonDefault,
    buttonHover,
    buttonInactive,
    buttonText,
    inputBg,
    inputTextFocus,
    inputLabelColor,
    inputLabelBg,
    textOff,
    textPrimary,
    viewBg,
    scrollbarThumb,
    critical,
    error,
    warning,
    info,
    debug,
    trace,
    unknown,
    darkgrey,
    turquoise,
    palette,
    typography,
    bgColor,
    ...defaultTheme
};
export default lightTheme;
