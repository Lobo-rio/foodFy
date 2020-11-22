const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', function(){
        const recipeId = card.getAttribute('id')

        window.location.href = `/recipesid?id=${recipeId}`
    })
}

const listIngredients = document.querySelector('span.ingredients')
const listMethodPreparation = document.querySelector('span.method-preparation')
const listInformation = document.querySelector('span.information')

listIngredients.addEventListener('click', function(){
    const ulIngredients = document.querySelector('#list-ingredients')

    ulIngredients.classList.toggle('active')
    
    if (ulIngredients.classList.value == "active") {
        listIngredients.innerHTML = '<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
    } else {
        listIngredients.innerHTML = '<i class="fa fa-angle-double-down" aria-hidden="true"></i>'
    }
})

listMethodPreparation.addEventListener('click', function(){
    const ullMethodPreparation = document.querySelector('#list-method-preparation')

    ullMethodPreparation.classList.toggle('active')
    
    if (ullMethodPreparation.classList.value == "active") {
        listMethodPreparation.innerHTML = '<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
    } else {
        listMethodPreparation.innerHTML = '<i class="fa fa-angle-double-down" aria-hidden="true"></i>'
    }
})

listInformation.addEventListener('click', function(){
    const pInformation = document.querySelector('#list-information')

    pInformation.classList.toggle('active')
    
    if (pInformation.classList.value == "active") {
        listInformation.innerHTML = '<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
    } else {
        listInformation.innerHTML = '<i class="fa fa-angle-double-down" aria-hidden="true"></i>'
    }
})