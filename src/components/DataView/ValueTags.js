import { setLabels } from '../../actions/setLabels';
import { queryBuilderWithLabels } from '../LabelBrowser/helpers/querybuilder';
import store from '../../store/store';
import loadLabelValues from '../../actions/loadLabelValues';
import loadLogs from '../../actions/loadLogs';
import { ZoomIn, ZoomOut } from '@mui/icons-material/';


export default function ValueTags({tags}) {
    
     async function addLabel(e, key, value, isInverted = false) {
        e.preventDefault();
        e.stopPropagation();
        const { labels, apiUrl } = store.getState();
        const label = labels.find((label) => label.name === key);
        if (label) {
            const labelValue = label.values.find((tag) => tag.name === value);
            if (labelValue?.selected && labelValue.inverted === isInverted) {
                return;
            }
            if (labelValue) {
                labelValue.selected =
                    true || labelValue.inverted !== isInverted;
                labelValue.inverted = !labelValue.inverted && isInverted;
                label.selected = label.values.some((value) => value.selected);
                store.dispatch(setLabels(labels));
            } else {
                await store.dispatch(loadLabelValues(label, labels, apiUrl));
                const updatedLabels = store.getState().labels;
                const updatedLabel = updatedLabels.find(
                    (label) => label.name === key
                );
                const labelValue = updatedLabel.values.find(
                    (tag) => tag.name === value
                );
                labelValue.selected =
                    true || labelValue.inverted !== isInverted;
                labelValue.inverted = !labelValue.inverted && isInverted;
                updatedLabel.selected = updatedLabel.values.some(
                    (value) => value.selected
                );
                store.dispatch(setLabels(updatedLabels));
            }
            queryBuilderWithLabels();

            store.dispatch(loadLogs());
        }
    };


    return (
        <>
        {Object.entries(tags).map(([key, value], k) => (
            <div className={"value-tags"} key={k}>
                <span
                    aria-label="Filter for value"
                    title="Filter for value"
                    onClick={(e) => addLabel(e, key, value)}
                    className={"icon"}
                >
                    <ZoomIn color="primary" />
                </span>
                <span
                    aria-label="Filter out value"
                    title="Filter out value"
                    onClick={(e) => addLabel(e, key, value, true)}
                    className={"icon"}
                >
                    <ZoomOut color="primary" />
                </span>

                <span>{key}</span>
                <span>{value}</span>
            </div>
        ))}
        </>
    )
};