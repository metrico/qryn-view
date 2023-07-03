export default function onQueryValid(query: any) {
    return (
        query &&
        query !== "{" &&
        query !== "}" 
    ); // TODO: make a proper query validation
}
