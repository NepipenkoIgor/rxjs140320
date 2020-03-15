import { Observable, fromEvent, combineLatest } from "rxjs";
import { map, startWith, tap, withLatestFrom } from "rxjs/operators";

const quality$ = getValue(fromEvent($('#quality').slider(), 'change'), 5, redrawSlider)
const rating$ = getValue(fromEvent($('#rating').slider(), 'change'), 5, redrawSlider)
const actual$ = getValue(fromEvent($('#actual').slider(), 'change'), 5, redrawSlider)

const sliderSequence$ = combineLatest([quality$, rating$, actual$])
    .pipe(map(([quality, rating, actual]) => {
        return Math.round((quality + rating + actual) / 3 / 10 * 100);
    }))

fromEvent(document.querySelector('#send-result') as HTMLButtonElement, 'click')
    .pipe(withLatestFrom(sliderSequence$))
    .subscribe(([, value]) => {
        console.log(value);
    })

export function getValue(source$: Observable<any>, initialValue = 5, sideCb: any): Observable<any> {
    return source$
        .pipe(
            map(({delegateTarget: {previousElementSibling}, value: {newValue}}: any) => {
                return {
                    value: newValue,
                    element: previousElementSibling
                }
            }),
            tap(sideCb),
            map(({value}: any) => {
                return value;
            }),
            startWith(initialValue)
        )
}

export function redrawSlider({element, value}: any) {
    const sliderTrack = element.querySelector('.slider-track');
    const percentage = value / 10 * 100;
    sliderTrack.classList.remove('bad', 'good', 'warn');
    if (percentage < 40) {
        sliderTrack.classList.add('bad')
        return
    }
    if (percentage >= 40 && percentage <= 70) {
        sliderTrack.classList.add('warn');
        return
    }
    sliderTrack.classList.add('good');
}
