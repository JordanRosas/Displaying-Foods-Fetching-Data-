
function createAndAppendEls(name, type, ethnicity, barcode ){
    let foodSections = document.createElement("section");
    let foodName = document.createElement("h2");
    let foodType = document.createElement("p");
    let foodEth = document.createElement("p");
    let foodInfo = document.createElement('p');


    foodSections.appendChild(foodName);
    foodName.innerHTML = (name);

    foodSections.appendChild(foodType);
    foodType.innerHTML = (type);

    foodSections.appendChild(foodEth);
    foodEth.innerHTML = (ethnicity);

    foodSections.appendChild(foodInfo);
    foodInfo.innerHTML = (barcode)

    
    return foodSections;
}
// createAndAppendEls()

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food =>  {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.barcode = (productInfo.product.ingredients_text)
                    const foodAsHtml =  createAndAppendEls(food.name, food.type, food.ethnicity, food.barcode);
                    appendToDom(foodAsHtml)
                    console.table(parsedFoods)
            })
        })  // console.log(parsedFoods)
    })

function appendToDom (foodAsHtml){
    let container = document.querySelector("#foodList");
    container.appendChild(foodAsHtml);
}

//=================================open food api========================================

