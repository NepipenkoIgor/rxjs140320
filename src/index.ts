import { EMPTY, interval, of, zip } from "rxjs";
import { catchError, delay, map, retry, switchAll, switchMap, tap } from "rxjs/operators";

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');
const sequence = zip(sequence1$, sequence2$);

sequence
    .pipe(
        switchMap(([_x, y]: any) => {
            return transform(y);
        }),

    )
    .subscribe((value) => {
        console.log(value);
    }, (err) => {
        console.log('ERROR 1 =>', err);
    }, () => {
        console.log('Completed')
    })


function transform(value) {
    return of(value).pipe(
        map(() => {
            return y.toUpperCase();
        }),
        catchError((err) => {
            console.log(err);
            return
        }),
    )
}
