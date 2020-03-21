import { combineLatest, EMPTY, fromEvent, of } from "rxjs";
import { debounceTime, map, pluck, switchMap, withLatestFrom,  } from "rxjs/operators";
import { userService } from "./user.service";

export class CreateForm {
    private input: HTMLInputElement;
    private saveButton: HTMLButtonElement;

    constructor(public formContainer: HTMLFormElement) {
        this.input = formContainer.querySelector('input') as HTMLInputElement;
        this.saveButton = formContainer.querySelector('button') as HTMLButtonElement;
        const inputValue$ = fromEvent<any>(this.input, 'input').pipe(pluck('target', 'value'));
        const valueSequence$ = combineLatest([inputValue$, userService.getNames()])
            .pipe(
                debounceTime(300),
                switchMap(([value, names]) => {
                    console.log(value, names)
                    const isNotValid = !!names.find((name: any) => name === value)
                    if (isNotValid) {
                        this.input.classList.add('error');
                        this.saveButton.disabled = true;
                        return EMPTY;
                    }
                    this.input.classList.remove('error');
                    this.saveButton.disabled = false;
                    return of(value)
                })
            )

        fromEvent(this.saveButton, 'click')
            .pipe(
                withLatestFrom(valueSequence$),
                map(([, value]) => value)
            ).subscribe((v) => {
            console.log(v);
        })
    }
}
