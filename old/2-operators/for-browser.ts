import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { from, fromEvent } from "rxjs";


// ajax('http://learn.javascript.ru/courses/groups/api/participants?key=1ntmifu')
//     .pipe(map((res) => res.response))
//     .subscribe((user) => {
//         console.log(user);
//     })
// from(fetch('http://learn.javascript.ru/courses/groups/api/participants?key=1ntmifu')
//     .then((res) => res.json()))
//     .subscribe((user) => {
//         console.log(user);
//     })

fromEvent<MouseEvent>(document, 'mousemove')
    .pipe(map((event) => event.clientX))
    .subscribe((x) => {
        console.log(x);
    })
