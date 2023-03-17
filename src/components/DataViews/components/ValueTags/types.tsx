export interface LinkButtonProps {
    dataSourceData: {
        linkedFields: {
            dataSourceId: string;
            linkType?: string;
            internalLink?: boolean;
        }[];
    };
    linkedFieldTags?: {
        fields?: {
            tagGroups?: Record<string, string>;
        }[];
    };
    buttonKey: string;
    value?: string;
    openTraces: (
        event: React.MouseEvent<HTMLElement>,
        buttonKey: string,
        value: string,
        dataSourceId: string,
        currentURL: string,
        linkType?: string
    ) => void;
}

export interface IFilterButtonProps {
    label: string;
    value?: any;
    actQuery: any;
}
