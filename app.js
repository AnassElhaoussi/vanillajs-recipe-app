
const mainSection = document.querySelector(".main-section")
const CATEGORIES_URL = "https://themealdb.com/api/json/v1/1/categories.php"
const SEARCH_API = "https://themealdb.com/api/json/v1/1/search.php?s="
const FILTER_BY_CAT_URL = "https://themealdb.com/api/json/v1/1/filter.php?c="
const inputField = document.querySelector(".navigation input")
const recipeSection = document.querySelector('.recipe-section')
const navigation = document.querySelector('.navigation')
const backButton = document.querySelector(".recipe-infos i")
const infoText = document.querySelector('.info')
const labelButton = document.querySelector('.label button')





const fetchData = api => {
    fetch(api).then(res => {
        return res.json()
    }).then(data => {
        console.log(data.categories);
        displayMeals(data.categories)
        
    })
}

fetchData(CATEGORIES_URL)


const fetchSearchData = (api, valueName) => {
    fetch(`${api}${valueName}`).then(response => {
        return response.json()
    }).then(data => {
        console.log(data.meals);
        displayMealsSearch(data.meals)
        

        
    })
}

const displayLabel = card => {
    const labelContainer = document.querySelector('.label-text')

    labelContainer.innerHTML = `
    <img src="${card.strCategoryThumb}" alt="image">
        <h2>${card.strCategory}</h2>
        <p>${card.strCategoryDescription}</p>
    `

}



const displayMeals = mealsCards => {
    mainSection.innerHTML = ""
        mealsCards.forEach(card => {
            const cardEl = document.createElement('div')
            
            cardEl.classList.add("card")
    
            cardEl.innerHTML = `
            <img src="${card.strCategoryThumb}" alt="image">
                <h3>${card.strCategory}</h3>
                <button class="des-btn">Get description</button>
            `
    
    
            cardEl.addEventListener('click', () => {
                navigation.classList.add('active')
                mainSection.classList.add('active')
                recipeSection.classList.add('active')
                displayLabel(card)
            })
    
            backButton.addEventListener('click', () => {
                navigation.classList.remove('active')
                mainSection.classList.remove('active')
                recipeSection.classList.remove('active')
                
    
            })
    
            mainSection.appendChild(cardEl)
            
        })
   
}

const displaySearchLabel = searchCard => {
    const searchLabelContainer = document.querySelector('.label-text')
    
    searchLabelContainer.innerHTML = `
    <img src="${searchCard.strMealThumb}" alt="image">
          <h2>${searchCard.strMeal}</h2>
          <p>${searchCard.strInstructions}</p>
    `

}
 
const displayMealsSearch = (searchCards) => {
    mainSection.innerHTML = ""
    if(searchCards){
        searchCards.forEach(searchCard => {
            const searchCardEl = document.createElement('div')
            searchCardEl.classList.add('card')
    
            searchCardEl.innerHTML = `
            <img src="${searchCard.strMealThumb}" alt="image">
            <h3>${searchCard.strMeal}</h3>
            <button>Get recipe</button>
            `
    
            
    
            searchCardEl.addEventListener('click', () => {
                navigation.classList.add('active')
                mainSection.classList.add('active')
                recipeSection.classList.add('active')
                displaySearchLabel(searchCard)
            })
    
            backButton.addEventListener('click', () => {
                navigation.classList.remove('active')
                mainSection.classList.remove('active')
                recipeSection.classList.remove('active')
    
            })
    
            mainSection.appendChild(searchCardEl)
            
        })

    } else {
        infoText.innerHTML = "No results found"
    }
        
    
}


inputField.addEventListener('keyup', e => {
    const {value} = e.target

    if(value){
        fetchSearchData(SEARCH_API, value)
        infoText.innerHTML = "Results:"
    } else {
            fetchData(CATEGORIES_URL)
            infoText.innerHTML = ""
    }

})










