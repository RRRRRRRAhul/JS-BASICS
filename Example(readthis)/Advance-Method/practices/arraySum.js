// use forEach to find the sum of all element in an array

arr = [1,2,3,4,5,6,7,8,9,10];
let sum = 0; // variable where we will store the sum so we make it 0 from start

arr.forEach(element => {
    sum += element;
});

console.log(sum);


