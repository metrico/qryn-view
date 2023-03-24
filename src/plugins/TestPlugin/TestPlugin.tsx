/**
 * Expose: 
 * Actual query data 
 *   - Datasource data
 *        - url 
 *        - headers
 *        - auth
 *
 *   - query string
 *   - switches
 *    
 * 
 * 
 */


/**
 * Process data: 
 * - Api requests
 * - view
 * - query
 * - menu
 */

/**
 * Display: 
 * - view
 * - query 
 * - stats
 * - menu items
 * - builder
 * 
 */

/**
 * Output data: 
 * - where it belongs
 * - query
 * - view
 * - stats
 * - menu
 * - builder
 */

// expose panels
// list and handle

// expose datasources
// list and handle for hooks
// auth /  headers
// expose api url

// expose api with hook

import { css, cx } from "@emotion/css";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export const InfoLabel = (color: string) => css`
    color: ${color};
`;

export const Container = css`
    padding: 5px;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-items: center;
`;

export const Tooltip = css`
    position: absolute;
    display: none;
    background-color: bisque;
    font-size: 15px;
    min-width: 200px;
    min-height: 150px;
    border-radius: 5px;
    border: 1px solid black;
`;

export function useCurrentDatasource(id: string) {
    const datasources = useSelector((store: any) => store.dataSources);
    return useMemo(() => {
        return datasources.find((f: any) => f.id === id);
    }, [id, datasources]);
}

export function ApiRequest(type: "get" | "post", url: string, options: any) {}

export interface Props {
    // need to make a api request
    dataSourceId: any;
}

//
export default function TestPlugin(props: Props) {

    const {dataSourceId} = props

    // 


    const datasource = useCurrentDatasource(dataSourceId)


    // will get:
    // base url
    // headers
    // 
    console.log(datasource)

   // const {response, loading} = useApiRequest(type,id,)

    // we could pass datasourceid from props

    // const url = "" // base url should come from datasurces

    // need a specific datasource?

    //  const {response,loading} = useApi(url)

    useEffect(() => {}, []);

    return (
        // Component
        <div>
            <div>
                <svg>
                    <circle cx={50} cy={50} r={10} fill="red" />
                    <circle cx={10} cy={50} r={10} fill="red" />
                </svg>
            </div>

            <div id="explain">
                <h2> qryn raggi X</h2>
                <p>
                    {" "}
                    Once you push 'Start Scan', we will start scanning from now
                    back 1 minute. Indicating what kind of records it finds each
                    second interval (vertical lines) with the following color
                    code:
                </p>
                <ul>
                    <li className={cx(InfoLabel("blue"))}>Logs</li>
                    <li className={cx(InfoLabel("red"))}>Metrics</li>
                    <li className={cx(InfoLabel("purple"))}>Traces</li>
                </ul>
                <button id="start">Start Scan</button>
            </div>
            <div id="container" className={cx(Container)}>
                ...Loading
            </div>
        </div>
    );
}
