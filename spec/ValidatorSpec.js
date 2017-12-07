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
            resolve => {
                var test = true;
                expect(test).toBe(true);
            }
        );

        done();
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
            reject => {
                expect(reject.length).toEqual(1);
                expect(reject[0].key).toEqual("name");
                expect(reject[0].value).toEqual("");
                expect(reject[0].mes).toEqual(" is required");
            }
        );

        done();
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
            resolve => {
                var test = true;
                expect(test).toBe(true);
            }
        );

        done();
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
            reject => {
                expect(reject.length).toEqual(1);
                expect(reject[0].key).toEqual("age");
                expect(reject[0].value).toEqual("21bcxj");
                expect(reject[0].mes).toEqual(" is not an int");
            }
        );
        
        done();
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
            resolve => {
                var test = true;
                expect(test).toBe(true);
            }
        );

        done();
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
            reject => {
                expect(reject.length).toEqual(1);
                expect(reject[0].key).toEqual("age");
                expect(reject[0].value).toEqual("21");
                expect(reject[0].mes).toEqual(" is less than " + 25);
            }
        );

        done();
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
            resolve => {
                var test = true;
                expect(test).toBe(true);
            }
        );

        done();
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
            reject => {
                expect(reject.length).toEqual(2);
                expect(reject[0].key).toEqual("name");
                expect(reject[0].value).toEqual("Vadim");
                expect(reject[0].mes).toEqual(" is shotter than " + 7);
                expect(reject[1].key).toEqual("age");
                expect(reject[1].value).toEqual("21");
                expect(reject[1].mes).toEqual(" is bigger than " + 20);
            }
        );

        done();
    });
});


