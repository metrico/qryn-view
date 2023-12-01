export interface CardinalityData {
    totalSeries: number;
    totalLabelValuePairs: number;
    seriesCountByMetricName?: any;
    seriesCountByLabelName: SeriesCountByLabelName[];
    seriesCountByFocusLabelValue: SeriesCountByLabelName[];
    seriesCountByLabelValuePair: SeriesCountByLabelName[];
    labelValueCountByLabelName: SeriesCountByLabelName[];
}
export interface CardinalityResponse {
    data: CardinalityData;
    isPartial: boolean;
    status: string;
}

interface SeriesCountByLabelName {
    name: string;
    value: number;
}
