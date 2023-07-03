const black = {
    b1: "#111",
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
    dg30:"#4a525c",
    dg40:"#6c6b6b38",
    dg50: "hsl(0, 0%, 18%)",
    dg60:"hsla(0, 0%, 48%, 0.5)",
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

type LevelColors = {
    critical: string;
    error: string;
    warning: string;
    info: string;
    debug: string;
    trace: string;
    unknown: string;
};
export const LEVEL_COLORS: LevelColors = {
    critical: "hsl(300, 100%, 25%)",
    error: "hsl(0, 100%, 50%)",
    warning: "hsl(60, 100%, 50%)",
    info: "hsl(120, 100%, 25%)",
    debug: "hsl(240, 100%, 50%)",
    trace: "hsl(195, 53%, 79%)",
    unknown: "hsl(0, 0%, 50%)",
};

export const colors = {
    level:LEVEL_COLORS,
    black,
    white,
    lightgrey,
    darkgrey,
    turquoise,
    orange,
};
