export default function onQueryValid(query: any) {
    return (
        query &&
        query !== "{" &&
        query !== "}" &&
        query !== "{}" &&
        query !== "" &&
        query?.length >= 7
    ); // TODO: make a proper query validation
}
