const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('meal-result-heading');
const mealsEl = document.getElementById('meals');
const single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API using the search button 
submit.addEventListener('submit', (e)=>{
    e.preventDefault();
    // console.log("submitted");

    const item = search.value;
    if (item.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data);
        })
        .catch((error)=>{
            alert("Please enter a search term");   
        });
        // clear search text
        search.value = '';
    }
    else{
        alert("Please enter a search term");   
    }
    
});

