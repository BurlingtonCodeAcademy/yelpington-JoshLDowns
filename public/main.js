let myMap = L.map('map').setView([44.478166, -73.214242], 14.5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoiam9zaGxkb3ducyIsImEiOiJjazdkcDc0YXkwMGhtM2xwandocjRnb3piIn0.z7T6hs0PGj-jhNBGqV6yDQ'
}).addTo(myMap);

let restList = document.getElementById('rest-scroll');
let markers = {}


function buildMapItems() {
    fetch('rest-list.json').then((data) => {
        return data.json()
    }).then((objectArray) => {
        objectArray.forEach((object) => {
            restList.innerHTML += `<p id="${object.id}" class="rest-list-item">${object.name}</p><div class='rest-list-hidden'><p>${object.category}</p><p>Price: ${object.price}</p><p>Phone: ${object.phone}<p><a class= 'inner-link-text' href='rest-page/${object.id}'>Learn More!</a></div>`
            let currentMarker = L.marker(JSON.parse(object.coords)).addTo(myMap);
            markers[object.id] = currentMarker;
            currentMarker.bindPopup(`<p class = "popup-text" style = "margin: .5px; text-align: center; background-color: white;">${object.name}</br>${object.address}</p>`)
        })
        return objectArray;
    }).then(() => {
        let scrollDivs = Array.from(document.getElementsByClassName('rest-list-item'));
        scrollDivs.forEach((element) => {
            element.addEventListener('click', () => {
                let visibleDivs = Array.from(document.getElementsByClassName('rest-list-visible'));
                visibleDivs.forEach((div) => { div.className = 'rest-list-hidden' })
                let currentId = event.target.id;
                let sibling = document.getElementById(currentId).nextElementSibling;
                sibling.className = 'rest-list-visible';
                sibling.scrollIntoView({behavior: 'smooth', block: 'center'});
                markers[currentId].fire('click');
            })
        })
    })
}