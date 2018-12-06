//creates the section and its contents using string template
foodFactory = (food) =>{
    let HTMLfoodSection = (`
    <section>
        <h2>${food.name}</h2>
        <p>${food.type}</p>
        <p>${food.ethnicity}</p>
        <p>${food.ingredients}</p>
        <p>${food.fat}</p>
        <p>${food.sugar}</p>
    </section>
    `)

    return HTMLfoodSection;

}

//initial fetch goes to the database.json 
fetch("http://localhost:8088/food")

//get the data and make it readable/usable to JS
    .then(foods => foods.json())

//take that response and do the following
    .then(parsedFoods => {

//for each iteration of the loop take the current food object 
        parsedFoods.forEach(food =>  {
//take the barcode key of the food object and then return the information pertaining to the specific item
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
//this returns a HUGE object so - get the data and make it readable/usable to JS
                .then(response => response.json())
//take that parsed informaiton and do the following 
                .then(productInfo => {
                    //extracting specific data from the obj | each of these create new key value pairs in the data.
                    food.ingredients = productInfo.product.ingredients_text;
                    food.origin = productInfo.product.countries;
                    food.fat = productInfo.product.nutriments.fat_serving;
                    food.sugars = productInfo.product.nutriments.sugars;
                    /*calling the food factory function and creting the section element with its contents appended. 
                    assigning that element to the foodAsHtml container*/
                    const foodAsHtml = foodFactory(food);

                    /*calling the appendToDom function passing in the foodAsHtml becuase thats what will be rendered to 
                    the page*/
                    appendToDom(foodAsHtml)

                    //displaying a table to just read the data a little easier
                    console.table(parsedFoods)
            })
        }) 
    })

//function to append items to the DOM
function appendToDom (foodAsHtml){
    const articleContainer = document.querySelector("#foodList");
    articleContainer.innerHTML += foodAsHtml
}
/*because in foodFactory we are returning a string we cannot use appendChild()
becuase we are returned a string not a type of node. so I used innerHTML += 
becuase innerHTML over rides itself so just using innerHTML + foodAsHtml when we run the server we would see
each food but one at a time and would stop on the last object. By using innerHTML += 
it cant over ride itself so we will see all components on the page. */
