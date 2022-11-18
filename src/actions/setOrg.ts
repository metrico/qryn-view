import { Dispatch } from "react";
type Org = string;
interface OrgDispatch {
    type: 'SET_ORG_ID';
    orgId: Org;
}
export const setOrg = (orgId: Org) => (dispatch: Dispatch<OrgDispatch>) => {
    dispatch({
        type: 'SET_ORG_ID',
        orgId
    })
}
