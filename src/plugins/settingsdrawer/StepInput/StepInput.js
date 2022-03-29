import styled from "@emotion/styled"
import  PropTypes  from "prop-types"
import { useSelector,useDispatch } from "react-redux"
import { setQueryStep } from "../../../actions"
import { DrawerContainer, DrawerInput, DrawerInputCont } from "../styled"

export default function StepInput(){
const dispatch = useDispatch()
const queryStep = useSelector( store => store.step)
function handleChange(e){
const value = e.target.value
    dispatch(setQueryStep(value))
}

    return(
        <DrawerInputCont>
            <label>{'STEP'}</label>
        <DrawerInput value={queryStep} onChange={handleChange}/>
        </DrawerInputCont>

    )
}

StepInput.propTypes = {
    queryStep : PropTypes.number
}