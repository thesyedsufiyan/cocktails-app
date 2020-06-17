class UI {
    // display all drinks categories
    displayCategories(){
        const categoryList = cocktail.getCategories()
        .then(categories => {
            const calList = categories.categories.drinks;
            
            // append first option
            const firstOption = document.createElement('option');
            firstOption.textContent = '- select -';
            firstOption.value = '';
            document.querySelector('#search').appendChild(firstOption);
            
            // append into select
            calList.forEach(category => {
                const option = document.createElement('option');
                option.textContent = category.strCategory;
                option.value = category.strCategory.split('  ').join('_');
                document.querySelector('#search').appendChild(option);
            })
        })
    }
    
    displayDrinks(drinks){
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';
 
        const resultsDiv = document.querySelector('#results');

        // loop drinks
        drinks.forEach(drink =>{
            resultsDiv.innerHTML += `
            <div class="col-md-4">
            <div class="card my-3">
            <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
            +
            </button>
            <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <div class="card-body">
                <h2 class="card-title text-center">${drink.strDrink}</h2>
            <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get recipe</a>
                </div>
            </div>
            </div>
            `;
        });
        this.isFavorite();
    }
    displayCocktailsWithIngredients(drinks) {

          // Show the Results
          const resultsWrapper = document.querySelector('.results-wrapper');
          resultsWrapper.style.display = 'block';

          // Insert the results
          const resultsDiv = document.querySelector('#results');

          drinks.forEach(drink => {
               resultsDiv.innerHTML += `
                    <div class="col-md-6">
                         <div class="card my-3">
                              <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                              +
                              </button>
                              <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                              <div class="card-body">
                                   <h2 class="card-title text-center">${drink.strDrink}</h2>
                                   <p class="card-text font-weight-bold">Instructions: </p>
                                   <p class="card-text">
                                         ${drink.strInstructions}
                                   </p>
                                   <p class="card-text">
                                        <ul class="list-group">
                                             <li class="list-group-item alert alert-danger">Ingredients</li>
                                             ${this.displayIngredients(drink)}
                                        </ul>
                                   </p>
                                   <p class="card-text font-weight-bold">Extra Information:</p>
                                   <p class="card-text">
                                        <span class="badge badge-pill badge-success">
                                             ${drink.strAlcoholic}
                                        </span>
                                        <span class="badge badge-pill badge-warning">
                                             Category: ${drink.strCategory}
                                        </span>
                                   </p>
                              </div>
                         </div>
                    </div>
               `;
          });
          this.isFavorite();
     }

    // prints ingredients and measurements
    displayIngredients(drink){
        // console.log(drink);

        let ingredients = [];
        for(let i = 1; i < 16; i++){
            const ingredientMeasure = {};
            if( drink[`strIngredient${i}`] !== null){
                ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];

                ingredients.push(ingredientMeasure);
            }
        }
        
        // build template

        let ingredientsTemplate = '';
        ingredients.forEach(ingredient => {
            ingredientsTemplate += `
            <li class="list-group-item ">${ingredient.ingredient} - ${ingredient.measure}</li>
            `;
        })
        return ingredientsTemplate;
    }

    // display displaySingleRecipe
    displaySingleRecipe(recipe){
        // get variables
        const modalTitle = document.querySelector('.modal-title'),
        modalDescription = document.querySelector('.modal-body .description-text'),
        modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');
    
        //set values
        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;
    
        // display ingredients
        
        modalIngredients.innerHTML = this.displayIngredients(recipe);
    }


    printMessage(message, className){
        const div = document.createElement('div');
         
        div.innerHTML = `
        <div class= 'alert alert-dismissible alert-${className}'>
        <button type='button' class='close' data-dismiss='alert'>X</button>    
        ${message}   
        </div>
        `;

        // insert before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);
        
        // remove after 3 sec

        setTimeout(() =>{
            document.querySelector('.alert').remove();
        }, 3000)
    }

    clearResults(){
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
    }

    // display favorites from storage
    displayFavorites(favorites){
        const favoritesTable = document.querySelector('#favorites tbody');
        favorites.forEach(drink => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>
                <img src="${drink.image}" alt="${drink.name}" width=100>
            </td>
            <td>${drink.name}</td>
            <td>
                <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}"
                class="btn btn-success get-recipe">
                View
                </a>
            </td>
            <td>
                <a href="#"  data-id="${drink.id}" class="btn btn-danger remove-recipe">
                Remove
                </a>
            </td>
            `;
            favoritesTable.appendChild(tr);
        })
    }
    // remove single favorites from dom
    removeFavorite(element){
        element.remove();
    }

    // add class when cocktail, is favorite
    isFavorite(){
        const drinks = cocktailDB.getFromDB();

        drinks.forEach(drink => {
            // destructuring the id
            let {id} = drink;

            // select favorites
            let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
            if(favoriteDrink){
                favoriteDrink.classList.add('is-favorite');
                 favoriteDrink.textContent = '-';
           }
       
        })
    }
    
}