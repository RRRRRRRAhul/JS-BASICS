// user will ask for a number between 0 to 9 if the number is below 5 reslove it or reject it

let ans = new Promise((res, rej)=> {
    let num = Math.floor(Math.random() * 10) // we will get a number from 0 to 9

    if(num < 5){
        return res(`This is resoleve message means you get a number below 5`);
    }
    else{
        return rej(`This is reject message means you get a number above or equal to 5`);
    }
});

ans.then(function(data){
    console.log(data)
})
.catch(function(data){
    console.log(data)
})

console.log(`prove that it's a async code and it will execute first despite it's a last line code because it's not a async code`)