/* This JavaScript code snippet is setting up event listeners and functionality for a meal search
feature using an API. Here's a breakdown of what it does: */
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const resultHeading = document.getElementById("meal-result-heading");
const mealsEl = document.getElementById("meals");
const single_mealEl = document.getElementById("single-meal");

// Search meal and fetch from API using the search button
submit.addEventListener("submit", (e) => {

    // prevent the default form submission behavior
    e.preventDefault();

    // clear the previous results
    single_mealEl.innerHTML = "";
    resultHeading.innerHTML = "";
    mealsEl.innerHTML = "";
    // console.log("submitted");

    const item = search.value;
    if (item.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // if there are not any meals that match the search term
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no results for ${item}. Try again! </p>`;
                    mealsEl.innerHTML = "";
                } else {
                    // alert("We found some meals!");
                    resultHeading.innerHTML = `<h2>Search results for '${item}':</h2>`;
                    mealsEl.innerHTML = data.meals
                        .map((meal) => {
                            return `
                                <div class="meal">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                                <div class="meal-info" data-mealId="${meal.idMeal}">
                                <h3 class="meal-name">${meal.strMeal}</h3>
                                </div>
                                </div>
                            `;
                        })
                        .join("");
                }
            })
            .catch((error) => {
                resultHeading.innerHTML = `<h1>Sorry, we didn't find any meal! ${error}</h1>`;
            });
        // clear search text
        search.value = "";
    } else {
        alert("Please enter a search term");
    }
});

// Add meal to DOM
function addMealToDom(meal) {
    // intilialize the ingredients array where we gonna store the ingredients and measures
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            // add the ingredient and measure to the ingredients array
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
            single_mealEl.innerHTML = `<div class="single-meal">
                                    <h1>${meal.strMeal}</h1>
                                    <div class="single-meal-info">
                                        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''} 
                                        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
                                    </div>
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                    <div class="main">
                                        <h2>Ingrediants</h2>
                                        <ul>
                                            ${ingredients.map((ing) => {
                return `<li>${ing}</li>`;
            }).join('')}
                                        </ul>
                                        <h2>Instructions</h2>
                                        <p>${meal.strInstructions}</p>
                                    </div>
                                </div> `;
        }
        else {
            break; // use break instead of return so that we can just exit the loop and continue with the rest of the code
        }
    }
    console.log(ingredients);
}

// Fetch meal by ID
function getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.meals[0].idMeal); // to check if we are getting the correct meal ID
            const meal = data.meals[0];
            addMealToDom(meal);
        });
}

// to show the meal details on clicking the meal
mealsEl.addEventListener("click", (e) => {
    const mealInfo = e.composedPath().find((singel_item) => {
        if (singel_item.classList) {
            return singel_item.classList.contains("meal-info");
        } else {
            return false;
        }
    });
    if (mealInfo) {
        const mealId = mealInfo.getAttribute("data-mealId");
        // console.log(mealId);
        getMealById(mealId); // calling the function to fetch meal by ID
    }
});


// Fetch random meal from API
random.addEventListener("click", (e) => {
    // clear the previous results
    single_mealEl.innerHTML = "";
    resultHeading.innerHTML = "";
    mealsEl.innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
        const meal = data.meals[0];
        // pass the random meal to the addMealToDom function to display it
        addMealToDom(meal);
    });
}); 
