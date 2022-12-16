export {}
declare global {
    interface Array<T> {
        random(): T;
    }
}

if (!Array.prototype.random) {
    Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
    }
}


