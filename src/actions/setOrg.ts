import { Dispatch } from "react";
type Org = string;
interface OrgDispatch {
    type: 'SET_ORG_ID';
    org: Org;
}
export const setOrg = (org: Org) => (dispatch: Dispatch<OrgDispatch>) => {
    dispatch({
        type: 'SET_ORG_ID',
        org
    })
}
