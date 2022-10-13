//@ts-ignore
import Sequence from "react-sequence-diagram"
export function SequenceDiagram(props) {
    const {
        streamData,
        valuesToUse,
    } = props;
    const getData = () => {
        const returnArr = [];
        streamData.forEach(stream => {
            // console.log(stream)
            let source = stream?.tags?.[valuesToUse?.source];
            let destination = stream?.tags?.[valuesToUse?.destination];
            let text = stream.text.replaceAll(`\n`,`\\n`).replaceAll(`\r`,'');
            const tokens2 = text.split('\\n').slice(0, 2);
            text = tokens2.join('\\n');
            const desc = text + '\\n' + stream.timestamp;
            const result = `"${source}"->"${destination}": ${desc}`
            if (source && destination) {
                returnArr.push(result)
            }
        });
        return returnArr.join('\n')
    }
    return (
        <Sequence
          options={{ theme: "simple", css_class: `signal` }}
          input={getData()}
        />
    )
}
