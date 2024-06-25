import { css } from "@emotion/css";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import { Button } from "@mui/material";



const button = css`
    background: transparent;
    border: none;
    padding: 0;
    margin: 0 3px 0 0;
`;

export const SpanLinksMenu = () => {
    //   const styles = useStyles2(getStyles);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div data-testid="SpanLinksMenu">
            <Button
                onClick={() => {
                    setIsMenuOpen(true);
                }}
                className={button}
            >
                <LinkIcon className={button} />
            </Button>

            {isMenuOpen ? "test" : null}
        </div>
    );
};

export default SpanLinksMenu;
