//@ts-ignore
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
    w100: "hsl(0, 0%, 100%)", // buttons over lightgray
    w200: "hsl(0, 0%, 96%)",
    w300: "hsl(0, 0%, 92%)",
    wb: "#f9f9f9",
    w400: "hsl(180, 5%, 96%)",
    w500: "hsl(0, 0%, 92%)",
    w600: "hsla(180,5%,96%,1)",
    w700: "hsl(0,0%,98%)", // lightgray bg
};

const lightgrey = {
    lg10: "hsla(0, 0%, 90%, 0.231)",
    lg15: "hsla(0, 0%, 90%, 0.333)",
    lg100: "hsl(0, 0%, 80%)",
    lg200: "hsl(0, 0%, 76%)",
    lg300: "hsl(0, 0%, 72%)",
    lg400: "hsl(0, 0%, 68%)",
    lg500: "hsl(0, 0%, 64%)",
    lg600: "hsl(0, 0%, 60%)",
    lg700: "hsl(0, 0%, 56%)",
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
const typography = {
   // ...defaultTheme.typography,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
};

const orange = {
    or100: "hsl(39, 100%, 50%)",
};
const mainBgColor = white.w100;
const shBgColor = white.wb;
const logBgColor = white.w100;
const tabActive = white.w100;
const tabHeader = white.w400;
const tabBg = white.w200;
const textColor = darkgrey.dg100;
const textOff = lightgrey.lg700;
const textPrimary = black.b300;
const textPrimaryAccent = turquoise.tq200;
const inputBg = white.w100;
const primaryDark = turquoise.tq200;
const primaryLight = turquoise.tq300;
const widgetContainer = white.w200;
const secondaryWidgetContainer = white.w200;
const widgetTitle = lightgrey.lg300;
const widgetTitleBorder = lightgrey.lg700;
const buttonDefault = white.w100;
const buttonHover = white.w700;
const buttonInactive = lightgrey.lg10;
const buttonBorder = lightgrey.lg100;
const buttonText = white.w200;
const inputTextFocus = orange.or100;
const highlitedButton = orange.or100;
const inputLabelColor = lightgrey.lg400;
const inputLabelBg = white.w100;
const chartBg = '#fff';
const viewBg = white.w400;
const historyRow = '#6c6b6b38';
const scrollbarThumb = "hsla(0, 0%, 48%, 0.122)";
const critical = "hsl(300, 100%, 25%)";
const error = "hsl(0, 100%, 50%)";
const warning = orange;
const info = "hsl(120, 100%, 25%)";
const debug = "hsl(240, 100%, 50%)";
const trace = "hsl(195, 53%, 79%)";
const unknown = "hsl(0, 0%, 50%)";
const buttonSecondaryBg = 'hsl(158, 64%, 85%, 86%)'

const lightTheme = {
    black,
    white,
    lightgrey,
    textColor,
    primaryDark,
    primaryLight,
    buttonSecondaryBg,
    widgetContainer,
    buttonDefault,
    buttonHover,
    buttonInactive,
    buttonText,
    buttonBorder,
    inputBg,
    inputTextFocus,
    inputLabelColor,
    inputLabelBg,
    textOff,
    textPrimary,
    textPrimaryAccent,
    historyRow,
    viewBg,
    chartBg,
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
    typography,
    logBgColor,
    tabActive,
    tabHeader,
    tabBg,
    mainBgColor,
    shBgColor,
    secondaryWidgetContainer,
    widgetTitle,
    widgetTitleBorder,
    highlitedButton,
    ...defaultTheme,
};
export default lightTheme;
