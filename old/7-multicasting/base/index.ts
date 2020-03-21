import { BehaviorSubject, ConnectableObservable, interval, of, ReplaySubject, Subject } from "rxjs";
import { multicast, publish, publishReplay, refCount, share, shareReplay } from "rxjs/operators";
// const subject$$ = new ReplaySubject(1);
const sequence$ = interval(1000)
    .pipe(
        // multicast(subject$$)
        // publishReplay(1),
        // refCount()
        shareReplay({bufferSize: 1, refCount: true})
    );

const sub1 = sequence$.subscribe((v) => {
    console.log('SUB 1', v);
})


setTimeout(() => {
    const sub2 = sequence$.subscribe((v) => {
        console.log('SUB 2', v);
    })
    setTimeout(() => {
        sub1.unsubscribe();
        sub2.unsubscribe();
        setTimeout(() => {
            const sub3 = sequence$.subscribe((v) => {
                console.log('SUB 3', v);
            });
        }, 1000)

    }, 5000)
}, 5000)
