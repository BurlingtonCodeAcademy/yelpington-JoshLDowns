//-------------------restaurant page script-----------------------//

//------------------- variable declaration -----------------------//

//window id for searching api
let id = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);

//DOM elements
let basicInfo = document.getElementById('rest-basic');
let restDetail = document.getElementById('rest-detail');
let restComments = document.getElementById('rest-comments');
let home = document.getElementById('home');
let userID = document.getElementById('user-name');
let userComment = document.getElementById('comment-input');
let commentButton = document.getElementById('comment-button');
let userCommentScroll = document.getElementById('comment-scroll');

//-----this button exists for testing purposes only-----//
/*let clearButton = document.getElementById('test-button');

clearButton.addEventListener('click', ()=>{
    window.localStorage.clear();
    location.reload();
})*/
//------------------------------------------------------//

//event listener for home div
home.addEventListener('click', () => {
    window.location = '/index.html';
});

//determines if local storage has any stored data, and sets initial comment data
if (window.localStorage.getItem(`${id}`) === null) {
    window.localStorage.setItem(`${id}`, `<h3>There doesn't seem to be anything here!</h3>`);
}

//loads all comments in local storage on page load
window.addEventListener('load', () => {
    userCommentScroll.innerHTML = window.localStorage.getItem(`${id}`);
});

//event listener for adding comments to local storage
commentButton.addEventListener('click', buildComments)

//function to build single restaurant data
function buildRestData() {
    //gathers info from local api based on page id
    fetch(`../resources/api/${id}.json`).then((data) => {
        return data.json()
    }).then((object) => {
        return object;
    }).then((singleRest) => {
        //defines coordinates for building the map
        let coordinates = JSON.parse(singleRest.coords)

        //builds map based on selected restaurant and places marker
        let myMap = L.map('rest-map').setView([coordinates[0], (coordinates[1] + .00185)], 14.5);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/dark-v10',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoiam9zaGxkb3ducyIsImEiOiJjazdkcDc0YXkwMGhtM2xwandocjRnb3piIn0.z7T6hs0PGj-jhNBGqV6yDQ'
        }).addTo(myMap);

        let marker = L.marker([coordinates[0], (coordinates[1] + .00185)]).addTo(myMap);
        marker.bindPopup(`<p class = "popup-text" style = "margin: .5px; text-align: center; background-color: white;">${singleRest.name}</br>${singleRest.address}</p>`);


        //define variables to represent all the restaurant data
        let name = singleRest.name;
        let address = singleRest.address;
        let phone = singleRest.phone;
        let website = singleRest.website;
        let hours = singleRest.hours;
        let notes = singleRest.notes;
        let infoHTML = `<ul>`;

        //build the HTML to fill the restaurant information divs
        basicInfo.innerHTML += `<h3>${name}</h3>`;
        basicInfo.innerHTML += `<p class='rest-info'>Phone: ${phone}<br><br>Address: ${address}<br><br>Hours: ${hours}</p>`;
        basicInfo.innerHTML += `<a href='${website}' target='_blank' class='rest-info'>Website</a>`;

        singleRest.notes.forEach((note) => {
            infoHTML += `<li class='main-info'>${note}</li>`
        })

        infoHTML += `</ul>`

        restDetail.innerHTML += `${infoHTML}`

    })
}


//on click function for submit comment button
function buildComments() {
    //local variable declaration
    let commentHTML = ``;
    let userName = userID.value;
    let comment = userComment.value;

    //checks to make sure both inputs are filled in
    if (userName === '' || comment === '') {
        window.alert('Please fill in both fields if you want to leave a comment!')
    } else {
        //HTML to be added to div
        commentHTML = `<div class='single-comment'><h3>${userName}  says:</h3><p class='comment-list'>${comment}</p></div>`;

        //determines if there are comments to append, or if this is the first comment
        if (window.localStorage.getItem(`${id}`) === `<h3>There doesn't seem to be anything here!</h3>`) {
            window.localStorage.setItem(`${id}`, commentHTML);
        } else {
            let currentHTML = window.localStorage.getItem(`${id}`);
            window.localStorage.setItem(`${id}`, currentHTML + commentHTML);
        }

        //reloads page so comment will be displayed
        location.reload();
    }
}