type THeightGetter = (index: number) => number;

export interface Positions {
    profileData(dataLength: number): void;
    calcHeights(
        max: number,
        heightGetter: THeightGetter,
        forcedLastI?: number
    ): void;
    calcYs(yValue: number, heightGetter: THeightGetter): void;
    confirmHeight(_i: number, heightGetter: THeightGetter): void;
    findFloorIndex(yValue: number, heightGetter: THeightGetter): number;
    getRowPosition(
        index: number,
        heightGetter: THeightGetter
    ): { height: number; y: number };
    getEstimatedHeight(): number;
}

function createPositions(bufferLen: number): Positions {
    let ys: number[] = [];
    let heights: number[] = [];
    let lastI = -1;
    let dataLen = -1;

    function profileData(dataLength: number) {
        if (dataLength !== dataLen) {
            dataLen = dataLength;
            ys.length = dataLength;
            heights.length = dataLength;
            if (lastI >= dataLength) {
                lastI = dataLength - 1;
            }
        }
    }

    function calcHeights(
        max: number,
        heightGetter: THeightGetter,
        forcedLastI?: number
    ) {
        if (forcedLastI != null) {
            lastI = forcedLastI;
        }
        let _max = max + bufferLen;
        if (_max <= lastI) {
            return;
        }
        if (_max >= heights.length) {
            _max = heights.length - 1;
        }
        let i = lastI;
        if (lastI === -1) {
            i = 0;
            ys[0] = 0;
        }
        while (i <= _max) {
            const h = (heights[i] = heightGetter(i));
            ys[i + 1] = ys[i] + h;
            i++;
        }
        lastI = _max;
    }

    function calcYs(yValue: number, heightGetter: THeightGetter) {
        while (
            (ys[lastI] == null || yValue > ys[lastI]) &&
            lastI < dataLen - 1
        ) {
            calcHeights(lastI, heightGetter);
        }
    }

    function confirmHeight(_i: number, heightGetter: THeightGetter) {
        let i = _i;
        if (i > lastI) {
            calcHeights(i, heightGetter);
            return;
        }
        const h = heightGetter(i);
        if (h === heights[i]) {
            return;
        }
        const chg = h - heights[i];
        heights[i] = h;
        // shift the y positions by `chg` for all known y positions
        while (++i <= lastI) {
            ys[i] += chg;
        }
        if (ys[lastI + 1] != null) {
            ys[lastI + 1] += chg;
        }
    }

    function findFloorIndex(
        yValue: number,
        heightGetter: THeightGetter
    ): number {
        calcYs(yValue, heightGetter);

        let imin = 0;
        let imax = lastI;

        if (ys.length < 2 || yValue < ys[1]) {
            return 0;
        }
        if (yValue > ys[imax]) {
            return imax;
        }
        let i;
        while (imin < imax) {
            i = (imin + 0.5 * (imax - imin)) | 0;
            if (yValue > ys[i]) {
                if (yValue <= ys[i + 1]) {
                    return i;
                }
                imin = i;
            } else if (yValue < ys[i]) {
                if (yValue >= ys[i - 1]) {
                    return i - 1;
                }
                imax = i;
            } else {
                return i;
            }
        }
        throw new Error(`unable to find floor index for y=${yValue}`);
    }

    function getRowPosition(
        index: number,
        heightGetter: THeightGetter
    ): { height: number; y: number } {
        confirmHeight(index, heightGetter);
        return {
            height: heights[index],
            y: ys[index],
        };
    }

    function getEstimatedHeight(): number {
        const known = ys[lastI] + heights[lastI];
        if (lastI >= dataLen - 1) {
            return known | 0;
        }
        return ((known / (lastI + 1)) * heights.length) | 0;
    }

    // Public API: methods accessible from outside the factory function
    return {
        profileData,
        calcHeights,
        calcYs,
        confirmHeight,
        findFloorIndex,
        getRowPosition,
        getEstimatedHeight,
    };
}

export default createPositions;
