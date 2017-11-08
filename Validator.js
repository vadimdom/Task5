/*function httpGet(url) {
    
      return new Promise(function(resolve, reject) {
    
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
    
        xhr.onload = function() {
          if (this.status == 200) {
            resolve(this.response);
          } else {
            var error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };
    
        xhr.onerror = function() {
          reject(new Error("Network Error"));
        };
    
        xhr.send();
      });
    
    }
    httpGet("/article/promise/user.json")
    .then(
      response => alert(`Fulfilled: ${response}`),
      error => alert(`Rejected: ${error}`)
    );*/


function Rule() {
    this._isRequired = null,
    this._isEmail = null,
    this._minLength = null,
    this._maxLength = null,
    this._max = null,
    this._min = null,
    this._isInt = null
    return this;
}


Rule.prototype.isRequired = function() {
    this._isRequired = 1;
    
    return this;
};


Rule.prototype.isEmail = function() {
    this._isEmail = 1;

    return this;
};

Rule.prototype.minLength = function(len) {
    this._minLength = len;
    
    return this;
};

Rule.prototype.maxLength = function(len) {
    this._maxLength = len;
    
    return this;
};

Rule.prototype.max = function(val) {
    this._max = val;
    
    return this;
};

Rule.prototype.min = function(val) {
    this._min = val;
    
    return this;
};


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
  
Rule.prototype.isInt = function() {
    this._isInt = 1;
    
    return this;
};


var person = {
    name: "Vadim@tut.by",
    age: 21,
    country : "Belarus",
    validationRules: { 
        name: new Rule().isEmail().minLength(3).maxLength(15), 
        age: new Rule().isInt().min(10).max(25),
        country : new Rule().isRequired().minLength(3).maxLength(15),
    }
};

/*for (var key in person.validationRules) {
    // этот код будет вызван для каждого свойства объекта
    // ..и выведет имя свойства и его значение
    var rule = person.validationRules[key];
    console.log( "Ключ: " + key + " значение: " + person[key] );
    var ruleList = {
        isRequired : rule._isRequired,
        isEmail : rule._isEmail,
        minLength : rule._minLength,
        maxLength : rule._maxLength,
        max : rule._max,
        min : rule._min,
        isInt : rule._isInt
    };
    for (var key1 in ruleList) {
        if (ruleList[key1]){
            console.log( "        Правило: " + key1 + " значение: " + ruleList[key1] );
        }
    }
}*/


function Validator() {
    return;
}

Validator.prototype.validate = function(values, rules) {
    for (var key in rules) {
        var rule = new Rule();
        rule = rules[key];
        console.log( "Ключ: " + key + " значение: " + values[key] );
        var ruleList = {
            isRequired : rule._isRequired,
            isEmail : rule._isEmail,
            minLength : rule._minLength,
            maxLength : rule._maxLength,
            max : rule._max,
            min : rule._min,
            isInt : rule._isInt
        };
        for (var key1 in ruleList) {
            if (ruleList[key1]){
                console.log("   Правило: " + key1 + " значение: " + ruleList[key1] );
                if (key1 === "minLength"){
                    if (values[key].length >= ruleList[key1]){
                        console.log("       It's okay!");
                    }else{
                        throw new Error("it's shotter than" + ruleList[key1] + "!");
                    }
                }
                if (key1 === "maxLength"){
                    if (values[key].length <= ruleList[key1]){
                        console.log("       It's okay!");
                    }else{
                        throw new Error("it's longer than" + ruleList[key1] + "!");
                    }
                }
                if (key1 === "max"){
                    if (values[key] <= ruleList[key1]){
                        console.log("       It's okay!");
                    }else{
                        throw new Error("it's bigger than" + ruleList[key1] + "!");
                    }
                }
                if (key1 === "min"){
                    if (values[key] >= ruleList[key1]){
                        console.log("       It's okay!");
                    }else{
                        throw new Error("it's less than" + ruleList[key1] + "!");
                    }
                }
                if (key1 === "isInt"){
                    if (isNumeric(values[key])){
                        console.log("       It's okay!");
                    }else{
                        throw new Error("it's not a numeric: " + values[key] + "!");
                    }
                }
                if (key1 === "isEmail"){
                    if (values[key].indexOf("@mail.ru") !== -1 || values[key].indexOf("@gmail.ru") !== -1 || values[key].indexOf("@tut.by") !== -1){
                        console.log("       It's okay!");
                    } else {
                        throw new Error("it's not Email: " + values[key] + "!");
                    }
                }
                if (key1 === "isRequired"){
                    if (values[key]) {
                        console.log("       It's okay!");
                    } else {
                        throw new Error("This parameter is required!");
                    }
                }
            }
        }
    }
    return "All rules are right!!!";
};
var Validator = new Validator();
var validationPromise = Validator.validate(person, person.validationRules);
console.log(validationPromise);
/*
alert(new Rule().isInt());
alert(new Rule().isEmail());
alert(new Rule().isRequired());
alert(new Rule().minLength(3));
alert(new Rule().maxLength(20));
alert(new Rule().max(25));
alert(new Rule().min(5));
alert(new Validator().validate(person.age, new Rule().max(25)));*/
