import { css, cx } from "@emotion/css";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../theme/themes";

const StatsCont = (theme:any) => css`
    color:${theme.textColor};
    display: flex;
    flex: 1;
    flex-direction: column;
    border: 1px solid ${theme.buttonBorder};
    margin-top:5px;
    border-radius:5px;
`;

const StatsHeader = (theme:any) => css`
    font-size:14px;
    background: ${theme.widgetContainer};
    padding:5px;
    border-bottom: 1px solid ${theme.buttonBorder};

`

const StatsTable = (theme:any) => css`
    display: table;
    
`;
const StatsRow = css`
    display: table-row;
    font-size: 13px;
`;

const StatsCell = (theme:any,type:'key'|'value') => css`
    display: table-cell;
    padding: 5px;
    border-top: 1px solid ${theme.buttonBorder};
    ${type ==='key' ? `color:${theme.textPrimary};`:'' }
`;

const StatsKey = css`
    font-weight: lighter;
`;
const StatsValue = css`
    font-family: monospace;
`;


export function Stats(props: any) {
console.log(props)
const {data:{hasStats,statsData }} = props
    const storeTheme = useSelector((store:{theme:'dark'|'light'})=>store.theme)

    const theme = useMemo(()=>{
        return themes[storeTheme]
    },[storeTheme])


    const statsDisplay : [string,string][]= useMemo(() => {
        if (
            typeof statsData !== "object" &&
            statsData !== undefined &&
            Object.keys(statsData)?.length < 1
        ) {
            return [['key','val']];
        }

        return Object.entries(statsData);
    }, [statsData]);

    if (statsDisplay?.length > 0 && hasStats ) {
        return (
            <div className={cx(StatsCont(theme))}>
                <div className={cx(StatsHeader(theme))}>Stats</div>
                <div className={cx(StatsTable(theme))}>
                    {statsDisplay?.map(([key, value], index) => (
                        <div key={index} className={cx(StatsRow)}>
                            <div className={cx(StatsCell(theme,'key'), StatsKey)}>{key}</div>
                            <div className={cx(StatsCell(theme,'value'), StatsValue)}>
                                {value||''}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
