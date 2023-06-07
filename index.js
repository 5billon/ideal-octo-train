const url = "http://localhost:3000/houses"
const bedroomSelect = document.getElementById("bedroom-select")
const thumbnailList = document.getElementById('house-list')
const bathroomSelect = document.getElementById("bathroom-select")
const mainDisplay = document.getElementById("main-display");
const details = document.getElementById("details");
const showHouses = document.getElementById("house-list");
const showBedrooms = document.getElementById("bedrooms");
const showBathrooms = document.getElementById("bathrooms");
const showCity = document.getElementById("city");
const showState = document.getElementById("state");
const showZip = document.getElementById("zipcode");
const reviews = document.querySelector('#past-reviews')

function getHouseData (){ 
    fetch (url)
    .then (r => r.json())
    .then (houseData =>{
        renderDisplayList(houseData);
        handleChangeEvent(houseData, bathroomSelect);
        handleChangeEvent(houseData, bedroomSelect);
    })
}
getHouseData();

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
                reviews.textContent = house.review
                
            })
            const eachHouseImg = document.createElement("img");
            eachHouseImg.src = house.image;
            eachHouse.appendChild(eachHouseImg);
            showHouses.appendChild(eachHouse);
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
function renderDisplayList(arrHouseData){
    arrHouseData.forEach(house =>{
        renderHomes(house);
    })
}
function handleChangeEvent(houseData =[], selectEl){
    selectEl.addEventListener('change', (e) =>{
        if(e.target.value === "all"){
            renderDisplayList(houseData);
        }
        else {
           const filteredList = filterBy(houseData, e.target.name, e.target.value);
           clearList();
            renderDisplayList(filteredList)
        };
    })
  
}
function filterBy (arrHouseData, option, size){
    const filteredHomes = arrHouseData.filter(house => house[option] === parseInt(size));
    return filteredHomes;
}
function clearList(){
    thumbnailList.innerHTML = '';
}