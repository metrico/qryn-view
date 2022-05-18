import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useMemo } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useStyles2 } from "../../themes";
import { Button } from "../Button";
import { getPaginationStyles } from "../styles/pagination";


export const Pagination = ({
    currentPage,
    numberOfPages,
    onNavigate,
    hideWhenSinglePage,
    showSmallVersion,
}) => {
    const styles = useStyles2(getPaginationStyles);
    const pageLengthToCondense = showSmallVersion ? 1 : 8;

    const pageButtons = useMemo(() => {
        const pages = [...new Array(numberOfPages).keys()];

        const condensePages = numberOfPages > pageLengthToCondense;
        const getListItem = (page, variant) => (
            <li key={page} className={styles.item}>
                <Button
                    size="sm"
                    variant={variant}
                    onClick={() => onNavigate(page)}
                >
                    {page}
                </Button>
            </li>
        );

        const pagesEnum = (pageIndex) => {
            const lowerBoundIndex = pageLengthToCondense;
            const upperBoundIndex = numberOfPages - pageLengthToCondense + 1;
            const differenceOfBounds = upperBoundIndex - lowerBoundIndex;
            const page =  pageIndex + 1;
            const variant = page === currentPage ? "primary" : "secondary";
            const isFirstOrLastPage = page === 1 || page === numberOfPages;
            const currentPageIsBetweenBounds =
                differenceOfBounds > -1 &&
                currentPage >= lowerBoundIndex &&
                currentPage <= upperBoundIndex;

            const ellipsisOffset = showSmallVersion ? 1 : 3;
            const pageOffset = showSmallVersion ? 0 : 2;
            return {
                page,
                variant,
                lowerBoundIndex,
                upperBoundIndex,
                differenceOfBounds,
                isFirstOrLastPage,
                currentPageIsBetweenBounds,
                ellipsisOffset,
                pageOffset,
            };
        };

        return pages.reduce((pagesToRender, pageIndex) => {

            const {
                page,
                variant,
                lowerBoundIndex,
                upperBoundIndex,
                differenceOfBounds,
                isFirstOrLastPage,
                currentPageIsBetweenBounds,
                ellipsisOffset,
                pageOffset,
            } = pagesEnum(pageIndex);

            if (condensePages) {
                if (
                    isFirstOrLastPage ||
                    (currentPage < lowerBoundIndex && page < lowerBoundIndex) ||
                    (differenceOfBounds >= 0 &&
                        currentPage > upperBoundIndex &&
                        page > upperBoundIndex) ||
                    (differenceOfBounds < 0 &&
                        currentPage >= lowerBoundIndex &&
                        page > upperBoundIndex) ||
                    (currentPageIsBetweenBounds &&
                        page >= currentPage - pageOffset &&
                        page <= currentPage + pageOffset)
                ) {
                    pagesToRender.push(getListItem(page, variant));
                } else if (
                    (page === lowerBoundIndex &&
                        currentPage < lowerBoundIndex) ||
                    (page === upperBoundIndex &&
                        currentPage > upperBoundIndex) ||
                    (currentPageIsBetweenBounds &&
                        (page === currentPage - ellipsisOffset ||
                            page === currentPage + ellipsisOffset))
                ) {
                    pagesToRender.push(
                        <li key={page} className={styles.item}>
                            <MoreHorizIcon className={styles.ellipsis} />
                        </li>
                    );
                }
            } else {
                pagesToRender.push(getListItem(page, variant));
            }
            return pagesToRender;
        }, []);
    }, [
        currentPage,
        numberOfPages,
        onNavigate,
        pageLengthToCondense,
        showSmallVersion,
        styles.ellipsis,
        styles.item,
    ]);

    if (hideWhenSinglePage && numberOfPages <= 1) {
        return null;
    }

    return (
        <div className={styles.container}>
            <ol>
                <li className={styles.item}>
                    <Button
                        aria-label="previous"
                        size="sm"
                        variant="secondary"
                        onClick={() => onNavigate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeftIcon />
                    </Button>
                </li>
                {pageButtons}
                <li className={styles.item}>
                    <Button
                        aria-label="next"
                        size="sm"
                        variant="secondary"
                        onClick={() => onNavigate(currentPage + 1)}
                        disabled={currentPage === numberOfPages}
                    >
                        <ChevronRightIcon />
                    </Button>
                </li>
            </ol>
        </div>
    );
};


