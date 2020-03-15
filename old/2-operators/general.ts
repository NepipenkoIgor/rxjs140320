import { defer, from, generate, iif, of, range, timer } from "rxjs";

// of(1, 2, 3, 4)
//     .subscribe((value => {
//             console.log(value);
//         })
//     );

// from([1, 2, 3, 4])
//     .subscribe((value => {
//             console.log(value);
//         })
//     );

// range(1, 10)
//     .subscribe((value => {
//             console.log(value);
//         })
//     );

// timer(5000, 2000)
//     .subscribe((value => {
//             console.log(value);
//         })
//     );

// generate(1, (value) => value < 4,
//     (value) => value + 0.5)
//     .subscribe((value => {
//             console.log(value);
//         })
//     );

// const random = Math.round(Math.random() * 10);
// iif(() => {
//     return random > 5;
// }, of(`First, number  is ${random}`), of(`Second, number  is ${random}`))
//     .subscribe((value => {
//             console.log(value);
//         })
//     );

const random = Math.round(Math.random() * 10);
defer(() => {
    return random > 5
        ? random >= 8
            ? of(`First, number  is ${random}`)
            : of(`Third, number  is ${random}`)
        : of(`Second, number  is ${random}`)
})
    .subscribe((value => {
            console.log(value);
        })
    );


