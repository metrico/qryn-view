import React from 'react'

export interface Plugin {
    name:string;
    section:string;
    id:string;
    Component: React.FC<any>;
    description:string;
    active:boolean;
    roles: string[]
}
