// initialize classes
const ui = new UI(),
       cocktail = new cocktailAPI(),
       cocktailDB = new CocktailDB();



// eventlisteners create
function eventlisteners(){
    //document ready
    document.addEventListener('DOMContentLoaded', documenrReady);


    const searchForm = document.getElementById('search-form');
    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);

    }

    // results eventlisteners
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv) {
        resultsDiv.addEventListener('click', resultsDelegation);
    }

}

eventlisteners(); 

function getCocktails(e){
    e.preventDefault();

    const searchTerm = document.getElementById('search').value;
   
    if(searchTerm === ''){
       // call ui printMessage
        ui.printMessage('Please add something into the form', 'danger');
    } else {
        // server response promise
        let serverResponse;

        // type of search name, cocktails,ingredients
        const type = document.querySelector('#type').value;

        // evaluate the type of method and execute query
        switch(type) {
            case 'name':
                serverResponse = cocktail.getCocktailName(searchTerm);
            break;
            case 'ingredient':
                serverResponse = cocktail.getCocktailIngredient(searchTerm);
            break;
            case 'category':
                serverResponse = cocktail.getDrinksCategory(searchTerm);
                break;
                case 'alcohol':
                serverResponse = cocktail.getDrinksAlcohol(searchTerm);
                break;
            }

            ui.clearResults();

        //query by name of drinks

        serverResponse.then(cocktails => {
            if(cocktails.cocktails.drinks === null){
                ui.printMessage('There\'re no results, try a different term', 'danger');
   
            } else {
                if(type === 'name'){
                    ui.displayCocktailsWithIngredients(cocktails.cocktails.drinks);
                } else{
                    // display without ingredients(category, alcohol, ingredient)
                    ui.displayDrinks(cocktails.cocktails.drinks)
                }
            }
            
        })
            
    }
}
// delegation for results area

function resultsDelegation(e){
    e.preventDefault();

        if(e.target.classList.contains('get-recipe')){
            cocktail.getSingleRecipe(e.target.dataset.id)
            .then(recipe => {
                // display in modal
                ui.displaySingleRecipe( recipe.recipe.drinks[0] );
                
            })
        } 
      //  when favorite btn is clicked
      if(e.target.classList.contains('favorite-btn')) {
        if(e.target.classList.contains('is-favorite')){
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';

            // remove from storage
            cocktailDB.removeFromDB(e.target.dataset.id);


        }else {
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            // get info
            const cardBody = e.target.parentElement;
            
            const drinkInfo = {
                id:e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
                
            }
            // console.log(drinkInfo)
            // add into storage
            cocktailDB.saveIntoDB(drinkInfo);
        }
        
    }
} 

// document ready
function documenrReady(){
    // display on load the favorigtes from storage
    ui.isFavorite()

    // select search category
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory) {
        ui.displayCategories();
    }

    //when favorites page
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable){
        // get storage from storage and display them
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);

        // when view and delete are clicked
        favoritesTable.addEventListener('click', (e) => {
            e.preventDefault();

            // delegation
            if(e.target.classList.contains('get-recipe')) {
                cocktail.getSingleRecipe(e.target.dataset.id)
                .then(recipe => {
                    // display in modal
                    ui.displaySingleRecipe( recipe.recipe.drinks[0] );
                    
                })
            }

            // when remove button is clicked
            if(e.target.classList.contains('remove-recipe')) {
                
                ui.removeFavorite(e.target.parentElement.parentElement);

                // remove from localstorage
                cocktailDB.removeFromDB(e.target.dataset.id);
            }

        })
    }

}