import Logo from "../assets/qryn-logo.png";
export type Props = {
    height?: string;
};
export const QrynLogo = (props: Props) => {
    const { height } = props;
    return (
        <img
            src={Logo}
            alt={"qryyn View"}
            height={height || "24px"}
            className={"logo"}
        />
    );
};
