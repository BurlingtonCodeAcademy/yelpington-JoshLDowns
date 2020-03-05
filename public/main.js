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



function buildMapItems () {
    fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants').then((data)=>{
    return data.json()
}).then((objectArray)=>{

    objectArray.forEach((object)=>{
        restList.innerHTML += `<p class="rest-list-item">${object.name}</p>`
        placeMarker(object.address);
    })

})
}

function placeMarker(address) {

    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
         .then(res => {
             return res.json()})
         .then(jsonObj => {
             let lat = jsonObj[0].lat
             let lon = jsonObj[0].lon
             L.marker([lat, lon]).addTo(myMap);
         })
 }








 let popup = L.popup();
function onMapClick(event) {
    popup.setLatLng(event.latlng).setContent("You clicked the map at: " + event.latlng.toString()).openOn(myMap);
}

myMap.on('click', onMapClick);