import { useEffect } from "react";
import { useSelector } from "react-redux";
import boscoRequest from "./actions/helpers/boscoRequest";
import Main from "./views/Main";
interface storeProps {
    apiUrl:string;
}
export default function App() {
//    const url = useSelector((store:storeProps) => store.apiUrl)
//     useEffect(()=>{
//         console.log('making apiUrl request to',url)
//         boscoRequest('https://cdn.jsdelivr.net/gh/metrico/boscaiolog@main/boscaiolog.js',{url})
//     },[])


    return <Main />;
}
