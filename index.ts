interface IListener {
    next: Function
}

class Producer {
    private listeners: IListener[] = [];

    public subscribe(listener: IListener): { unsubscribe: () => void } {
        const index = this.listeners.push(listener);
        return {
            unsubscribe: () => {
                this.listeners.splice(index - 1, 1);
            }
        }
    }

    public notify(message: string) {
        this.listeners.forEach((listener) => {
            listener.next(message);
        })
    }
}

const listener1 = {
    next: (message: string) => {
        console.log('Listener 1 received', message);
    }
}


const listener2 = {
    next: (message: string) => {
        console.log('Listener 2 received', message);
    }
}

const producer = new Producer();
const subscription1  = producer.subscribe(listener1);
producer.subscribe(listener2);

producer.notify('Hi All');
subscription1.unsubscribe();

setTimeout(()=>{
    producer.notify('RxJS is awesome');
}, 5000)
