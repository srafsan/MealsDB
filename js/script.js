// This is a function for loading Meals
const loadMeals = async (foodType) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodType}`;
    const res = await fetch(url);
    const data = await res.json();

    // console.log(url);
    displayFoods(data.meals);
};

// This is a function for displaying meals
const displayFoods = (foods) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = "";

    // Dynamic Visibility of ShowALl button
    const showAll = document.getElementById("show-all");

    if (foods.length > 6) {
        foods = foods.slice(0, 6);
        showAll.classList.remove("hidden");
    } else {
        showAll.classList.add("hidden");
    }

    foods.forEach((food) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.classList.add("card-side");
        cardDiv.classList.add("bg-base-100");
        cardDiv.classList.add("border-2");

        cardDiv.innerHTML = `
            <figure>
                <img class="w-72" src="${food.strMealThumb}" alt="Movie" />
            </figure>
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold">${food.strMeal}</h2>
                <p class="my-5 text-lg text-slate-500">There are many variations of <br/> passages of available, but the <br/> majority have suffered</p>
                <div class="card-actions justify-start">
                    <button class="btn btn-warning font-bold">View Details</button>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
};

// *######
// The below two function is used to get search text

// 1. This is when pressing the search button
document.getElementById("btn-search").addEventListener("click", function () {
    const searchText = document.getElementById("search-field").value;
    loadMeals(searchText);
});

// 2. This is when pressing enter
document
    .getElementById("search-field")
    .addEventListener("keydown", function (e) {
        const searchText = document.getElementById("search-field").value;
        if (e.key === "Enter") loadMeals(searchText);
    });
// *#####

loadMeals("chicken");
