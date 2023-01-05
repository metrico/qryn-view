import { PureComponent } from "react";
import { VectorTable } from "./VectorTable";
export class TableContainer extends PureComponent {
    constructor(props: any) {
        super(props);
        const { tableData } = props || [];
        this.state = {
            tableData: tableData || [],
        };
    }

    render() {
        return <VectorTable {...this.props} />;
    }
}
