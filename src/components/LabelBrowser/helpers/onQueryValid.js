export default function onQueryValid(query){
     return query !== "{" && query !== "}" && query !== "{}" && query !== ""; // TODO: make a proper query validation
}