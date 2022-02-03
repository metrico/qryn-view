
export default function LogsView(props) {
        return (
                <div className="">
                        <StatsHeader
                                loqgQueryStats={props.loqgQueryStats}
                        />
                        <LogsList
                                list={props.logsList}
                                stats={props.logsStats}
                        />
                </div>
        );
}



/**
 *  LogsList ->
 *              => LogLine 
 *                  => Warning Line
 *                  => LogText
 *                  => Log Labels
 *                      => Label 
 *                          => add to query call|clickhouse
 *                          => filter from query   type!= clickhouse
 *                          => add hoc statistics 
 *                                          => x of x have same label     
 *                                          values stats => value == number === percent
 *                      => Value 
 *                  => Detected fields => ts / tsNs 
 *                                              =>   icon eye => show only this field
 *                                              =>   value stats : x of x rows have that field
*/