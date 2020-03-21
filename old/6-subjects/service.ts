import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";


class Service {
    private sequence$$ = new ReplaySubject(1);

    get data(): Observable<any> {
        // this.sequence$$.value;  For BehaviorSubject;
        return this.sequence$$.asObservable();
    }

    set send(value: any) {
        this.sequence$$.next(value);
    }

}

export const singleton = new Service();
