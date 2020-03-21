// import { defer, interval } from "rxjs";
// import { animationFrame } from "rxjs/internal/scheduler/animationFrame";
// import { map, takeWhile, tap } from "rxjs/operators";
//
// const d = document.querySelector('div') as HTMLDivElement;
//
// // interval(0, animationFrame)
// //     .subscribe((v) => {
// //         d.style.transform = `translate3d(0,${v}px,0)`
// //     })
//
//
// function animation(schedule = animationFrame) {
//     return defer(() => {
//         const start = schedule.now();
//         return interval(0, schedule)
//             .pipe(map(() => schedule.now() - start))
//     })
// }
//
//
// function duration(ms: number, schedule = animationFrame) {
//     return animation(schedule)
//         .pipe(
//             map((time) => {
//                 return time / ms;
//             }),
//             takeWhile((percentage) => percentage <= 1)
//         )
// }
//
// function distance(px: number) {
//     return (percentage: number) => percentage * px
// }
//
// function animationFn(percentage: number) {
//     return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * Math.pow(2, -10 * percentage) + 1;
// }
//
// function animateDown(element: HTMLElement, time: number, px: number) {
//     return duration(time)
//         .pipe(
//             map(animationFn),
//             map(distance(px)),
//             tap((percentage) => {
//                 element.style.transform = `translate3d(0,${percentage}px,0)`
//             })
//         )
// }
//
// animateDown(d, 10000, 200)
//     .subscribe((v) => {
//     }, () => {
//     }, () => {
//         console.log('animation completed')
//     });
