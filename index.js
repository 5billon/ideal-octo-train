/// select option filtering the displayed thumbnails

const url = "http://localhost:3000/houses"
const bedroomSelect = document.getElementById("bedroom-select")
const thumbnailList = document.getElementById('house-list')
const bathroomSelect = document.getElementById("bathroom-select")

///fetch 

function getHouseData (){
    fetch (url)
    .then (r => r.json())
    .then (houseData =>{
        renderDisplayList(houseData);
        handleChangeEvent(houseData);
    })
}

getHouseData();


function renderDisplayList(arrHouseData){
    arrHouseData.forEach(house =>{
        const card = document.createElement('div');
        const thumbImg = document.createElement('img');
        thumbImg.src=house.image;
        thumbImg.alt='house';
        card.append(thumbImg);

        const blurb = document.createElement('p');
        blurb.textContent = `${house.city}, ${house.state}`;
        card.append(blurb);

        thumbnailList.append(card);
    })



}
function handleChangeEvent(houseData =[]){
    bedroomSelect.addEventListener('change', (e) =>{
        if(e.target.value === "all"){
            renderDisplayList(houseData);
        }
        else filterBy(houseData, e.target.name, e.target.value);
    })

    bathroomSelect.addEventListener('change', (e) =>{
        if(e.target.value === "all"){
            renderDisplayList(houseData);
        }
        else filterBy(houseData, e.target.name, e.target.value);
    })    
}

function filterBy (arrHouseData, option, size){
    const filteredHomes = arrHouseData.filter(house => house[option] === parseInt(size));
    clearList()
    renderDisplayList(filteredHomes);
}

function clearList(){
    thumbnailList.innerHTML = '';
}

