import { PureComponent } from "react";
import { VectorTable } from "./VectorTable";
export class TableContainer extends PureComponent {
    constructor(props) {
        super(props);
        const { tableData } = props || [];
        this.state = {
            tableData,
        };
    }

    render() {
        return <VectorTable columnsData={this.tableData} />;
    }
}
