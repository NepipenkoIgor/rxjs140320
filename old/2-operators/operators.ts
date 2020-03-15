import { interval } from "rxjs";
import { filter, map, skip, take, tap } from "rxjs/operators";

// const interval$ = interval(1000);
//
// /*
//   sequence1$: ---0---1---2---3---4---
//       map((x)=> x ** 2)
//   sequence1$: ---0---1---4---9---16---
//  */
//
// interval$
//     .pipe(
//         map((x) => x ** 2)
//     )
//     .subscribe((v) => {
//         console.log(v);
//     })
//
// const interval$ = interval(1000);
//
// /*
//   sequence1$: ---0---1---2---3---4---
//       tap((x)=> x ** 2)
//               ---0---1---2---3---4---
//       map((x)=> x ** 2)
//   sequence1$: ---0---1---4---9---16---
//  */
//
// interval$
//     .pipe(
//         tap((x) => x ** 2),
//         map((x) => x ** 2)
//     )
//     .subscribe((v) => {
//         console.log(v);
//     })


const interval$ = interval(1000);

/*
  sequence1$: ---0---1---2---3---4---
      tap((x)=> x ** 2)
              ---0---1---2---3---4---
      filter((x)=> x % 2 === 0)
              ---0-------2-------4---
      skip(2)
              -------------------4---
      take(1)
              -------------------4|
 */

interval$
    .pipe(
        tap((x) => x ** 2),
        filter((x) => x % 2 === 0),
        skip(2),
        take(1)
    )
    .subscribe((v) => {
        console.log(v);
    }, () => {
    }, () => {
        console.log('complete');
    });
