
import { useContext } from "react";
import {Context} from "./context";
import {data} from "./data"

const List=()=>{ 

    const { flag }=useContext(Context); 

    return (<div>{data(flag).map(item=>Object.values(item))}</div>)
}
export default List;