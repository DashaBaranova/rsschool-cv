class Builder {
    storage;

    constructor(initialStorage) {
        this.storage = initialStorage;

        return this;
    }

    plus(...items) {
        this.storage = items.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            this.storage
        );

        return this; 
    }

    minus() {

        return this;
    }

    multiply() {

        return this;
    }

    divide() {

        return this;
    }

    get() {
        return this.storage;
    }
} 


class IntBuilder extends Builder {
    constructor(int = 0) {
        if (!Number.isInteger(int)) {
            throw new TypeError("The int argument should be integer.");
        }

        return super(int);
    }

    minus(...items) {
        this.storage = items.reduce(
            (accumulator, currentValue) => accumulator - currentValue,
            this.storage
        );

        return super.minus();
    }

    multiply(multiplicator) {
        this.storage = this.storage * multiplicator;

        return super.multiply();
    }

    divide(divider) {
       if (divider == 0){
            throw new Error("Can not divide by zero");   
       }

        this.storage = Math.round(this.storage / divider);

        return super.divide();
    }

    mod(modDivider) {
        this.storage = this.storage % modDivider;

        return this;
    }

    static random(from, to) {
        const min = Math.ceil(from);
        const max = Math.floor(to);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

console.log(IntBuilder.random(10, 100));

 const int = new IntBuilder(20)
    .plus(5, 5)
    .minus(1, 1)
    .multiply(2)
    .divide(1)
    .mod(3)
    .get();

 console.log(int);





