let obj = {
    name: "John",
    age: 30,
    city: "New York",
    // nested object
    eductaion : {
        degree: "Bachelor's",
        field: "Computer Science"
    },
}

console.log(typeof obj); 
console.log(obj);

//convert object to JSON
let jsonString = JSON.stringify(obj);
console.log(typeof jsonString);
console.log(jsonString);

//convert JSON back to object
let object = JSON.parse(jsonString);
console.log(typeof object);
console.log(object);