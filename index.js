fetch('http://localhost:3000/houses')
    .then(r => r.json())
    .then(houses => houses.forEach((house) => renderHomes(house)))

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

function renderHomes(test) {
    let reviews = document.querySelector('#past-reviews')
    reviews.textContent = test.review
} 