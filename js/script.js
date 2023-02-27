const loadMeals = async (foodType) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodType}`;
    const res = await fetch(url);
    const data = await res.json();

    // console.log(data.meals);
    displayFoods(data.meals);
};

const displayFoods = (foods) => {
    const cardContainer = document.getElementById("card-container");

    // First 6 foods
    foods = foods.slice(0, 6);

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
                    <button class="btn btn-primary">View Details</button>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
};

loadMeals("chicken");
