// Observable + Observer = Subject

import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";
import './component-1';
import './component-2';

// const sequence$$ = new ReplaySubject<string>(1);
//
// sequence$$.next('Hi');
// sequence$$.next('ALL');
//
//
// sequence$$.subscribe((v) => {
//     console.log(v);
// });
// sequence$$.next('RxJS');
// sequence$$.next('Awesome');
