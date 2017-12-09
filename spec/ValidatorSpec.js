describe("Validator", function() {

    it("true Validator name : 'Vadim' isRequired()", function(done) {
        
        var person = {
            name: "Vadim",
            validationRules: { 
                name: new Rule().isRequired(),
            }
        };
        
        var validator = new Validator();
        var validationPromise = validator.validate(person, person.validationRules);
        
        validationPromise.then(
            () => {
                var test = true;
                expect(test).toBe(true);
                done();
            }
        );
    });


    it("false Validator name: '' isRequired()", function(done) {
        
        var person = {
            name: "",
            validationRules: { 
                name: new Rule().isRequired(),
            }
        };
        
        var validator = new Validator();
        var validationPromise = validator.validate(person, person.validationRules);
        
        validationPromise.then(
            null,
            error => {
                var error1 = {
                    key : "name",
                    value : "",
                    mes : " is required"
                }
                var errorArray= [];
                errorArray.push(error1);
                expect(errorArray).toEqual(error);
                done();
            }
        );
    });

    it("true Validator age : '21' isInt()", function(done) {
        
        var person = {
            age: "21",
            validationRules: { 
                age: new Rule().isInt(),
            }
        };
          
        var validator = new Validator();
        var validationPromise = validator.validate(person, person.validationRules);
        
        validationPromise.then(
            () => {
                var test = true;
                expect(test).toBe(true);
                done();
            }
        );
    });

    it("false Validator age : '21bcxj' isInt()", function(done) {
            
        var person = {
            age: "21bcxj",
            validationRules: { 
                age: new Rule().isInt(),
            }
        };
              
        var validator = new Validator();
        var validationPromise = validator.validate(person, person.validationRules);
            
        validationPromise.then(
            null,
            error => {
                var error1 = {
                    key : "age",
                    value : "21bcxj",
                    mes : " is not an int"
                }
                var errorArray= [];
                errorArray.push(error1);
                expect(errorArray).toEqual(error);
                done();
            }
        );
    });

    it("true Validator age : '21' min(18)", function(done) {
                
        var person = {
            age: "21",
            validationRules: { 
                age: new Rule().min(18),
            }
        };
                  
        var validator = new Validator();
        var validationPromise = validator.validate(person, person.validationRules);
                
        validationPromise.then(
            () => {
                var test = true;
                expect(test).toBe(true);
                done();
            }
        );
    });

    it("false Validator age : '21' min(25)", function(done) {
                    
        var person = {
            age: "21",
            validationRules: { 
                age: new Rule().min(25),
            }
        };
                      
        var validator = new Validator();
        var validationPromise = validator.validate(person, person.validationRules);
                    
        validationPromise.then(
            null,
            error => {
                var error1 = {
                    key : "age",
                    value : "21",
                    mes : " is less than " + 25
                }
                var errorArray= [];
                errorArray.push(error1);
                expect(errorArray).toEqual(error);
                done();
            }
        );
    });

    it("true Validator name : 'Vadim' isRequired().minLength(2), age : '21' isInt().max(60)", function(done) {
                        
        var person = {
            name: "Vadim",
            age: "21",
            validationRules: { 
                name: new Rule().isRequired().minLength(2),
                age: new Rule().isInt().max(60),
            }
        };
                          
        var validator = new Validator();
        var validationPromise = validator.validate(person, person.validationRules);
                        
        validationPromise.then(
            () => {
                var test = true;
                expect(test).toBe(true);
                done();
            }
        );
    });

    it("false Validator name : 'Vadim' isRequired().minLength(7), age : '21' isInt().max(20)", function(done) {
                            
        var person = {
            name: "Vadim",
            age: "21",
            validationRules: { 
                name: new Rule().isRequired().minLength(7),
                age: new Rule().isInt().max(20),
            }
        };
                              
        var validator = new Validator();
        var validationPromise = validator.validate(person, person.validationRules);
                            
        validationPromise.then(
            null,
            error => {
                var error1 = {
                    key : "name",
                    value : "Vadim",
                    mes : " is shotter than " + 7
                }
                var error2 = {
                    key : "age",
                    value : "21",
                    mes : " is bigger than " + 20
                }
                var errorArray= [];
                errorArray.push(error1);
                errorArray.push(error2);
                expect(errorArray).toEqual(error);
                done();
            }
        );
    });
});