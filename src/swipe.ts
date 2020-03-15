import { Observable, fromEvent, merge, zip } from "rxjs";
import { map } from "rxjs/operators";


const start$ = getX(
    fromEvent<TouchEvent>(document, 'touchstart'),
    fromEvent<MouseEvent>(document, 'mousedown')
);

const end$ = getX(
    fromEvent<TouchEvent>(document, 'touchend'),
    fromEvent<MouseEvent>(document, 'mouseup')
);

export const swipe$ = swipe(start$, end$);


export function getX(
    source1$: Observable<TouchEvent | MouseEvent>,
    source2$: Observable<TouchEvent | MouseEvent>,
): Observable<number> {
    return merge(source1$, source2$)
        .pipe(map((event: TouchEvent | MouseEvent) => {
                if (event instanceof TouchEvent) {
                    return event.changedTouches[0].clientX;
                }
                return event.clientX;
            })
        )
}

export function swipe(source1$: Observable<number>, source2$: Observable<number>): Observable<number> {
    return zip(source1$, source2$)
        .pipe(
            map(([startX, endX]) => {
                return startX - endX;
            })
        )

}
