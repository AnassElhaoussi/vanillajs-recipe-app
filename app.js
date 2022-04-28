
const mainSection = document.querySelector(".main-section")
const BASE_API_URL = "https://themealdb.com/api/json/v1/1/categories.php"
const inputField = document.querySelector(".navigation input")


const fetchData = api => {
    fetch(api).then(res => {
        return res.json()
    }).then(data => {
        console.log(data.categories);
        displayMeals(data.categories)
        
    })
}

fetchData(BASE_API_URL)


const fetchSearchData = (valueName) => {
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${valueName}`).then(response => {
        return response.json()
    }).then(info => {
        console.log(info.meals);
        displayMealsSearch(info.meals)
    })
}

const displayMealsSearch = searchCards => {
    mainSection.innerHTML = ""
    searchCards.forEach(searchCard => {
        const searchCardEl = document.createElement('div')
        searchCardEl.classList.add('card')

        searchCardEl.innerHTML = `
        <img src="${searchCard.strMealThumb}" alt="image">
        <h3>${searchCard.strMeal}</h3>
        <button>Get recipe</button>
        `

        mainSection.appendChild(searchCardEl)
    })
}




const displayMeals = mealsCards => {
    mainSection.innerHTML = ""
    mealsCards.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.classList.add("card")

        cardEl.innerHTML = `
        <img src="${card.strCategoryThumb}" alt="image">
            <h3>${card.strCategory}</h3>
            <button>Get recipe</button>
        `

        mainSection.appendChild(cardEl)
        
    });
}

inputField.addEventListener('keyup', e => {
    const {value} = e.target
    const mealName = document.querySelector('.card h3')
    
    if(value){
        fetchSearchData(value)
    }

    else {
        fetchData(BASE_API_URL)
    }

})

