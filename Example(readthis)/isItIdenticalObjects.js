function isItIdenticalObjects(obj1, obj2){
    if(typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    if(obj1 === obj2) {
        return true;
    }

    if(obj1.name === obj2.name && obj1.age === obj2.age) {
        return true;
    }
}

let person1 = {
    name: 'Alice',  
    age: 30
};

let person2 = {
    name: 'Alice',
    age: 30
};

console.log(isItIdenticalObjects(person1, person2)); 
// this is a simple function to check if two objects are identical based on their properties