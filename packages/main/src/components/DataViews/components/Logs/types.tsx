export interface ILogRowProps {
    text: string;
    dateFormated: string;
    isSplit: boolean;
    isMobile: boolean;
    isShowTs: boolean;
}

export interface IRowProps {
    toggleItemActive: (index: number) => void;
    index: number;
    log: any;
    actQuery: any;
    isMobile: boolean;
    isSplit: boolean;
    dataSourceData?: any;
    dataSourceId: string;
}


export interface ILogsProps {
    items: any[];
    toggleItemActive: (index: number) => void;
    actQuery: any;
    dataSourceId: string;
  }
