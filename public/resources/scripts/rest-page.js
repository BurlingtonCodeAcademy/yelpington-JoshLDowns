let id = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);

let basicInfo = document.getElementById('rest-basic');
let restDetail = document.getElementById('rest-detail');
let restComments = document.getElementById('rest-comments');
let home = document.getElementById('home');

home.addEventListener('click', ()=> {
    window.location='/index.html';
});

function buildRestData() {
    fetch(`../resources/api/${id}.json`).then((data) => {
        return data.json()
    }).then((object) => {
        return object;
    }).then((singleRest) => {
        let myMap = L.map('rest-map').setView(JSON.parse(singleRest.coords), 14.5);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/dark-v10',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoiam9zaGxkb3ducyIsImEiOiJjazdkcDc0YXkwMGhtM2xwandocjRnb3piIn0.z7T6hs0PGj-jhNBGqV6yDQ'
        }).addTo(myMap);

        let marker = L.marker(JSON.parse(singleRest.coords)).addTo(myMap);
        marker.bindPopup(`<p class = "popup-text" style = "margin: .5px; text-align: center; background-color: white;">${singleRest.name}</br>${singleRest.address}</p>`);

        let name = singleRest.name;
        let address = singleRest.address;
        let phone = singleRest.phone;
        let website = singleRest.website;
        let hours = singleRest.hours;
        let notes = singleRest.notes;
        let infoHTML = `<ul>`;

        basicInfo.innerHTML+=`<h3>${name}</h3>`;
        basicInfo.innerHTML+=`<p class='rest-info'>Phone: ${phone}<br><br>Address: ${address}<br><br>Hours: ${hours}</p>`;
        basicInfo.innerHTML+=`<a href='${website}' target='_blank' class='rest-info'>Website</a>`;

        singleRest.notes.forEach((note)=>{
            infoHTML += `<li class='main-info'>${note}</li>`
        })

        infoHTML += `</ul>`

        restDetail.innerHTML+=`${infoHTML}`

    })
}