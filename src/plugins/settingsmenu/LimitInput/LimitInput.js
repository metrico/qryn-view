import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setQueryLimit } from "../../../actions";
import { DrawerInput,DrawerInputCont } from "../styled";

export default function LimitInput() {
    const dispatch = useDispatch();
    const queryLimit = useSelector((store) => store.limit);
    function handleChange(e) {
        const value = e.target.value;
        dispatch(setQueryLimit(value));
    }

    return (
        <DrawerInputCont>
            <label>{'LIMIT'}</label>
            <DrawerInput value={queryLimit} onChange={handleChange} />
        </DrawerInputCont>
    );
}

LimitInput.propTypes = {
    queryLimit: PropTypes.number,
};
