import { DsButtonStyled } from "../styles";



export const Button = (props) => {
    const { value, onClick, primary } = props;
    return (
        <DsButtonStyled onClick={onClick} primary={primary}>
            {value}
        </DsButtonStyled>
    );
};
