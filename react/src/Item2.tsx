import React from 'react';  

interface props{

}
interface state{

}
class Item2 extends React.Component<state,props>{
  constructor(props:props){
    super(props)
  }

  render(){
    return (<div className="item1"> 
        我是Item2 class模块
      </div>
    )
  }

}

export default Item2;
