import { fromEvent, Observable } from "rxjs";
import { concatAll, concatMap, map, takeUntil } from "rxjs/operators";

const draggableBox = document.querySelector('.draggable') as HTMLDivElement
const mousedown$ = fromEvent<MouseEvent>(draggableBox, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(draggableBox, 'mouseup');

function drag(source1$: Observable<MouseEvent>, source2$: Observable<MouseEvent>, source3$: Observable<MouseEvent>) {
    return source1$.pipe(
        concatMap((downEvent) => getPosition(downEvent, source2$, source3$))
    )
}

function getPosition(
    event: MouseEvent,
    source1$: Observable<MouseEvent>,
    source2: Observable<MouseEvent>
) {
    return source1$.pipe(
        map((moveEvent) => {
            moveEvent.preventDefault();
            return {
                left: moveEvent.clientX - event.offsetX,
                top: moveEvent.clientY - event.offsetY
            }
        }),
        takeUntil(source2)
    )
}

drag(mousedown$, mousemove$, mouseup$).subscribe((position) => {
    draggableBox.style.top = `${position.top}px`;
    draggableBox.style.left = `${position.left}px`;
})
