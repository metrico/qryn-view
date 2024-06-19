import { DsButtonStyled } from "../styles";



export const Button = (props: any) => {
    const { value, onClick, primary, title, disabled } = props;
    return (
        <DsButtonStyled disabled={disabled} title={title} onClick={onClick} primary={primary}>
            {value}
        </DsButtonStyled>
    );
};
