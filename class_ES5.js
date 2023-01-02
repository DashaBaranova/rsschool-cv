function Builder(str) {
    this.storage = str;   
}
Builder.prototype.plus = function(...items) {
    this.storage = items.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        this.storage
    );
    return this; 
}
Builder.prototype.minus = function() {
    return this;
}

Builder.prototype.multiply = function() {
    return this;
}

Builder.prototype.divide = function() {
    return this;
}

Builder.prototype.get = function() {
    return this;
}

function StringBuilder(str) {
    Builder.call(this, str);
}

StringBuilder.prototype = Object.create(Builder.prototype);

StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.minus = function(n) {
   this.storage = this.storage.substring(0, this.storage.length - n);

   return Builder.prototype.minus.call(this);
}

StringBuilder.prototype.multiply = function(n) {
    var storageCopy = this.storage;
  for(var i = 1; i < n; i++) {
      this.storage = this.storage + storageCopy;
  }
  return Builder.prototype.multiply.call(this);
    
};

StringBuilder.prototype.divide = function(n) {
    this.storage = this.storage.substring(0, Math.floor(this.storage.length / n));

    return Builder.prototype.divide.call(this);
}

StringBuilder.prototype.remove = function(str) {
    this.storage = this.storage.split(str).join('');
   
    return this;
}

StringBuilder.prototype.sub = function(from, n) {
    this.storage = this.storage.substring(from, from + n);
    
    return this;
}


var strBuilder = new StringBuilder('Hello')
    .minus(2)
    .plus('l')
    .multiply(6)
    .divide(2)
    .plus('test text')
    .remove('test')
    .sub(0,4)

console.log(strBuilder);

