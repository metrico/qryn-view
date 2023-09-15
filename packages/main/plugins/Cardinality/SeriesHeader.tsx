import React from 'react'

export type SeriesHeaderProps = {
    title: string;
};
// here should be the tabs for table / chart view

const SeriesHeader:React.FC<SeriesHeaderProps> = ({ title }: SeriesHeaderProps) => {
    return <div className="c-header">{title}</div>;
};

export default SeriesHeader;
