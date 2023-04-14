const events = require('events');

const eventEmitter=new events.EventEmitter();

eventEmitter.on("notice",()=>{
    console.log("notice1被触发了");
});
eventEmitter.on("notice",()=>{
    console.log("notice2被触发了");
});
eventEmitter.on("notice",()=>{
    console.log("notice3被触发了");
});

setTimeout(()=>{
    eventEmitter.emit("notice")
},2000);
