import { useSelector } from "react-redux";
import { TracesButton } from "./styled";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getLinkedFieldTagsFileds } from "./helpers";
import {LinkButtonProps} from './types';

/**
 * 
 * @param param0 
 * @returns The button for opening traces at Panel
 */
export const LinkButtonWithTraces = ({
    dataSourceData,
    linkedFieldTags,
    buttonKey,
    value,
    openTraces,
}: LinkButtonProps) => {
    const dataSources = useSelector((store: any) => store.dataSources);

    if (dataSourceData?.linkedFields) {
        const { linkedFields } = dataSourceData;

        const fieldsFromParent = getLinkedFieldTagsFileds(linkedFieldTags);

        const fieldNames = fieldsFromParent?.map((m: any) => m.name);

        if (linkedFields?.length > 0) {
            const { dataSourceId, linkType, internalLink } = linkedFields[0];
            const currentDataSource = dataSources?.find(
                (f: any) => f.id === dataSourceId
            );
            const currentURL = currentDataSource?.url;

            if (
                fieldNames.includes(buttonKey) &&
                value &&
                internalLink === true
            ) {
                return (
                    <TracesButton
                        onClick={(e: any) => {
                            openTraces(
                                e,
                                buttonKey,
                                value,
                                dataSourceId,
                                currentURL,
                                linkType
                            );
                        }}
                    >
                        <OpenInNewIcon
                            style={{
                                width: "14px",
                                height: "14px",
                            }}
                        />
                        <span>{linkType}</span>
                    </TracesButton>
                );
            }
        }
    }

    return null;
};
