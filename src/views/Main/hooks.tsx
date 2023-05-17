import { useMemo } from "react";
import { useCookies } from "react-cookie";
import DOMPurify from 'isomorphic-dompurify';
import {useSelector, useDispatch} from 'react-redux';
import { setCurrentUser } from "../User/actions";


// useCookiesAvailable:



export function useCookiesAvailable(urlParams: any) {

    const dispatch = useDispatch()
    let cookieAuth = "";
    let cookiesAvailable = false;

    const currentUser = useSelector((store:any) => store.currentUser)

    const hasCookie = useMemo(() => {
        return urlParams.has("cookie") || false;
    }, [urlParams]);

    const cookieParam = useMemo(() => {
        if (hasCookie) {
            return DOMPurify.sanitize(urlParams.get("cookie"));
        }
        return "";
    }, [urlParams, hasCookie]);
      // eslint-disable-next-line
    const [cookie, _] = useCookies([cookieParam]);
 // eslint-disable-next-line
    const [userCookie, __] = useCookies(['user-cookie'])

  

    let userCookieParsed = currentUser


    if(userCookie?.['user-cookie']) {
        try {
            userCookieParsed = atob(userCookie['user-cookie'])

        }catch(e){console.log("could not parse user cookie")}
        
    }

    

    if (cookie[cookieParam] && cookie[cookieParam] !== "") {
        cookieAuth = cookie[cookieParam];
        cookiesAvailable = true;
    }
    return { cookieAuth, cookiesAvailable, cookieUser: userCookieParsed };
}

// useUrlAvailable:

export function useUrlAvailable(urlParams: any) {
    const hasOneForAll = useMemo(() => {
        return urlParams.has("url");
    }, [urlParams]);

    const oneForAllParam = useMemo(() => {
        if (hasOneForAll) {
            return DOMPurify.sanitize(urlParams.get("url"));
        }
        return "";
    }, [urlParams, hasOneForAll]);

    return { url: oneForAllParam, urlAvailable: hasOneForAll };
}
