import { UrlCopyButton } from "../../styled/index";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import setIsEmbed from "../../../../actions/setIsEmbed";

export default function EmbedLinkButton() {
    const dispatch = useDispatch();

    const query = useSelector((store) => store.query);

    const setTitle =  query.length > 0
            ? "Embed Link"
            : "Please add a query for embedding link";

          function  handleEmbedLink() {
              dispatch(setIsEmbed(true))
          }

    return (
        <>
            <Tooltip title={setTitle}>
                <UrlCopyButton 
                onClick={handleEmbedLink}
                isActive={true}>
                    <AttachmentIcon />
                    <span>Embed Link</span>
                </UrlCopyButton>
            </Tooltip>
        </>
    );
}
