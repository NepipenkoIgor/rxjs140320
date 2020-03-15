import { interval, Observable, pipe, Subscriber } from 'rxjs';
import { TeardownLogic } from "rxjs/src/internal/types";
import { filter } from "rxjs/operators";

function doNoThing<T>(source: Observable<T>) {
    return source;
}


function toText<T>(source: Observable<T>) {
    return new Observable((subscriber) => {
        subscriber.next('RxJS is awesome')
        subscriber.complete();
    });
}

// function double(source: Observable<number>) {
//     return new Observable((subscriber) => {
//         source.subscribe({
//             next(value){
//                 subscriber.next(value * 2)
//             }
//         })
//     });
// }

class DoubleSubscriber extends Subscriber<number> {
    next(value: number) {
        super.next(value * 2);
    }
}

// function double(source1: Observable<number>) {
//     const o$ = new Observable();
//     o$.source = source1;
//     o$.operator = {
//         call(subscriber: Subscriber<number>, source: any) {
//             source.subscribe(new DoubleSubscriber(subscriber))
//         }
//     }
//     return o$;
// }

function double(source1: Observable<number>) {
    return source1.lift({
        call(subscriber: Subscriber<number>, source: any) {
            source.subscribe(new DoubleSubscriber(subscriber))
        }
    });
}

const shortChain = pipe(double, filter((v) => v % 3 === 0))

interval(1000)
    .pipe(
        // doNoThing,
        shortChain
    )
    .subscribe((v) => {
        console.log(v);
    }, () => {
    }, () => {
        console.log('complete')
    })
