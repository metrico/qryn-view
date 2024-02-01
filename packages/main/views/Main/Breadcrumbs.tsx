import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();

    const pathElements = location.pathname.split("/");

    const mappedLinks = pathElements.map((el: string, id: number) => {
        if (el === "" && id === 0) {
            return {
                name: "home",
                link: "",
            };
        }
        return {
            name: `/${el}`,
            link: el,
        };
    });

    return (
        <>
            {mappedLinks.map(({ name, link }, id) => (
                <a key={id} href={link} className="bread-link">
                    {name}
                </a>
            ))}
        </>
    );
};

export default Breadcrumbs