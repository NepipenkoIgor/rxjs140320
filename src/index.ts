import fs from 'fs';
import { bindNodeCallback } from "rxjs";
import { buffer, map } from "rxjs/operators";

// console.log(`${__dirname}/text`);
// fs.readFile(`${__dirname}/text`, (err, buffer) => {
//     console.log(buffer.toString())
// })

const readFile = bindNodeCallback(fs.readFile);
readFile(`${__dirname}/text`)
    .pipe(
        map((buffer) => {
            const str = buffer.toString();
            const regExp = />([^<]+)</;
            const matches = regExp.exec(str);
            return matches && matches[1];
        })
    )
    .subscribe((v) => {
        console.log(v);
    })
