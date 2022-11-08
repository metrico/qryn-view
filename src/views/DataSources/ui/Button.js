import { DsButtonStyled } from "../styles";



export const Button = (props) => {
    const { value, onClick, editing, primary } = props;
    return (
        <DsButtonStyled onClick={onClick} editing={editing} primary={primary}>
            {value}
        </DsButtonStyled>
    );
};
