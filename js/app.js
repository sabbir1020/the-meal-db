//  search of click
document.getElementById("button-search").addEventListener("click", function () {
  searchButton();
});
// search of Enter
document
  .getElementById("Search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchButton();
    }
  });
//  search of a errow function
const searchButton = () => {
  const inputTextElement = document.getElementById("Search-input");
  const inputText = inputTextElement.value;
  inputTextElement.value = "";

  loadMealDb(inputText);
  //   spinnerloading start
  spinnerLoading(true);

  //   console.log(inputText);
};

const loadMealDb = async (inputText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
  //   console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  loadDisplay(data.meals);
};

const loadDisplay = (meals) => {
  const displayContainer = document.getElementById("display-container");
  displayContainer.textContent = "";
  console.log(meals);
  meals.forEach((meal) => {
    // console.log(meal.strArea);
    const displayDiv = document.createElement("div");
    displayDiv.classList.add("col");
    displayDiv.innerHTML = `
    <div class="card h-100">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
            <h5 class="card-title">${meal.strArea}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
      </div> 
      <button onclick = "MealsDetailes('${
        meal.idMeal
      }')" class= "w-50 m-auto p-2 mb-2 rounded-3  bg-primary text-uppercase" > MealsDetailes </button>
      
    </div>
    `;
    displayContainer.appendChild(displayDiv);
  });
  //   spinnerLoading End
  spinnerLoading(false);
};
// spinner loading function
const spinnerLoading = (isLoading) => {
  const spinnerContainer = document.getElementById("spinner-container");
  if (isLoading) {
    spinnerContainer.classList.remove("d-none");
  } else {
    spinnerContainer.classList.add("d-none");
  }
};

// MealsDetailes
const MealsDetailes = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  DisplayDetailes(data.meals[0]);
};

// DisplayDetailes
const DisplayDetailes = (mealsDetails) => {
  const mealsDetailsContainer = document.getElementById("meals-details");
  mealsDetailsContainer.textContent = "";
  const detailesDiv = document.createElement("div");
  detailesDiv.classList.add("col");
  detailesDiv.innerHTML = `
  <div class="card-body ">
            <h5 class="card-title text-center ">${mealsDetails.strArea}</h5>
            <p> ${mealsDetails.strInstructions.slice(0, 300)} </p>
      </div> 
  `;
  mealsDetailsContainer.appendChild(detailesDiv);
  console.log(mealsDetails);
};
loadMealDb("fish");
