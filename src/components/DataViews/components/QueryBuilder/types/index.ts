import { AxiosResponse } from "axios";

export interface HeaderAuth {
    username?: any;
    password?: any;
}

export interface RequestHeaders {
    auth?: any;
    options?: any;
}

export interface LogsResponseData {
    data: any;
    status: any;
}
export interface LogsResponse extends AxiosResponse {
    data: LogsResponseData;
}

export type operator =
    | "equals"
    | "regexequals"
    | "excludeequals"
    | "regexexclude";

// interfaces

export interface Operation {
    id: number;
    name: string;
    header: any;
    range: string;
    expressions: any[];
    conversion_function: string;
    labelValue: string;
    filterText: string;
    labelFilter: LabelFilter;
    binaryOperation: BinaryOperation;
    lineFilter: string;
    quantile: string | number;
    kValue: number;
    labels: any[];
    labelOpts: any[]; // here we should have the labels from the .. initial operation
    opType: string;
}

export interface BinaryValue {
    binaryOpt: string;
    vectOpt: string;
    vectValue: string;
}
export interface Builder {
    operations: any[];
    labelsState: any[];
    binaryValue: BinaryValue;
    logsVolumeQuery: string;
    builderResult: string;
    isBinary: boolean;
    isMetrics?:boolean;
}

export interface FormBuilderProps {
    type: 'metrics_search' | 'logs_search';
    builders: Builder[];
    finalQuery: string;
    setBuilders: Function;
    dataSourceId: string;
    logsResponse: any;
    addBinary(idx: number): void;
}

export interface Label {
    id: string;
    label: string;
    operator: operator;
    values: string[];
}

export interface LabelValueState {
    label: string;
    operator: string;
    values: Array<any>;
    id: string;
}

export interface operatorsTypes {
    equals: string | any;
    regexequals: string | any;
    excludeequals: string | any;
    regexexclude: string | any;
}

export interface LabelSelectOption {
    label?: string;
    value?: string;
}
export interface UseLogLabelsResponse {
    logsResponse: LabelSelectOption[];
    loading: boolean;
}

export interface ApiDataSource {
    type: string;
    url: string;
}

export interface GetApiRequestArgs {
    dataSource: ApiDataSource;
    url: string;
    setLoading: Function;
    setResponse: Function;
}

export type InitialOperationFn = (
    name: string,
    opType: string,
    labelSeries: any,
    operations: any
) => Operation;

export interface LabelFilter {
    label: string;
    operator: string;
    value: string;
}

export interface BinaryOperation {
    value: string;
    bool: boolean;
}

export interface BinaryOperator {
    operator: string;
    vector_matches: string;
    label: string;
}

export interface LogsFormBuilderProps {
    dataSourceId: string;
    labelValueChange(labelValue: string): void;
    handleLogsVolumeChange(logsVolumeQuery: string): void;
}

export interface MetricsFormBuilderProps {
    dataSourceId: string;
    labelValueChange(labelValue:string):void 
    handleMetricsChange(metric:string):void

}