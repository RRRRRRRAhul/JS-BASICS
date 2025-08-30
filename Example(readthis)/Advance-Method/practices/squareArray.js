// create a function that takes the array of number and return their square number in  array using map
numArr = [1,2,3,4,5,6,7,8,9,10];

// create the function that make square array of given array in the function
let square = (arrOfNumbers) => {
    let squareArr = arrOfNumbers.map(num => num * num); // use map function to create a new array call squareArr
    return squareArr; // this the new array which contain the square numbers of given array in the function
}

console.log(square(numArr));