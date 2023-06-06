const mainDisplay = document.getElementById("main-display");
const details = document.getElementById("details");
const showHouses = document.getElementById("house-list");
const showBedrooms = document.getElementById("bedrooms");
const showBathrooms = document.getElementById("bathrooms");
const showCity = document.getElementById("city");
const showState = document.getElementById("state");
const showZip = document.getElementById("zipcode");
const homeReviews = document.getElementById("home-reviews");


fetch('http://localhost:3000/houses')
    .then(r => r.json())
    .then(houses => houses.forEach((house) => renderHomes(house)))

function renderHomes(house){
    console.log(house);
            const eachHouse = document.createElement("div");
            eachHouse.addEventListener("click", function(e){
                
                details.innerHTML= "";
                mainDisplay.src = e.target.currentSrc;

                showBedrooms.textContent = `No. of Bedrooms: ${house.bedrooms}`;
                showBathrooms.textContent = `No. of Bathrooms: ${house.bathrooms}`;
                showCity.textContent = `City: ${house.city}`;
                showState.textContent = `State: ${house.state}`;
                showZip.textContent = `Zip Code: ${house.zipCode}`;
                homeReviews.textContent = `Reviews: ${house.review}`;
            })
            const eachHouseImg = document.createElement("img");
            eachHouseImg.src = house.image;
            eachHouse.appendChild(eachHouseImg);
            showHouses.appendChild(eachHouse);
}
