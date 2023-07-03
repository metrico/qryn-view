import { DsButtonStyled } from "../styles";



export const Button = (props: any) => {
    const { value, onClick, primary, title } = props;
    return (
        <DsButtonStyled title={title} onClick={onClick} primary={primary}>
            {value}
        </DsButtonStyled>
    );
};
