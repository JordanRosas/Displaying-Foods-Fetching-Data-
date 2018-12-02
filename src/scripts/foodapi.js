
function createAndAppendEls(name, type, ethnicity){
    let container = document.querySelector('#foodList');
    let foodSections = document.createElement('section');
    let foodName = document.createElement('h2');
    let foodType = document.createElement('p');
    let foodEth = document.createElement('p');

    container.appendChild(foodSections);
    foodSections.appendChild(foodName);
    foodName.innerHTML = (name);

    foodSections.appendChild(foodType);
    foodType.innerHTML = (type);

    foodSections.appendChild(foodEth);
    foodEth.innerHTML = (ethnicity);
    
    
    

}
// createAndAppendEls()

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(function (allFoods){
            createAndAppendEls(allFoods.name, allFoods.type, allFoods.ethnicity)
            console.table(allFoods)
        })  // console.log(parsedFoods)
    })


