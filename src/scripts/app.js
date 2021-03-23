"use strict";

const form = document.querySelector('.form');
const optionInput = document.getElementById('optionInput');
const optionList = document.getElementById('option-list');
const btnGo = document.getElementById('go');
const result = document.querySelector('.result');

var options = [];
var optionCount = 0;
var resultOption;

form.addEventListener('submit', (e) => {
    //Empêche le naviguateur de recharger, récupère la valeur du input, vide le input
    e.preventDefault();
    let inputValue = optionInput.value;
    optionInput.value = "";

    //Si le input n'est pas vide
    if (inputValue != "") {
        //Push la valeur dans un tableau
        options.push(inputValue);

        //Affiche la valeur à l'écran
        let li = document.createElement('li');
        let p = document.createElement('p');
        li.classList.add('option-list-el');
        p.innerHTML = inputValue;
        li.appendChild(p);
        optionList.appendChild(li);

        li.setAttribute('data-option', optionCount);
        optionCount++;
        
        //Supprimer la valeur en cliquant dessus
        li.addEventListener('click', (e) => {
            console.log(optionCount);
            let number = li.getAttribute('data-option');
            options[number] = 'deleted';
            li.remove();   
            console.log(options);
        });
    }else{
        console.log('Vous devez entrer un texte');
    }
});

btnGo.addEventListener('click', (e) => {
    //Cherche sélectionne aléatoirement un mot et recommence si il s'agit de "deleted" 
    do {
        resultOption = options[Math.floor(Math.random() * options.length)];
    } while (resultOption === "deleted");

    result.innerHTML = resultOption;
    console.log(options);
});