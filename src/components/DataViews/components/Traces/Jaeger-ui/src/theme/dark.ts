import { createTheme } from "@mui/material";
const defaultTheme = createTheme()

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
    dg50: "hsl(0, 0%, 18%)",
    dg90: "hsl(0, 0%, 25%)",
    dg100: "hsl(0, 0%, 28%)",
    dg200: "hsl(0, 0%, 32%)",
    dg300: "hsl(0, 0%, 36%)",
    dg400: "hsl(0, 0%, 40%)",
    dg500: "hsl(0, 0%, 44%)",
};

const turquoise = {
    tq1: "hsl(181, 98%, 21%);",
    tq100: "hsl(180, 62%, 28%)",
    tq200: "hsl(180, 62%, 33%)", // button
    tq300: "hsl(180, 62%, 44%)", // button hover
    tq400: "hsl(180, 62%, 52%)",
    tq500: "hsl(180, 62%, 60%)",
};
const orange = {
    or100: "hsl(39, 100%, 50%)",
};

const mainBgColor = black.b300;
const shBgColor = black.b400; // a shadow color => for panels container
const logBgColor = black.b100;
const tabActive = black.b100;
const tabHeader = black.b400;
const tabBg = black.b200;
const textColor = lightgrey.lg200;
const textOff = darkgrey.dg500;
const textPrimary = white.w300;
const textPrimaryAccent = orange.or100;
const inputBg = black.b15;
const primaryDark = turquoise.tq200;
const primaryLight = turquoise.tq300;
const primaryBorder = turquoise.tq1;
const widgetContainer = black.b400;
const secondaryWidgetContainer = black.b300;
const widgetTitle = darkgrey.dg90;
const widgetTitleBorder = lightgrey.lg700;
const buttonDefault = darkgrey.dg100;
const buttonHover = darkgrey.dg15;
const buttonInactive = black.b400;
const buttonBorder = darkgrey.dg300;
const buttonText = white.w200;
const inputTextFocus = orange.or100;
const highlitedButton = orange.or100;
const inputLabelColor = lightgrey.lg400;
const inputLabelBg = black.b10;
const chartBg = '#111';
const historyRow = '#6c6b6b38';
const viewBg = black.b300;
const scrollbarThumb = "hsla(0, 0%, 48%, 0.5)";
const critical = "hsl(300, 100%, 25%)";
const error = "hsl(0, 100%, 50%)";
const warning = "hsl(60, 100%, 50%)";
const info = "hsl(120, 100%, 25%)";
const debug = "hsl(240, 100%, 50%)";
const trace = "hsl(195, 53%, 79%)";
const unknown = "hsl(0, 0%, 50%)";

const darkTheme:any = {
    ...defaultTheme,
    black,
    white,
    lightgrey,
    textColor,
    primaryDark,
    primaryLight,
    primaryBorder,
    widgetContainer,
    buttonDefault,
    buttonHover,
    buttonInactive,
    buttonBorder,
    buttonText,
    inputBg,
    inputTextFocus,
    inputLabelColor,
    inputLabelBg,
    textOff,
    textPrimary,
    textPrimaryAccent,
    viewBg,
    chartBg,
    historyRow,
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

  
};
export default darkTheme;
