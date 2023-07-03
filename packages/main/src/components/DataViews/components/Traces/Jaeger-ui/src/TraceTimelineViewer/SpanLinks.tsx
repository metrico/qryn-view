import { css } from "@emotion/css";
import React, { useState } from "react";


import { SpanLinks } from "../types/links";
import LinkIcon from "@mui/icons-material/Link";
import { Button, Menu, MenuItem } from "@mui/material";

interface SpanLinksProps {
    links: SpanLinks;
}

const renderMenuItems = (
    links: SpanLinks,
    styles: ReturnType<typeof css>,
    closeMenu: () => void
) => {
    let isLogsMenuOpen = false;
    return (
        <>
            {!!links.logLinks?.length ? (
                <>
                    <Button onClick={() => (isLogsMenuOpen = !isLogsMenuOpen)}>
                        Logs
                    </Button>
                    <Menu open={isLogsMenuOpen}>
                        {links.logLinks.map((link, i) => (
                            <MenuItem
                                key={i}
                                onClick={
                                    link.onClick
                                        ? (event) => {
                                              event?.preventDefault();
                                              link.onClick!(event);
                                              closeMenu();
                                          }
                                        : undefined
                                }
                                // url={link.href}
                                className={styles}
                            >
                                Logs for this span
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            ) : null}
            {!!links.metricLinks?.length ? (
                <>
                    <Button onClick={() => (isLogsMenuOpen = !isLogsMenuOpen)}>
                        Metrics
                    </Button>
                    <Menu open={isLogsMenuOpen}>
                        {links.metricLinks.map((link, i) => (
                            <MenuItem
                                key={i}
                                onClick={
                                    link.onClick
                                        ? (event) => {
                                              event?.preventDefault();
                                              link.onClick!(event);
                                              closeMenu();
                                          }
                                        : undefined
                                }
                                // url={link.href}
                                className={styles}
                            >
                                Metrics for this span
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            ) : null}
            {!!links.traceLinks?.length ? (
                <>
                    <Button onClick={() => (isLogsMenuOpen = !isLogsMenuOpen)}>
                        Traces
                    </Button>
                    <Menu open={isLogsMenuOpen}>
                        {links.traceLinks.map((link, i) => (
                            <MenuItem
                                key={i}
                                onClick={
                                    link.onClick
                                        ? (event) => {
                                              event?.preventDefault();
                                              link.onClick!(event);
                                              closeMenu();
                                          }
                                        : undefined
                                }
                                // url={link.href}
                                className={styles}
                            >
                                View linked span
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            ) : null}
        </>
    );
};
const button = css`
    background: transparent;
    border: none;
    padding: 0;
    margin: 0 3px 0 0;
`;
const menuItem = css`
    max-width: 60ch;
    overflow: hidden;
`;
export const SpanLinksMenu = ({ links }: SpanLinksProps) => {
    //   const styles = useStyles2(getStyles);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div data-testid="SpanLinksMenu">
            <Button
                onClick={(e) => {
                    setIsMenuOpen(true);
                    setMenuPosition({
                        x: e.pageX,
                        y: e.pageY,
                    });
                }}
                className={button}
            >
                <LinkIcon className={button} />
            </Button>

            {isMenuOpen ? (
                "test"
                // <ContextMenu
                //     onClose={() => setIsMenuOpen(false)}
                //     renderMenuItems={() =>
                //         renderMenuItems(links, menuItem, closeMenu)
                //     }
                //     focusOnOpen={true}
                //     x={menuPosition.x}
                //     y={menuPosition.y}
                // />
            ) : null}
        </div>
    );
};

export default SpanLinksMenu;
