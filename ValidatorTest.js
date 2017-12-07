var person = {
    name: prompt("Введите имя: ", "Vadim"),
    age: prompt("Введите возраст: ", "21"),
    country : prompt("Введите страну: ", "Belarus"),
    Email : prompt("Введите E-mail: ", "vadim.dom_96@mail.ru"),
    phone_number : prompt("Введите телефон: ", "8241182"),
    validationRules: { 
        name: new Rule().isRequired().minLength(2).maxLength(15),
        age: new Rule().isInt().min(18).max(90),
        country : new Rule().isRequired().minLength(3).maxLength(20),
        Email : new Rule().isRequired().isEmail().minLength(10).maxLength(30),
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
            str += person[key] +"\n";
        }
        alert(str + "----------------- \n" + "Okay!")
    },
    error => {
        console.log("Rejected: \n");
        error.forEach(function(item) {
        console.log(item.key + " : " + item.value + " : " + item.mes);
        });
    }
);