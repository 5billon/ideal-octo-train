const mainDisplay = document.getElementById("main-display");
const details = document.getElementById("details");
const showHouses = document.getElementById("house-list");
const showBedrooms = document.getElementById("bedrooms");
const showBathrooms = document.getElementById("bathrooms");
const showCity = document.getElementById("city");
const showState = document.getElementById("state");
const showZip = document.getElementById("zipcode");
const reviews = document.querySelector('#past-reviews')


fetch('http://localhost:3000/houses')
    .then(r => r.json())
    .then(houses => houses.forEach((house) => renderHomes(house)))

function renderHomes(house){
            const eachHouse = document.createElement("div");
            eachHouse.addEventListener("click", function(e){
                
                details.remove();
                mainDisplay.src = e.target.currentSrc;

                showBedrooms.textContent = `No. of Bedrooms: ${house.bedrooms}`;
                showBathrooms.textContent = `No. of Bathrooms: ${house.bathrooms}`;
                showCity.textContent = `City: ${house.city}`;
                showState.textContent = `State: ${house.state}`;
                showZip.textContent = `Zip Code: ${house.zipCode}`;
                
            })
            const eachHouseImg = document.createElement("img");
            eachHouseImg.src = house.image;
            eachHouse.appendChild(eachHouseImg);
            showHouses.appendChild(eachHouse);
            reviews.textContent = house.review
}

const form = document.querySelector('#reviews-form')
form.addEventListener('submit', (e) => submitReview(e))

function submitReview(e) {
    e.preventDefault()

    let newReview = e.target['new-reviews'].value
    let ul = document.getElementById('past-reviews')
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(newReview))
    ul.appendChild(li)
}