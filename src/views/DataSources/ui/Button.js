import { DsButtonStyled } from "../styles";



export const Button = (props) => {
    const { value, onClick, primary, title } = props;
    return (
        <DsButtonStyled title={title} onClick={onClick} primary={primary}>
            {value}
        </DsButtonStyled>
    );
};
