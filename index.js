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


function getHouseData() {
    fetch(url)
        .then(r => r.json())
        .then(houseData => {
            renderDisplayList(houseData);
            handleSelect(houseData);
        })
}
getHouseData();


function renderHomes(house){
            const eachHouse = document.createElement("div");
            eachHouse.classList.add("thumbnail-img");
            eachHouse.classList.add("image-div");
            const ul = document.getElementById("past-reviews");
            const eachHouseImg = document.createElement("img");
            eachHouse.addEventListener("click", function(e){
                if(e.target.localName === "img"){
                    details.remove();
                    const allHouses = document.querySelectorAll(".thumbnail-img");
                    console.log(e)
                    clearBorderOutline(allHouses, e.target.src);
                    eachHouseImg.classList.toggle("selected");
                    mainDisplay.src = e.target.currentSrc;
                    const li = document.createElement("li");
                    li.textContent = house.review;
                    ul.innerHTML = "";
                    ul.appendChild(li);
    
                    showBedrooms.textContent = `No. of Bedrooms: ${house.bedrooms}`;
                    showBathrooms.textContent = `No. of Bathrooms: ${house.bathrooms}`;
                    showCity.textContent = `City: ${house.city}`;
                    showState.textContent = `State: ${house.state}`;
                    showZip.textContent = `Zip Code: ${house.zipCode}`;
                    // reviews.textContent = house.review;
                }
                
            })
            
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
    // li.appendChild(document.createTextNode(newReview));
    li.textContent = newReview;
    ul.appendChild(li);
}

function renderDisplayList(arrHouseData) {
    arrHouseData.forEach(house => {

        renderHomes(house);
    })

}

function updateDisplay(select, houseArray) {
    if (select.value === "all") {
        clearList();
        renderDisplayList(houseArray);
        return [];
    }
    else {
        const filteredList = filterBy(houseArray, select.name, select.value);
        if (filteredList.length === 0) {
            clearList();
            thumbnailList.textContent = "THERE ARE NO MATCHES"
        }
        else {
            clearList();
            renderDisplayList(filteredList);
        }

        return filteredList;
    };
}
function handleSelect(houseData = []) {
    let filter = [];
    bedroomSelect.addEventListener('change', (e) => {
        filter = updateDisplay(e.target, houseData);
    });

    bathroomSelect.addEventListener('change', (e) => {
        if (filter.length !== 0) {
            updateDisplay(e.target, filter);

        }
        else {
            updateDisplay(e.target, houseData)
        }
    })

}

function filterBy(arrHouseData, option, size) {
    const filteredHomes = arrHouseData.filter(house => house[option] === parseInt(size));
    return filteredHomes;
}

function clearList() {

    thumbnailList.innerHTML = '';
}
function clearBorderOutline(houses, currentHouse){
    houses.forEach(house=>{
        if(currentHouse !== house.children[0].src){
            house.children[0].classList = "";
        }
    });
}

