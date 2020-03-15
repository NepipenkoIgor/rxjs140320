// const sequence = new Promise((res) => {
//     let count = 1;
//     setInterval(()=>{
//         res(count++)
//     }, 1000)
// })
//
// sequence.then((v)=> console.log(v));
// sequence.then((v)=> console.log(v));

// const sequence = function* iteratorFn() {
//     let item = 1;
//     while (true) {
//         yield item++;
//     }
// }();
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);

import { interval } from "rxjs";

interval(1000)
    .subscribe((item) => {
        console.log(item);
    });
