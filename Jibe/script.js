class Dish {
    constructor(name, country, prepTime, servings, ingredients,  description, nutrition, allergies, image, month) {
        this.name = name;
        this.country = country;
        this.prepTime = prepTime;
        this.servings = servings;
        this.ingredients = ingredients;
        this.description = description;
        this.nutrition = nutrition;
        this.allergies = allergies;
        this.image = image;
        this.month = month;
    }
    
    // Inside your dish class or object
    generateHTML() {
        const newName = this.name.toLowerCase().replace(/ /g, '-');
        console.log(this.name);
        return `
        <div class="food-item" onclick="setDishData('${this.name}', '${this.country}', '${this.prepTime}', '${this.servings}', '${this.description}', '${this.nutrition}', '${this.allergies}', '${this.image2})">
            <img src="${this.image}" alt="${this.name}">
            <a href="foodPages/${newName}.html" class="foodButton0">
                <div class="overlay">
                    <h3>${this.name}</h3>
                </div>
            </a>
        </div>
        `;
    }
    
    insertHTML(id) {
        const container = document.getElementById(id); // Use the single container
        container.innerHTML += this.generateHTML(); // Add the HTML to the unified container
    }
    
    
}

function setDishData(name, country, prepTime, servings, description, nutrition, allergies, image, image2) {
        const dishData = {
            name,
            country,
            prepTime,
            servings,
            description,
            nutrition,
            allergies,
            image,
            image2
        };
    
    localStorage.setItem('selectedDish', JSON.stringify(dishData));
}


const dishes = [[],[],[],[],[],[],[],[],[],[],[],[]];
try {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        for(let i=0;i<data.length;i++){
            const dish = new Dish(data[i].name,data[i].country,data[i].prepTime,data[i].servings,data[i].ingredients,data[i].description,data[i].nutrition,data[i].allergies,data[i].image,data[i].month);
            dishes[(data[i].month)- 1].push(dish);
        }

        const months = {
            January:0,
            February:1,
            March:2,
            April:3,
            May:4,
            June:5,
            July:6,
            August:7,
            September:8,
            October:9,
            November:10,
            December:11
        }

        const date = new Date();
        const options = { month: 'long'};
        const thisMonth = date.toLocaleDateString('en-US', options);
        
        //dishes[months[thisMonth]-1][0].innerHTML(3);
        for (let i = 0; i < 6; i++) {
            // Adjust your logic to fit in one container
            if(i<3){
                dishes[months[thisMonth]][i].insertHTML("foodContainer0");
            } else { 
                dishes[months[thisMonth] - 1][i - 3].insertHTML("foodContainer1");
        }
        }})
    } catch (error) {
    console.error('Error fetching json data:', error);
}

function getMonth(){
    const date = new Date();
    const options = { month: 'long'};
    return date.toLocaleDateString('en-US', options);
}

document.getElementById("currentMonth").textContent = getMonth();
