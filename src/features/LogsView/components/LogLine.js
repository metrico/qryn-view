export default function LogLine(
    {
        isDedupNumber,
        dedupNumber,
        lineColor,
        timestamp,
        isShowTime,
        uniqueLabels,
        isShowUniqueLabels,
        logText,
        isLogTextWrapped

    }
) {
    return (
        <div className="log-line">

            <DedupLabel
                number={dedupNumber}
                isDedupNumber={isDedupNumber} />
            <WarningLine
                lineColor={lineColor} />
            <TimeLabel
                timestamp={timestamp}
                isShowTime={isShowTime} />
            <UniqueLabels
                uniqueLabels={uniqueLabels}
                isShowUniqueLabels={isShowUniqueLabels} />
                <LogText text={logText} isWarapped={isLogTextWrapped}/>
        </div>
    )
}

/**
 * !Log Line: 
 *
 * ?options:
 *  
 * * SHOW_TIME : @Prop <Bool> { showTime = true }
 * [hide /  show timestamp]
 * 
 * * UNIQUE_LABELS : @Prop <Bool> { uniqueLabels = false }
 * [show unique labels from log + id type label value]
 * 
 * * WRAP_LINES : @Prop <Bool> { wrappedLines = false }
 * [show log lines wrapped]
 * 
 * * PRETTIFY_JSON : @Prop <Bool> { prettifyJSON = false}
 * [shows JSON data in lines]
 * 
 * * DEDUP ? => from parent @Prop < None | Exact | Numbers | Signature> { dedupType = 'None' }
 * [shows deduplicated data with number indicator x times.]
 * 
 * * FLIP_RESULTS_ORDER : @Prop <Asc | Desc> { resultsOrder = 'Desc' }
 * [Sorts by timestamp Asc / Desc]
 *
 * ?components: 
 * 
 * * Dedup label @Params = ['number','isDedupNumber']
 * * WarningLine = colored if there is a warning or another sign* @Props = ['lineColor']
 * * TimeLabel @Props = ['ts','isShowTime']
 * * UniqueLabels = ['uniqueLabels','isShowUniqueLabels']
 * * LogText = ['text','isWrapped']
 * * JsonBlock = ['block', 'IsJson']
 * 
 */
