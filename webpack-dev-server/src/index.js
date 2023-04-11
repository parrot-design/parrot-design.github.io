import name from "./name";
import renderInput from "./input";

const render = () => { 
  console.log("==render==>")
  const rootDom = document.getElementById("root");
  rootDom.innerText = name;
};

render();
renderInput();

//要实现热更新，这段代码并不可少，描述当模块被更新后做什么 
if (module.hot) {
  module.hot.accept("./name", function () {
    console.log("name模块发生变化，处理热更新逻辑");
    render();
  });
}
 