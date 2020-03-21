import { Observable, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { concatAll, map, shareReplay, switchMap, toArray } from "rxjs/operators";

class UserService {
    private uniqueNameSequence$!: Observable<any>;

    public getNames() {
        if (!this.uniqueNameSequence$) {
            this.uniqueNameSequence$ = timer(0, 1600000)
                .pipe(
                    switchMap(() => {
                        return ajax('http://learn.javascript.ru/courses/groups/api/participants?key=1ntmifu')
                            .pipe(
                                map((res) => res.response),
                                concatAll(),
                                map((user: any) => user.profileName),
                                toArray(), // ['srader', 'nik1']
                            )
                    }),
                    shareReplay()
                )
        }
        return this.uniqueNameSequence$;
    }


    // public getNames() {
    //     if (!this.uniqueNameSequence$) {
    //         this.uniqueNameSequence$ = ajax('http://learn.javascript.ru/courses/groups/api/participants?key=1ntmifu')
    //             .pipe(
    //                 map((res) => res.response),
    //                 concatAll(),
    //                 map((user: any) => user.profileName),
    //                 toArray(), // ['srader', 'nik1']
    //                 shareReplay()
    //             )
    //     }
    //     return this.uniqueNameSequence$;
    // }
}


export const userService = new UserService();
