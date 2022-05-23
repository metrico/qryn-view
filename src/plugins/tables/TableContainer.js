import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { config } from "app/core/config";

import { PANEL_BORDER } from "app/core/constants";

import { MetaInfoText } from "./MetaInfoText";

import { splitOpen } from "./state/main";

import { getFieldLinksForExplore } from "./utils/links";
import { Table } from "./Tables";



function mapStateToProps(state, { exploreId }) {
    const explore = state.explore;

    const item = explore[exploreId];
    const { loading: loadingInState, tableResult, range } = item;
    const loading =
        tableResult && tableResult.length > 0 ? false : loadingInState;
    return { loading, tableResult, range };
}

const mapDispatchToProps = {
    splitOpen,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

function getTableHeight(tableResult) {
    if (!tableResult || tableResult.length === 0) {
        return 200;
    }
    // estimate table height with row height * num of rows
    return Math.max(Math.min(600, tableResult.length * 35) + 35);
}

export class TableContainer extends PureComponent {
    render() {
        const {
            loading,
            onCellFilterAdded,
            tableResult,
            width,
            splitOpen,
            range,
            ariaLabel,
            timeZone,
        } = this.props;

        const height = getTableHeight(tableResult);

        const tableWidth = width - config.theme.panelPadding * 2 - PANEL_BORDER;

        let dataFrame = tableResult;

        for (const field of dataFrame.fields) {
            field.getLinks = (config) => {
                return getFieldLinksForExplore({
                    field,
                    rowIndex: config.valueRowIndex,
                    splitOpenFn: splitOpen,
                    range,
                    dataFrame: dataFrame,
                });
            };
        }

        return (
            <div title="Table">
                {dataFrame?.length ? (
                    <Table
                        ariaLabel={ariaLabel}
                        data={dataFrame}
                        width={tableWidth}
                        height={height}
                        onCellFilterAdded={onCellFilterAdded}
                    />
                ) : (
                    <MetaInfoText
                        metaItems={[{ value: "0 series returned" }]}
                    />
                )}
            </div>
        );
    }
}

export default connector(TableContainer);
