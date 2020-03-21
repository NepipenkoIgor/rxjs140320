import { interval, of, zip } from "rxjs";
import { map } from "rxjs/operators";

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
        })
    )
    .subscribe((value) => {
        console.log(value);
    }, (err) => {
        console.log(err);
    }, () => {
        console.log('Completed')
    })
