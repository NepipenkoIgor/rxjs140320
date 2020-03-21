import { singleton } from "./service";


setTimeout(()=>{
    console.log('INIT COMPONENT')
    singleton.data
        .subscribe((v) => {
        console.log('Component 1', v)
    })
}, 7000)
