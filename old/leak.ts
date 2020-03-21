import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

interface OnDestroy {
    ngOnDestroy(): void;
}

class Unsubscriber implements OnDestroy {
    protected unsubscribeSequence$$: Subject<boolean> = new  Subject<boolean>();

    ngOnDestroy() {
        this.unsubscribeSequence$$.next(true);
        this.unsubscribeSequence$$.complete();
    }
}


class Products extends Unsubscriber {
    ngOnInit() {
        this.store.slect('products')
            .pipe(
                takeUntil(this.unsubscribeSequence$$)
            )
    }

    ngOnDestroy() {
        // some custom logic for this component
        super.ngOnDestroy();
    }
}
