import { createContext,useContext,useState,useEffect } from "react";

const GlobalContext=createContext();
export const useGlobalContext=()=>useContext(GlobalContext);


const GlobalProvider=({children})=>{
   const [isLoggedIn, setisLoggedIn] = useState(false)
   
   
    return(
        <GlobalContext.Provider
        value={{

        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}