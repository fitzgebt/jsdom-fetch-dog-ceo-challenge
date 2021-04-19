// const { json } = require("body-parser")

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const btn = document.querySelector('#btn');
const sb = document.querySelector('#select-breed')
let freshPage = true
let breeds = []
const container = document.querySelector('#dog-breeds');

console.log('%c HI', 'color: firebrick')

function fetchDogs() {
    return fetch (imgUrl).then(resp => resp.json()).then(json => renderDogs(json))
}

function renderDogs(dogs) {
    const dogDiv = document.getElementById('dog-image-container');
    dogs.message.forEach(dog => {
        const dogImg = document.createElement('img');
        dogImg.src = dog;
        dogDiv.appendChild(dogImg);
    });
}

function fetchBreeds() {
    let breedUl = document.getElementById('dog-breeds');
    return fetch (breedUrl).then(resp => resp.json()).then(json => {
        breeds = Object.keys(json.message);
        removeAllChildNodes(breedUl);
        breeds.forEach(breed => {
            let newBreed =document.createElement('li');
            newBreed.innerText = breed;
            breedUl.appendChild(newBreed)
        })
        addBreedSelectListener();
    })
}

// function renderBreeds(target) {
//     const breedUl = document.getElementById('dog-breeds');
//     target = Object.keys()
//     for (const key in target) {
//         if(typeof target[key] === 'object') {
//             for (const nestedKey in target[key]) {
//                 const newBreed = document.createElement('li');
//                 newBreed.setAttribute('id', nestedKey)
//                 newBreed.innerHTML = `${nestedKey} : ${target[key][nestedKey]}`;
//                 if (freshPage)
//                     breedUl.appendChild(newBreed);
//             }
//         } else {
//             const newBreed = document.createElement('li');
//             newBreed.setAttribute('id', target[key])
//             newBreed.innerHTML = target[key];
//             breedUl.appendChild(newBreed);
//         }
//     }
// }
function removeAllChildNodes(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function breedLi(breeds) {
    let breedUl = document.querySelector('#dog-breeds');
        removeAllChildNodes(breedUl);
        breeds.forEach(breed => {
            let newBreed =document.createElement('li');
            newBreed.innerText = breed;
            breedUl.appendChild(newBreed)
        })
}

function addBreedSelectListener() {
    let breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
    //   selectBreedsStartingWith(event.target.value);
    debugger
        breedLi(breeds.filter(breed => breed.startsWith(event.target.value)))

    });
  }





document.addEventListener('DOMContentLoaded', function() {
    fetchDogs();

    fetchBreeds();

    document.getElementById('dog-breeds').addEventListener('click', function(event) {
        if (event.target && event.target.nodeName == 'LI') {
            const color = event.target.style.color;
            event.target.style.color = color? '': 'red';;
        }
    });
    
});
