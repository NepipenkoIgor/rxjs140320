class CustomIterator {
    private cursor: number = 0;
    private value!: number;

    constructor(
        private array: number[],
        private divisor: number = 1
    ) {
    }

    public next(): { value: number, done: boolean } {
        while (this.cursor < this.array.length) {
            this.value = this.array[this.cursor++];
            if (this.value % this.divisor === 0) {
                return {done: false, value: this.value};
            }
        }
        return {done: true, value: this.value};
    }

    [Symbol.iterator]() {
        return {
            next: this.next.bind(this)
        }
    }

}

const iterator = new CustomIterator([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// for(const item of iterator) {
//     console.log(item);
// }

Array.from(iterator).forEach((item) => {
    console.log(item);
})
