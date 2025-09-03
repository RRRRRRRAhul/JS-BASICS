let ans = new Promise((res, rej) => {
    if(true){
        return res();
    }
    else{
        return rej();
    }
});

ans.then(function(){
    console.log("It's resolve messege")
}).catch(function(){
    console.log("It's reject messege")
})

console.log(`prove that it's a async code and it will execute first despite it's a last line code because it's not a async code`)