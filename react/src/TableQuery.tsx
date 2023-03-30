
import {useContext, useState } from "react";
import {Context} from "./context";

const TableQuery=()=>{

    const { setFlag }=useContext(Context); 

    return <button onClick={setFlag}>修改flag</button>
   
}
export default TableQuery;