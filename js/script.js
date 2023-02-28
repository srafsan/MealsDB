// This is a function for loading Meals
const loadMeals = async (foodType, dataLimit) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodType}`;
    const res = await fetch(url);
    const data = await res.json();

    // console.log(url);
    displayFoods(data.meals, dataLimit);
};

// This is a function for displaying meals
const displayFoods = (foods, dataLimit) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = "";

    // Dynamic Visibility of ShowALl button
    const showAll = document.getElementById("show-all");

    if (dataLimit && foods.length > 6) {
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
                    <label onclick="loadCardDetails('${food.idMeal}')" for="my-modal" class="btn btn-warning font-bold">View Details</label>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
};

// Processing search to limit or delimiting dataset
const processSearch = (dataLimit) => {
    const searchText = document.getElementById("search-field").value;
    loadMeals(searchText, dataLimit);
};

// *######
// The below functions are used to get search text

// 1. This is when pressing the search button
document.getElementById("btn-search").addEventListener("click", function () {
    processSearch(6);
});

// 2. This is when pressing enter
document
    .getElementById("search-field")
    .addEventListener("keydown", function (e) {
        if (e.key === "Enter") processSearch(6);
    });

// 3. When pressing the show all button
document.getElementById("btn-show-all").addEventListener("click", function () {
    processSearch();
});

// *#####

// *#####
// 1. Loading the Modal
const loadCardDetails = async (foodId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.meals[0]);
    displayCardDetails(data.meals[0]);
};

// 2. Displaying the card details
const displayCardDetails = (card) => {
    const modalTitle = document.getElementById("modal-title");
    modalTitle.innerText = card.strMeal;

    const modalCategory = document.getElementById("modal-category");
    modalCategory.innerText = card.strCategory;

    const modalArea = document.getElementById("modal-area");
    modalArea.innerText = card.strArea;

    const modalText = document.getElementById("modal-text");
    modalText.innerText = card.strInstructions;

    const modalYoutube = document.getElementById("modal-youtube");
    modalYoutube.innerText = card.strYoutube;

    const modalImage = document.getElementById("modal-img");
    modalImage.innerHTML = `<img src="${card.strMealThumb}"/>`;
};

//* #####

loadMeals("chicken", 6);
