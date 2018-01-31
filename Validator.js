//---------------------------------------------------------
//Validator function
function Validator() {
    return this;
}

//---------------------------------------------------------
//Prototype of the method of validation of values and rules
Validator.prototype.validate = function(values, rules) {
    return new Promise(function(resolve, reject) {
        var errorArray = [];
        for (var key in rules) {
              rules[key].validationFunctions.forEach(function(func, i) {
                    var result = func(values[key]);
                    if (!result.isValid) {
                        var error = {
                            key : key,
                            value : values[key],
                            mes : result.errorMessage
                        };
                        errorArray.push(error);
                    }
              });
        }
        if (errorArray.length > 0) {
            reject(errorArray);
        }
        resolve();
    });
}