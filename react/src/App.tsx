import React, { useCallback, useState } from "react"; 
import TableQuery from "./TableQuery";
import List from "./List";
import { Context } from "./context";

function App() {
  const [flag, setFlag] = useState(false); 

  const setFlagApp=useCallback(()=>setFlag(!flag),[flag,setFlag])

  return (
    <Context.Provider value={{ flag,setFlag:setFlagApp }}>
      <div className="App"> 
        <TableQuery />
        <List />
      </div>
    </Context.Provider>
  );
}/*  */

export default App;
