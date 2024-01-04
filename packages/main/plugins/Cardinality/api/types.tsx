export interface CardinalityRequest {
    topN: number;
    match: string | null;
    date: string | null;
    focusLabel: string | null;
}

export interface MaintainanceItem {
    id: string;
    created_sec: number; // ts sec
    from_sec: number; // ts sec
    to_sec: number; // ts sec
    series_dropped: number;
    series_created: number;
    type: string; // types? delete
    status: string; // statuses? pending
    logs: string[];
}

export type MaintenanceResponse = MaintainanceItem[];

export type MaintainanceItemUndoResponse = {
    code: number;
    message: string;
};


