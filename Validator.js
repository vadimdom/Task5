//---------------------------------------------------------
//Rule function
function Rule() {
    this.validationFunctions = [];
    return this;
}

//---------------------------------------------------------
//Prototype of the isRequired rule registration method
Rule.prototype.isRequired = function() {
    this.validationFunctions.push(function(param) {
        var isValid = !!param;
        var validationResult = {
            isValid: isValid,
            errorMessage: isValid ?  null : " is required"
        };

        return validationResult;
     });
     
    return this;
};

//---------------------------------------------------------
//Prototype of the isEmail rule registration method
Rule.prototype.isEmail = function() {
    this.validationFunctions.push(function(param) {
        var isValid = param.match(/^[0-9a-z-\._]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i) ? true : false;
        var validationResult = {
            isValid: isValid,
            errorMessage: isValid ?  null : " is not email"
        };
        
        return validationResult;
     });

    return this;
};

//---------------------------------------------------------
//Prototype of the minLength rule registration method
Rule.prototype.minLength = function(len) {
    this.validationFunctions.push(function(param) {
        var isValid = (param.length >= len) ? true : false;
        var validationResult = {
            isValid: isValid,
            errorMessage: isValid ?  null : " is shotter than " + len
        };
        
        return validationResult;
     });

    return this;
};

//---------------------------------------------------------
//Prototype of the maxLength rule registration method
Rule.prototype.maxLength = function(len) {
    this.validationFunctions.push(function(param) {
        var isValid = (param.length <= len) ? true : false;
        var validationResult = {
            isValid: isValid,
            errorMessage: isValid ?  null : " is longer than " + len
        };
        
        return validationResult;
     });
    
    return this;
};

//---------------------------------------------------------
//Prototype of the max rule registration method
Rule.prototype.max = function(val) {
    this.validationFunctions.push(function(param) {
        var isValid = (param <= val) ? true : false;
        var validationResult = {
            isValid: isValid,
            errorMessage: isValid ?  null : " is bigger than " + val
        };
        
        return validationResult;
     });
    
    return this;
};

//---------------------------------------------------------
//Prototype of the min rule registration method
Rule.prototype.min = function(val) {
    this.validationFunctions.push(function(param) {
        var isValid = (param >= val) ? true : false;
        var validationResult = {
            isValid: isValid,
            errorMessage: isValid ?  null : " is less than " + val
        };
        
        return validationResult;
     });
    
    return this;
};

//---------------------------------------------------------
//Prototype of the isInt rule registration method
Rule.prototype.isInt = function() {
    this.validationFunctions.push(function(param) {
        var isValid = (!isNaN(parseFloat(param)) && isFinite(param)) ? true : false;
        var validationResult = {
            isValid: isValid,
            errorMessage: isValid ?  null : " is not an int"
        };
        
        return validationResult;
     });
    
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
        var mes = "";
        for (var key in rules) {
              rules[key].validationFunctions.forEach(function(item, i) {
                    //alert(i + item);
                    rules[key].validationFunctions[i] = item(values[key]);
                    //alert(rules[key].validationResults[i].isValid);
              });
            rules[key].validationFunctions.forEach(function(item) {
                if (item.isValid !== true) {
                    mes += key + " : " + values[key] + " " + item.errorMessage + "\n";
                }
            });
        }
        if (mes !== "") {
            reject(new Error(mes));
        }
        resolve("Validation is okay!");
    });
}