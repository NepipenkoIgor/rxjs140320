import { interval, Observable, Subscriber } from 'rxjs';

class SkipLimitSubscriber extends Subscriber<any> {
    private _interval: number = 1;
    private _count: number = 1;


    constructor(subscriber: Subscriber<any>, private _skip: number, private _limit: number) {
        super(subscriber);
    }

    next(value: number) {
        const borderLeft = this._interval * (this._skip + this._limit) - this._limit;
        const borderRight = borderLeft + this._limit;
        if (borderLeft < this._count && this._count <= borderRight) {
            super.next(value);
            this._count++;
            if (borderRight < this._count) {
                this._interval++;
            }
            return;
        }
        this._count++;
    }
}

function skipLimit(skip: number, limit: number) {
    return (source: Observable<any>) => {
        return source.lift({
            call(subscriber: Subscriber<any>, source: any) {
                source.subscribe(new SkipLimitSubscriber(subscriber, skip, limit))
            }
        });
    }
}


interval(1000)
    .pipe(
        //     // doNoThing,
        skipLimit(3, 4)
    )
    .subscribe((v) => {
        console.log(v);
    })
