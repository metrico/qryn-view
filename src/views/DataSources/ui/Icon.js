import metrics_icon from "../assets/metrics_icon.png";
import logs_icon from "../assets/logs_icon.png";
import traces_icon from "../assets/traces_icon.png";

const Icons = {
    metrics_icon,
    logs_icon,
    traces_icon,
};

export const Icon = ({ icon }) => {
    return (
        <img
            height="40px"
            className="logo"
            src={Icons[icon] || logs_icon}
            alt={icon}
        />
    );
};
