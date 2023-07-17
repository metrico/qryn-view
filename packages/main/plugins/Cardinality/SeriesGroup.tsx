import React from 'react'
import { SeriesHeader, SeriesHeaderProps } from './SeriesHeader';
import {SeriesRow, SeriesRowProps} from './SeriesRow'
import useTheme from "@ui/theme/useTheme";
import {cx, css} from '@emotion/css'
export const SeriesGroupContainer = (theme: any) => css`
    margin: 4px;
    display: flex;
    flex-direction: column;
    padding: 8px 4px;
    background: ${theme.shadow};
    .c-header {
        font-size: 14px;
        padding: 8px 6px;
        //margin: 0px 12px;
        border-bottom: 1px solid ${theme.lightContrast};
        font-weight: bold;
    }
`;

export type SeriesGroupProps = {
    rows: SeriesRowProps[];
} & SeriesHeaderProps;

export const SeriesGroup:React.FC<SeriesGroupProps>= ({ title, rows }: SeriesGroupProps) => {
    const theme = useTheme();

    return (
        <div className={cx(SeriesGroupContainer(theme))}>
            <SeriesHeader title={title} />
            {rows &&
                rows?.length > 0 &&
                rows.map((row: SeriesRowProps, key: number) => (
                    <SeriesRow key={key} {...row} />
                ))}
        </div>
    );
};
