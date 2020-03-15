import { Observable, Subscriber } from 'rxjs'
import { pluck } from "rxjs/operators";

// const sequence = new Observable((subscriber: Subscriber<number>) => {
//     let count = 1;
//     const intervalId = setInterval(() => {
//         subscriber.next(count++);
//         if (count === 10) {
//             subscriber.complete();
//             clearInterval(intervalId);
//         }
//     }, 1000)
// });
//
// setTimeout(() => {
//     sequence.subscribe((value) => {
//         console.log('Subscribe 2', value)
//     })
// }, 5000)
//
// sequence.subscribe((value) => {
//     console.log('Subscribe 1', value)
// })

//конечный или нет
// горячий или нет


const socket: WebSocket = new WebSocket('wss://echo.websocket.org');
const source$ = new Observable((subscriber) => {
    socket.addEventListener('message', (e) => subscriber.next(e))
    // return () => {
    //     socket.close();
    // }
})

socket.addEventListener('open', () => {
    let count = 0;
    setInterval(() => {
        socket.send((count++).toString())
    }, 1000)
})

source$
    .pipe(pluck('data'))
    .subscribe((message) => {
        console.log('Subscribe 1 =>', message)
    })


setTimeout(() => {
    source$
        .pipe(pluck('data'))
        .subscribe((message) => {
            console.log('Subscribe 2 =>', message)
        })
}, 7000)
