import { combineLatest, from, of, Subject } from "rxjs";
import { async } from "rxjs/internal/scheduler/async";
import { map, observeOn, subscribeOn, take, tap } from "rxjs/operators";
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
// console.log('start')
// queue
// asap => microtask
// async => macrotask
// animationFrame
// of(1, 2, 4,3,  5, 6, async )
//     .subscribe((v) => {
//         console.log(v)
//     })
// console.log('end')

// const a$ = from([1, 2], async);
// const b$ = of(10);
//
// const c$ = combineLatest([a$, b$])
//     .pipe(
//         map(([v1, v2]) => v1 + v2)
//     )
//
// c$.subscribe((v) => {
//     console.log(v);
// })


const subject = new Subject<number>();
let count = 1;
const calculation = (count: number) => console.log('do some count ', count);

subject
    .pipe(
        observeOn(queue),
        take(1600),
        tap(() => {
        })
    )
    .subscribe((v: number) => {
        calculation(v);
        subject.next(count++);
    });
subject.next(count++);
