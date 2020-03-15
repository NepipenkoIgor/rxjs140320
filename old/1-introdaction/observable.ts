class Observable<T> {
    private readonly _subscriber: any;

    constructor(subscriber?: any) {
        if (subscriber) {
            this._subscriber = subscriber;
        }
    }

    subscribe(next: (param: T) => void, error?: Function, complete?: Function) {
        return this._subscriber({
            next,
            error: error || (() => {
            }),
            complete: complete || (() => {
            }),
        })
    }
}

const sequence = new Observable((subscriber: any) => {
    let count = 1;
    const intervalId = setInterval(() => {
        subscriber.next(count++);
        if (count === 10) {
            subscriber.complete();
            clearInterval(intervalId);
        }
    }, 1000)
});

setTimeout(() => {
    sequence.subscribe((value) => {
        console.log('Subscribe 2', value)
    })
}, 5000)

sequence.subscribe((value) => {
    console.log('Subscribe 1', value)
})
