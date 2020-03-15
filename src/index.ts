import { fromEvent } from "rxjs";
import {
    concatAll,
    debounce,
    debounceTime, distinctUntilChanged,
    exhaust, filter,
    map,
    mergeAll,
    mergeMap, pluck,
    switchAll,
    switchMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { AjaxResponse } from "rxjs/internal/observable/dom/AjaxObservable";

const inputElement = document.querySelector('input') as HTMLInputElement;
fromEvent<any>(inputElement, 'input')
    .pipe(
        debounceTime(300),
        pluck('target', 'value'),
        map((value: string) => value.trim()),
        filter((value: string) => value.length > 3),
        distinctUntilChanged(),
        switchMap((value: string) => {
            return ajax(`https://api.github.com/search/repositories?q=${value}`)
        }),
        map((res: AjaxResponse) => res.response.items),
        // map....mergeAll = mergeMap
        // map....switchAll = switchMap
        // map....concatAll = concatMap
        // map....exhaust = exhaustMap
    )
    .subscribe((items) => {
        console.log(items);
    })
