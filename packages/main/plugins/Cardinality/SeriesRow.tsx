import {cx, css} from '@emotion/css';

export type SeriesRowProps = {
    name: string;
    value: number;
    share: number;
    theme: any;
    onFilter: (e: any) => void;
};

export const SeriesRowStyle = (theme: any) => css`
    display: flex;
    align-items: center;
    padding: 12px 8px;
    border-bottom: 1px solid ${theme.lightContrast};
    .c-name {
        font-size: 12px;
        color: ${theme.primary};
        flex: 1;
        cursor: pointer;
        margin: 0px 12px;
    }
    .c-value {
        color: ${theme.contrast};
        font-size: 12px;
        margin: 0px 12px;
        font-weight: bold;
    }
    .c-share {
        font-size: 12px;
        font-family: monospace;
        margin: 0px 12px;
    }
    progress {
        background: ${theme.deep};
        border-radius: 3px;
        // width: 50%;
        height: 12px;

        border: 1px solid ${theme.accentNeutral};
    }
    progress::-webkit-progress-bar {
        background-color: ${theme.deep};
        border-radius: 3px;
    }
    progress::-webkit-progress-value {
        background-color: ${theme.primary};
        border-radius: 3px;
    }
    progress::-moz-progress-bar {
        background-color: ${theme.primary};
        border-radius: 3px;
    }
`;

export const SeriesRow = ({
    name,
    value,
    share,
    theme,
    onFilter,
}: SeriesRowProps) => {
    return (
        <div className={cx(SeriesRowStyle(theme))}>
            <div className="c-name" onClick={onFilter}>
                {name}
            </div>
            <div className="c-value">{value}</div>
            <progress value={share} max={100} />
            <div className="c-share">{share.toFixed(2)}%</div>
        </div>
    );
};
