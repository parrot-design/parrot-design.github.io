let demo=[
    {
        id:1,
        children:[
            {
                id:11,
                children:[
                    {
                        id:15
                    }
                ]
            }
        ]
    }
];

const TreeToArr=(treeData,node)=>{
    let res;
    let newArr=[].concat(treeData);

    while(newArr.length){
        let first=newArr.shift();
        if(first['children']){
            newArr=newArr.concat(first['children'])
        } 
        if(first.id==node){
            return first;
        }
    }
    return res;
}

TreeToArr(demo,1);