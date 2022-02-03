import { EmptyMessage } from "./EmptyMessage"
import LogLine from "./LogLine"


export default function LogsList(props) {
    // add error or non search message as <EmptyMessage/>

    return (

        <div className="logs-list">
            {props.logsList.length
                ? props.logsList.map((line, idx) => (
                    <LogLine index={idx} line={line} />
                )) : (
                    <EmptyMessage message={'Unmatched Values from Query'}

                    />)

            }
        </div>)
}



/**
 * Log Stats: 
 *      - common labels (calculate from logs list)
 *      - Line limit (take from limit)
 *      - Results (logs.length)
 */