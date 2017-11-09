var person = {
    name: "Vadim",
    age: "21",
    country : "Belarus",
    Email : "vadim.dom_96@mail.ru",
    phone_number : "8241182",
    validationRules: { 
        name: new Rule().isRequired().minLength(2).maxLength(15), 
        age: new Rule().isInt().min(18).max(90),
        country : new Rule().isRequired().minLength(3).maxLength(20),
        Email : new Rule().isRequired().isEmail().minLength(10).maxLength(25),
    }
};


var Validator = new Validator();
var validationPromise = Validator.validate(person, person.validationRules);

validationPromise.then(
    response => {
        var str = "Person: \n";
        for (var key in person) {
            if (key === "validationRules"){
                break;
            }
            str += key + " : " + person[key] +"\n";
        }
        alert(str + "----------------- \n" + response)
    },
    error => alert("Rejected: \n" + error.message)
);

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

