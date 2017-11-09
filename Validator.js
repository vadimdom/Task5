//---------------------------------------------------------
//Rule function
function Rule() {
    return this;
}

//---------------------------------------------------------
//Prototype of the isRequired rule registration method
Rule.prototype.isRequired = function() {
    this._isRequired = 1;
    
    return this;
};

//---------------------------------------------------------
//Prototype of the isEmail rule registration method
Rule.prototype.isEmail = function() {
    this._isEmail = 1;

    return this;
};

//---------------------------------------------------------
//Prototype of the mivLength rule registration method
Rule.prototype.minLength = function(len) {
    this._minLength = len;
    
    return this;
};

//---------------------------------------------------------
//Prototype of the maxLength rule registration method
Rule.prototype.maxLength = function(len) {
    this._maxLength = len;
    
    return this;
};

//---------------------------------------------------------
//Prototype of the max rule registration method
Rule.prototype.max = function(val) {
    this._max = val;
    
    return this;
};

//---------------------------------------------------------
//Prototype of the min rule registration method
Rule.prototype.min = function(val) {
    this._min = val;
    
    return this;
};

//---------------------------------------------------------
//Prototype of the isInt rule registration method
Rule.prototype.isInt = function() {
    this._isInt = 1;
    
    return this;
};

//---------------------------------------------------------
//Validator function
function Validator() {
    return this;
}

//---------------------------------------------------------
//Prototype of the method of validation of values and rules
Validator.prototype.validate = function(values, rules) {
    return new Promise(function(resolve, reject) {
        var countFields = 0;
        var countRightFields = 0;
        for (var key in rules) {
            countFields++;
            var rule = rules[key];
            //console.log( "Ключ: " + key + " значение: " + values[key] ); // Displaying of all fields
            //---------------------------------------------------------
            //Creating of the list of rules for every field
            var ruleList = {
                isRequired : rule._isRequired,
                isEmail : rule._isEmail,
                minLength : rule._minLength,
                maxLength : rule._maxLength,
                max : rule._max,
                min : rule._min,
                isInt : rule._isInt
            };
            var countRules = 0;
            var countRightRules = 0;
            //---------------------------------------------------------
            //Validation of every rule for every field
            for (var key1 in ruleList) {
                if (ruleList[key1]) {
                    countRules++;
                    //console.log("   Правило: " + key1 + " значение: " + ruleList[key1] ); // Displaying of all rules for each field
                    //---------------------------------------------------------
                    //Validation of minLength rule
                    if (key1 === "minLength") {
                        if (values[key].length >= ruleList[key1]) {
                            countRightRules++;
                            //console.log("       It's okay!");
                        } else {
                            throw new Error(values[key] + " is shotter than " + ruleList[key1] + "!");
                        }
                    }
                    //---------------------------------------------------------
                    //Validation of maxLength rule 
                    else if (key1 === "maxLength") {
                        if (values[key].length <= ruleList[key1]) {
                            countRightRules++;
                            //console.log("       It's okay!");
                        } else {
                            throw new Error(values[key] + " is longer than " + ruleList[key1] + "!");
                        }
                    }
                    //---------------------------------------------------------
                    //Validation of max rule 
                    else if (key1 === "max") {
                        if (values[key] <= ruleList[key1]) {
                            countRightRules++;
                            //console.log("       It's okay!");
                        } else {
                            throw new Error(values[key] + " is bigger than " + ruleList[key1] + "!");
                        }
                    }
                    //---------------------------------------------------------
                    //Validation of min rule 
                    else if (key1 === "min") {
                        if (values[key] >= ruleList[key1]) {
                            countRightRules++;
                            //console.log("       It's okay!");
                        } else {
                            throw new Error(values[key] + " is less than " + ruleList[key1] + "!");
                        }
                    }
                    //---------------------------------------------------------
                    //Validation of isInt rule 
                    else if (key1 === "isInt") {
                        if (!isNaN(parseFloat(values[key])) && isFinite(values[key])) {
                            countRightRules++;
                            //console.log("       It's okay!");
                        }else{
                            throw new Error("It's not a numeric: " + values[key] + "!");
                        }
                    }
                    //---------------------------------------------------------
                    //Validation of isEmail rule 
                    else if (key1 === "isEmail") {
                        if (values[key].indexOf("@mail.ru") !== -1) {
                            if (values[key].indexOf("@", (values[key].indexOf("@mail.ru") + 8)) === -1){
                                //console.log("       It's okay!");
                                countRightRules++;
                            } else {
                                throw new Error("It's not Email: " + values[key] + " !");
                            }
                        } else if (values[key].indexOf("@gmail.com") !== -1) {
                            if (values[key].indexOf("@", (values[key].indexOf("@gmail.com") + 10)) === -1){
                                //console.log("       It's okay!");
                                countRightRules++;
                            } else {
                                throw new Error("It's not Email: " + values[key] + " !");
                            }
                        } else if (values[key].indexOf("@tut.by") !== -1) {
                            if (values[key].indexOf("@", (values[key].indexOf("@tut.by") + 7)) === -1){
                                //console.log("       It's okay!");
                                countRightRules++;
                            } else {
                                throw new Error("It's not Email: " + values[key] + " !");
                            }
                        } else {
                            throw new Error("It's not Email: " + values[key] + " !");
                        }
                    }
                    //---------------------------------------------------------
                    //Validation of isRequired rule 
                    else if (key1 === "isRequired") {
                        if (values[key]) {
                            countRightRules++;
                            //console.log("       It's okay!");
                        } else {
                            throw new Error("This parameter is required: " + key);
                        }
                    }
                }
            }
            //---------------------------------------------------------
            //Checking, that all the rules are right
            if (countRules === countRightRules) {
                countRightFields++;
            }
        }
        //---------------------------------------------------------
        //Checking, that all the fields are right
        if (countFields === countRightFields) {
            resolve("All rules are right!!!");
        }
    });
}
