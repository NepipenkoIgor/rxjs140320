import { interval, of, zip } from "rxjs";
import { catchError, delay, map, retry, retryWhen, tap } from "rxjs/operators";

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');
const sequence = zip(sequence1$, sequence2$);

sequence
    .pipe(
        map(([_x, y]: any) => {
            return y.toUpperCase();
            // try{
            //
            // } catch (err) {
            //     console.log(err);
            //     return  'N'
            // }
        }),
        // retry(3),
        retryWhen((obs) => obs.pipe(delay(3000))),
        // catchError((err, obs) => {
        //     console.log(err);
        //     return of('N')
        // }),
        // tap((v)=>{
        //    console.log('IN TAP', v);
        // })
    )
    .subscribe((value) => {
        console.log(value);
    }, (err) => {
        console.log('ERROR 1 =>', err);
    }, () => {
        console.log('Completed')
    })
