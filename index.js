/// select option filtering the displayed thumbnails

const url = "http://localhost:3000/houses"
const bedroomSelect = document.getElementById("bedroom-select")
const thumbnailList = document.getElementById('house-list')
const bathroomSelect = document.getElementById("bathroom-select")

///fetch 

function getHouseData (){ //function for fetching from db //shrared
    fetch (url)
    .then (r => r.json())
    .then (houseData =>{
        houseData.forEach((house) => renderHomes(house))
        renderDisplayList(houseData);
        handleChangeEvent(houseData, bathroomSelect);
        handleChangeEvent(houseData, bedroomSelect);
    })
}

getHouseData();


function renderDisplayList(arrHouseData){ //function to render // shared
    arrHouseData.forEach(house =>{
        //creates holder for img and places created img in holder
        const card = document.createElement('div');
        const thumbImg = document.createElement('img');
        thumbImg.src=house.image;
        thumbImg.alt='house';
        card.append(thumbImg);

        //adds additonal info along with img to page
        const blurb = document.createElement('p');
        blurb.textContent = `${house.city}, ${house.state}`;
        card.append(blurb);

        thumbnailList.append(card);
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

