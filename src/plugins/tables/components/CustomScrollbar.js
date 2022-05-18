import classNames from "classnames";
import { isNil } from "lodash";
import React, { useCallback, useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";

import { useStyles2 } from "../../themes";
import { getScrollbarStyles } from "../styles/scrollbar";

/**
 * Wraps component into <Scrollbars> component from `react-custom-scrollbars`
 */
export const CustomScrollbar = ({
    autoHide = false,
    autoHideTimeout = 200,
    setScrollTop,
    className,
    testId,
    autoHeightMin = "0",
    autoHeightMax = "100%",
    hideTracksWhenNotNeeded = false,
    hideHorizontalTrack,
    hideVerticalTrack,
    scrollRefCallback,
    updateAfterMountMs,
    scrollTop,
    children,
}) => {
    const ref = (useRef < Scrollbars) & ({ view: HTMLDivElement } > null);
    useEffect(() => {
        if (ref.current) {
            scrollRefCallback?.(ref.current.view);
        }
    }, [ref, scrollRefCallback]);
    const styles = useStyles2(getScrollbarStyles);

    const updateScroll = () => {
        if (ref.current && !isNil(scrollTop)) {
            ref.current.scrollTop(scrollTop);
        }
    };

    useEffect(() => {
        updateScroll();
    });

    useEffect(() => {
        if (!updateAfterMountMs) {
            return;
        }
        setTimeout(() => {
            const scrollbar = ref.current;
            if (scrollbar?.update) {
                scrollbar.update();
            }
        }, updateAfterMountMs);
    }, [updateAfterMountMs]);

    function renderTrack(className, hideTrack, passedProps) {
        if (passedProps.style && hideTrack) {
            passedProps.style.display = "none";
        }

        return <div {...passedProps} className={className} />;
    }

    const renderTrackHorizontal = useCallback(
        (passedProps) => {
            return renderTrack(
                "track-horizontal",
                hideHorizontalTrack,
                passedProps
            );
        },
        [hideHorizontalTrack]
    );

    const renderTrackVertical = useCallback(
        (passedProps) => {
            return renderTrack(
                "track-vertical",
                hideVerticalTrack,
                passedProps
            );
        },
        [hideVerticalTrack]
    );

    const renderThumbHorizontal = useCallback((passedProps) => {
        return <div {...passedProps} className="thumb-horizontal" />;
    }, []);

    const renderThumbVertical = useCallback((passedProps) => {
        return <div {...passedProps} className="thumb-vertical" />;
    }, []);

    const renderView = useCallback((passedProps) => {
        return <div {...passedProps} className="scrollbar-view" />;
    }, []);

    const onScrollStop = useCallback(() => {
        ref.current && setScrollTop && setScrollTop(ref.current.getValues());
    }, [setScrollTop]);

    return (
        <Scrollbars
            data-testid={testId}
            ref={ref}
            className={classNames(styles.customScrollbar, className)}
            onScrollStop={onScrollStop}
            autoHeight={true}
            autoHide={autoHide}
            autoHideTimeout={autoHideTimeout}
            hideTracksWhenNotNeeded={hideTracksWhenNotNeeded}
            autoHeightMax={autoHeightMax}
            autoHeightMin={autoHeightMin}
            renderTrackHorizontal={renderTrackHorizontal}
            renderTrackVertical={renderTrackVertical}
            renderThumbHorizontal={renderThumbHorizontal}
            renderThumbVertical={renderThumbVertical}
            renderView={renderView}
        >
            {children}
        </Scrollbars>
    );
};

export default CustomScrollbar;
