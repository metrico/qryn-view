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

export const SmallInput = styled.input`
    background: ${({ theme }: any) => theme.deep};
    color: ${({ theme }: any) => theme.contrast};
    font-size: 10px;
    border: 1px solid ${({ theme }: any) => theme.accentNeutral};
    border-radius: 3px;
    outline: none;
`;
