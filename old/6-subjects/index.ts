// Observable + Observer = Subject

import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from "rxjs";
// import './component-1';
// import './component-2';

const sequence$$ = new AsyncSubject<string>();

sequence$$.next('Hi');
sequence$$.next('ALL');


sequence$$.subscribe((v) => {
    console.log(v);
});
sequence$$.next('RxJS');
sequence$$.next('Awesome');
