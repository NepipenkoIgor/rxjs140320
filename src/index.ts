import { fromEvent, Observable } from "rxjs";
import {
    bufferCount,
    concatAll,
    debounce,
    debounceTime, distinctUntilChanged,
    exhaust, filter, last,
    map,
    mergeAll,
    mergeMap, pluck, reduce, scan,
    switchAll,
    switchMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { AjaxResponse } from "rxjs/internal/observable/dom/AjaxObservable";

interface IResult {
    name: string;
    description: string;
    owner: {
        avatar_url: string
    };
}

const inputElement = document.querySelector('input') as HTMLInputElement;
const container = document.querySelector('.container') as HTMLDivElement;
fromEvent<any>(inputElement, 'input')
    .pipe(
        debounceTime(300),
        pluck('target', 'value'),
        map((value: string) => value.trim()),
        filter((value: string) => value.length > 3),
        distinctUntilChanged(),
        switchMap((value: string) => {
            return request(ajax(`https://api.github.com/search/repositories?q=${value}`))
        }),
        // map((htmlStr: string) => htmlStr.trim().replace(/\s+(<)/g, '<'))
        // map....mergeAll = mergeMap
        // map....switchAll = switchMap
        // map....concatAll = concatMap
        // map....exhaust = exhaustMap
    )
    .subscribe((htmlStr: any) => {
        console.log('result')
        container.innerHTML = htmlStr;
    })

function request(source$: Observable<AjaxResponse>) {
    return source$
        .pipe(
            map<AjaxResponse, IResult[]>((res: AjaxResponse) => res.response.items as IResult[]),
            concatAll(),
            map((item: IResult) => createCard(item)),
            bufferCount(3),
            // scan((resultStr, htmlStr) => {
            //     return resultStr += createRow(htmlStr)
            // }, ''),
            // last(),
            reduce((resultStr, htmlStr) => {
                return resultStr += createRow(htmlStr)
            }, ''),
        )
}

export function createCard({name, description, owner: {avatar_url}}: IResult) {
    return `
    <div class="col-md-4">
        <div class="card">
           <img class="card-img-top" src=${avatar_url}  alt=${name}/>
           <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${description}</p>
           </div>
        </div>
    </div>
  `
}

export function createRow(htmlStr: string[]) {
    return `<div class="row">${htmlStr.join(' ')}</div>`
}
