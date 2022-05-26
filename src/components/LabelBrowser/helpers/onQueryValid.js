export default function onQueryValid(query) {
    return (
        query &&
        query !== "{" &&
        query !== "}" &&
        query !== "{}" &&
        query !== "" &&
        query?.length >= 7
    ); // TODO: make a proper query validation
}
