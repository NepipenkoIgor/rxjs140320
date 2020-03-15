import { swipe$ } from './swipe';

swipe$.subscribe((direction) => {
    if (direction > 0) {
        console.log('Swipe left');
        return;
    }
    console.log('Swipe right');
});
