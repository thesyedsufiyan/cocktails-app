class cocktailAPI{
     async getCocktailName(name){
         const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}
         `)
      

     const cocktails = await apiResponse.json();

     return {
         cocktails
     }
    }

    // get recipies by ingredient
    async getCocktailIngredient(ingredient){
        // search by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        // wait for response retuen api

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    
    }

    // getsinglerecipe
    async getSingleRecipe(id){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}
        `);

        // wait for response retuen api

        const recipe = await apiResponse.json();

        return {
            recipe
        }
    }

// retrieves all categories 
async getCategories(){
    const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    
    const categories = await apiResponse.json();

    return {
        categories
    }
}

    // get drinks by category
    async getDrinksCategory(category){
       
            const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    
            // wait for response retuen api
    
            const cocktails = await apiResponse.json();
    
            return {
                cocktails
            }
        
        }
    
        // get alcohol/non alcohol
        async getDrinksAlcohol(term){
            const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
    
            // wait for response retuen api
    
            const cocktails = await apiResponse.json();
    
            return {
                cocktails
            }
        
        }

}




