import { createContext } from 'react';

interface FlagProps{
    flag:boolean,
    setFlag?:()=>void
}
export const Context=createContext<FlagProps>({
    flag:false, 
});