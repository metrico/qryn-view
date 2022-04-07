const black = {
    b10: "#12121267",
    b15: "#121212",
    b100: "#0a0a0a",
    b200: "#141414",
    b300: "#1a1a1a",
    b400: "#292929",
    b500: "#333333",
};

const white = {
    w100: "#fff",
    w200: "#f5f5f5",
    w300: "#ebebeb",
    w400: "#e0e0e0",
    w500: "#d6d6d6",
};

const lightgrey = {
    lg100: "#ccc",
    lg200: "#c2c2c2", //text
    lg300: "#b8b8b8",
    lg400: "#adadad", // label
    lg500: "#a3a3a3",
};

const darkgrey = {
    dg10: "##7b7b7b3b",
    dg15: "#7b7b7b55",
    dg100: "#474747",
    dg200: "#525252",
    dg300: "#5c5c5c",
    dg400: "#666",
    dg500: "#707070",
};

const turquoise = {
    tq100: "#1b7474",
    tq200: "#208989", // button
    tq300: "#2bb6b6", // button hover
    tq400: "#39d0d0",
    tq500: "#5ad8d8",
};

const orange = {
    or100: "orange",
};

const textColor = lightgrey.lg200;
const textOff = lightgrey.lg400;
const textWhite = white.w300;
const inputBg = black.b15;
const primaryDark = turquoise.tq200;
const primaryLight = turquoise.tq300;
const widgetContainer = black.b400;
const buttonDefault = darkgrey.dg100;
const buttonHover = darkgrey.dg15;
const buttonInactive = black.b400;
const buttonText = white.w200;
const inputTextFocus = orange.or100;
const inputLabelColor = lightgrey.lg400;
const inputLabelBg = black.bg10;
const viewBg = black.b300;
const scrollbarThumb = "#616161";
const critical = "purple";
const error = "red";
const warning = "yellow";
const info = "green";
const debug = "blue";
const trace = "lightblue";
const unknown = "gray";

const darkTheme = {
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
    textWhite,
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
};
export default darkTheme;
