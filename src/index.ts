// Observable + Observer = Subject

import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { ajax } from "rxjs/ajax";
// import './component-1';
// import './component-2';

// const sequence$$ = new AsyncSubject<string>();
//
// sequence$$.next('Hi');
// sequence$$.next('ALL');


// sequence$$.subscribe((v) => {
//     console.log(v);
// });
// sequence$$.next('RxJS');
// sequence$$.next('Awesome');
//
// setTimeout(()=>{
//     console.log('NEED COMPLETE')
//     sequence$$.complete();
//
//     setTimeout(()=>{
//         sequence$$.subscribe((v) => {
//             console.log('AFTER COMPETE', v);
//         });
//     }, 5000)
// }, 5000)
// http://learn.javascript.ru/courses/groups/api/participants?key=1ntmifu


// function getUsers(url: string) {
//     let subject: AsyncSubject<any>;
//     return new Observable((subscriber) => {
//         if (!subject) {
//             subject = new AsyncSubject()
//             ajax(url).subscribe(subject)
//         }
//         return subject.subscribe(subscriber)
//     })
// }
//
// const user = getUsers('http://learn.javascript.ru/courses/groups/api/participants?key=1ntmifu')
//
// user.subscribe((u) => {
//     console.log(u);
// })
//
// setTimeout(() => {
//     user.subscribe((u) => {
//         console.log(u);
//     })
// }, 7000)


const sequence$ = new Subject();
sequence$.subscribe((v)=>{
    console.log(v)
})

sequence$.next(1);
sequence$.next(1);
