//before using async await
// function example(){
//     fetch(`https://randomuser.me/api/`)
//     .then((res) => {
//         return res.json();
//     })
//     .then((data)=> {
//         console.log(data);
//     })
// }

//after using async await
async function example(){
    let raw = await fetch(`https://randomuser.me/api/`);
    let ans = await raw.json();
    console.log(ans)
}

example();
console.log(`prove that it's a async code and it will execute first despite it's a last line code because it's not a async code`)