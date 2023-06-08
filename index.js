const url = "http://localhost:3000/houses"
const bedroomSelect = document.getElementById("bedroom-select")
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
const form = document.querySelector('#reviews-form')

init();
function init() {
    fetch(url)
        .then(r => r.json())
        .then(HouseObjArr => {
            renderDisplayList(HouseObjArr);
            handleSelect(HouseObjArr);
            handleForm();
        })
}

function renderDisplayList(arrHouseData) {
    arrHouseData.forEach(house => renderHomes(house))
}

function renderHomes(house) {
    const eachHouse = document.createElement("div");
    eachHouse.classList.add("thumbnail-img");
    eachHouse.classList.add("image-div");
    const eachHouseImg = document.createElement("img");

    handleClick(eachHouseImg, eachHouse, house)
    //put html elements on page
    eachHouseImg.src = house.image;
    eachHouse.appendChild(eachHouseImg);
    showHouses.appendChild(eachHouse);
}

function handleClick(eachHouseImg, eachHouse, house) {
    eachHouse.addEventListener("click", function (e) {
        if (e.target.localName === "img") {
            details.remove();
            const allHouses = document.querySelectorAll(".thumbnail-img");
            clearBorderOutline(allHouses, e.target.src);
            eachHouseImg.classList.toggle("selected");

            //rendering to page here
            renderHouseToMain(house);
            renderReviews(house);
        }
    })
}

function renderHouseToMain(house) {
    showBedrooms.textContent = `No. of Bedrooms: ${house.bedrooms}`;
    showBathrooms.textContent = `No. of Bathrooms: ${house.bathrooms}`;
    showCity.textContent = `City: ${house.city}`;
    showState.textContent = `State: ${house.state}`;
    showZip.textContent = `Zip Code: ${house.zipCode}`;
    //mainDisplay.src = e.target.currentSrc;
    mainDisplay.src = house.image;
}

function renderReviews(house) {
    const li = document.createElement("li");
    li.textContent = house.review;
    reviews.innerHTML = "";
    reviews.appendChild(li);
}

function handleForm() {
    form.addEventListener('submit', (e) => submitReview(e))
}

function submitReview(e) {
    e.preventDefault()

    let newReview = e.target['new-reviews'].value
    if (newReview !== '' && reviews.innerText !== '') {
        let li = document.createElement('li')
        li.textContent = newReview;
        reviews.appendChild(li);
        document.getElementById('reviews-form').reset()
    }
    document.getElementById('reviews-form').reset()
}

function handleSelect(houseData = []) {
    let filter = [];
    bedroomSelect.addEventListener('change', (e) => {
        filter = updateDisplay(e.target, houseData);
        bathroomSelect.selectedIndex = 0;
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

function updateDisplay(select, houseArray) {
    if (select.value === "all") {
        clearList();
        renderDisplayList(houseArray);
        return [];
    }

    else {
        const filteredList = houseArray.filter(house => house[select.name] === parseInt(select.value));
        if (filteredList.length === 0) {
            clearList();
            showHouses.textContent = "THERE ARE NO MATCHES: PLEASE SELECT ANOTHER OPTION"
            bathroomSelect.selectedIndex = 0;
        }
        else {
            clearList();
            renderDisplayList(filteredList);
        }
        return filteredList;
    };
}

function clearList() {
    showHouses.innerHTML = '';
}

function clearBorderOutline(houses, currentHouse) {
    houses.forEach(house => {
        if (currentHouse !== house.children[0].src) {
            house.children[0].classList = "";
        }
    });
}