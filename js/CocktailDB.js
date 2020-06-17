class CocktailDB {
    // save recipies into storage
    saveIntoDB(drink){
        const drinks = this.getFromDB();

        drinks.push(drink);

        localStorage.setItem('drinks', JSON.stringify(drinks));
    }
    // remove element from localStorage
    removeFromDB(id){
        const drinks = this.getFromDB();

        drinks.forEach((drink, index) => {
            if(id === drink.id){
                drinks.splice(index, 1);
            }
        });
        // set array into ls
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // return recipies from storage
    getFromDB(){
        let drinks;
        // check from storage
        if(localStorage.getItem('drinks') === null){
            drinks = [];
        } else {
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks;
    }
}