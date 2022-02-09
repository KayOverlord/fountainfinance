import { createContext } from "react"


const context = createContext("");


export const MainContaxtProvider=({children})=>{

return(
<context.Provider value={""}>
    {children}
</context.Provider>
)}