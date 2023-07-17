import React from 'react'

export type SeriesHeaderProps = {
    title: string;
};

export const SeriesHeader:React.FC<SeriesHeaderProps> = ({ title }: SeriesHeaderProps) => {
    return <div className="c-header">{title}</div>;
};
