export {}
declare global {
    interface Array<T> {
        /**
         * Returns random element from the array
         */
        random(): T;
    }
}

if (!Array.prototype.random) {
    Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
    }
}


