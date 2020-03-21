import { TestScheduler } from "rxjs/testing";
import { getX, swipe } from "./swipe";

function createTouchEvent(clientX: number) {
    return new TouchEvent('event', {
        changedTouches: [new Touch({clientX, identifier: 1, target: new EventTarget()})]
    })
}

describe('Swipe 1', () => {
    let testScheduler: TestScheduler
    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })


    it('getX should transform right', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const touch1$ = hot('-a--b----c--|', {
                a: createTouchEvent(10),
                b: createTouchEvent(20),
                c: createTouchEvent(1)
            });
            const touch2$ = hot('------e-----|', {
                e: createTouchEvent(333),
            })
            const sequence2 = '            -a--b-e--c--|';
            expectObservable(getX(touch1$, touch2$)).toBe(sequence2, {
                a: 10,
                b: 20,
                c: 1,
                e: 333
            })
        })
    })
    it('swipe should transform right', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const touch1$ = hot('-a-----------|', {
                a: createTouchEvent(10),
            });
            const touch11$ = hot('------b------|', {
                b: createTouchEvent(20),
                // -a----b------|
            });
            const touch2$ = hot('---a---------|', {
                a: createTouchEvent(2),
            });
            const touch22$ = hot('---------b---|', {
                b: createTouchEvent(30),
            });
            const expected$ = '            ---a-----b---|';
            expectObservable(swipe(
                getX(touch1$, touch11$),
                getX(touch2$, touch22$)
            )).toBe(expected$, {
                a: 8,
                b: -10,
            })
        })
    })
})
