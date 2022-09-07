import styled from "@emotion/styled";

import { CircularProgress } from "@mui/material";
export const LoaderCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height: 100%;
`;

export const Loader = styled(CircularProgress)`
    width: 30px;
    height: 30px;
`;
