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

function getHouseData (){ //function for fetching from db //shrared
    fetch (url)
    .then (r => r.json())
    .then (houseData =>{
        renderDisplayList(houseData);
        handleChangeEvent(houseData, bathroomSelect);
        handleChangeEvent(houseData, bedroomSelect);
    })
}

getHouseData();

/*fetch('http://localhost:3000/houses')
    .then(r => r.json())
    .then(houses => houses.forEach((house) => renderHomes(house)))*/

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

/// select option filtering the displayed thumbnails


///fetch 
function renderDisplayList(arrHouseData){ //function to render // shared
    arrHouseData.forEach(house =>{
        renderHomes(house);
        //creates holder for img and places created img in holder
        /*const card = document.createElement('div');
        const thumbImg = document.createElement('img');
        thumbImg.src=house.image;
        thumbImg.alt='house';
        card.append(thumbImg);

        //adds additonal info along with img to page
        const blurb = document.createElement('p');
        blurb.textContent = `${house.city}, ${house.state}`;
        card.append(blurb);

        thumbnailList.append(card);*/
    })



}

function handleChangeEvent(houseData =[], selectEl){  //event listener to select tag that handles changes // my feature
    selectEl.addEventListener('change', (e) =>{
        if(e.target.value === "all"){
            renderDisplayList(houseData); //shared
        }
        else {
           const filteredList = filterBy(houseData, e.target.name, e.target.value);
           clearList();
            renderDisplayList(filteredList)
        };
    })

    // bathroomSelect.addEventListener('change', (e) =>{
    //     if(e.target.value === "all"){
    //         renderDisplayList(houseData); //shared
    //     }
    //     else filterBy(houseData, e.target.name, e.target.value);
    // })    
}

function filterBy (arrHouseData, option, size){ //perform filter of house data to choose items with desired size //my feature
    const filteredHomes = arrHouseData.filter(house => house[option] === parseInt(size));
    return filteredHomes; //shared
}

function clearList(){  //clears displayed list //maybe shared
    thumbnailList.innerHTML = '';
}
