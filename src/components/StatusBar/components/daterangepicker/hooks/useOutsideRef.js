import React, {useEffect,useRef,useState} from "react"

export default function useOutsideRef(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState( initialIsVisible)
  const ref = useRef(null)
   
  const handleHideDateRange = (event) => {
      if(event.key === 'Escape') {
          setIsComponentVisible(false)
      }
  };
  const handleClickOutside = (event) => {
      if(ref.current && !ref.current.contains(event.target)) {
          setIsComponentVisible(false)
      }
  }
  useEffect(()=> {
      document.addEventListener("keydown", handleHideDateRange,true )
      document.addEventListener("click", handleClickOutside, true)

        return() => {
            // Unbind the event listener on clean up
            document.removeEventListener("keydown", handleHideDateRange,true)
            document.removeEventListener("click", handleClickOutside,true)
        }
   
    });
    return { ref, isComponentVisible, setIsComponentVisible};

   
}