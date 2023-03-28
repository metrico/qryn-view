import React from "react";
import ReactJson from "react-json-view";

const QueryTest: React.FC = (props: any) => {
    return (
        <>
            <ReactJson src={props} />
        </>
    );
};

export default QueryTest;
