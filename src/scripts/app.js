"use strict";

//Génère un dégradé aléatoire
const body = document.querySelector('body');
var randomColor = randomMinMax(0,360),
    randomColor2 = (randomMinMax(0,360) - 10);

if ((randomColor2) < 0) {
    randomColor2 = randomColor2 * -1;
}

var color1 = HSLToHex(randomColor, randomMinMax(60,80), 50),
    color2 = HSLToHex(randomColor2, randomMinMax(60,80), randomMinMax(30,50)),
    color3 = HSLToHex(randomColor, 70, 50);

const btns = document.querySelectorAll('.btn');
btns.forEach(element => {
    element.style.backgroundColor = color3;
});

createSvg(color1, color2);


//Sélectionne une réponse - vars
const form = document.querySelector('.form'),
      optionInput = document.getElementById('optionInput'),
      optionList = document.getElementById('option-list'),
      btnGo = document.getElementById('go'),
      result = document.querySelector('.result');

const optionEl = [];
var options = [];
var optionCount = 0;
var resultOption;

if (body.hasAttribute('class', 'locked-goBtn' == true)) {
    disabledBtnGo(true);
}

//Sélectionne une réponse
form.addEventListener('submit', (e) => {
    //Empêche le naviguateur de recharger, récupère la valeur du input, vide le input
    e.preventDefault();
    let inputValue = optionInput.value;
    optionInput.value = "";
    
    //Si le input n'est pas vide
    if (inputValue != "") {
        disabledBtnGo(false);
        //Push la valeur dans un tableau
        options.push(inputValue);

        //Affiche la valeur à l'écran
        let li = document.createElement('li');
        let p = document.createElement('p');
        li.classList.add('option-list-el');
        li.style.backgroundColor = color3;
        p.innerHTML = inputValue;
        li.appendChild(p);
        optionList.appendChild(li);
        optionEl.push(li);

        li.setAttribute('data-option', optionCount);
        optionCount++;

        //Supprimer la valeur en cliquant dessus
        li.addEventListener('click', (e) => {
            //Delete animation
            gsap.to(li, {
                opacity: 0,
                scale: 0.4,
                duration: 0.4,
                ease: "out",
                onComplete: deleteElement,
                onCompleteParams: [li]
            });

            let number = li.getAttribute('data-option');
            options[number] = 'deleted';   
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
    body.classList.add('show-result');
});



// boutons "encore" et "nouveau"
const redoBtn = document.getElementById('redo');
const againBtn = document.getElementById('again');

redoBtn.addEventListener('click', (e) => {
    body.classList.remove('show-result');
})

againBtn.addEventListener('click', (e) => {
    alert('comming soon...');
})


function deleteElement(element) {
    console.log(options.length);
    var condition = 0;
    for (let i = 0; i < options.length; i++) {
        if (options[i] != "deleted") {
            condition++;
        }    
    }
    if (condition != 0) {
        disabledBtnGo(false);
    }else{
        disabledBtnGo(true);
    }
    element.remove();

};

//source: https://gist.github.com/brunomonteiro3/27af6d18c2b0926cdd124220f83c474d
function randomMinMax(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function createSvg(startGradient, stopGradient) {
    var svgns = 'http://www.w3.org/2000/svg';
    const gradient = document.createElementNS(svgns, 'linearGradient'),
          background = document.createElementNS(svgns, 'svg'),
          defs = document.createElementNS(svgns, 'defs'),
          gradientStart = document.createElementNS(svgns, 'stop'),
          gradientStop = document.createElementNS(svgns, 'stop'),
          path  = document.createElementNS(svgns, 'path');
    
    //create svg with class and attribute
    background.setAttribute('version', '1.1');
    background.setAttribute('preserveAspectRatio', 'none');
    background.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    background.setAttribute('viewBox', '0 0 362 503');
    background.classList.add('background');
    
    //create path with class and attribute
    path.setAttribute('fill', 'url(#MyGradient)');
    path.setAttribute('d', 'M362,0H0V502.34c155.36,5.27,291.61-21.24,362-66.75Z');
    
    gradient.setAttribute('id', 'MyGradient');
    gradient.setAttribute('gradientTransform', 'rotate(65)');
    
    gradientStart.style.stopColor = startGradient;
    gradientStart.setAttribute('offset', '5%');
    gradientStart.setAttribute('stop-color', startGradient);
    
    gradientStop.style.stopColor = stopGradient;
    gradientStop.setAttribute('offset', '95%');
    gradientStop.setAttribute('stop-color', stopGradient);
    
    gradient.appendChild(gradientStart);
    gradient.appendChild(gradientStop);
    defs.appendChild(gradient);
    background.appendChild(defs);
    background.appendChild(path);
    body.appendChild(background);
};

function HSLToHex(h,s,l) {
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0, 
        b = 0; 
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
  
    // Prepend 0s, if necessary
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

function disabledBtnGo(param) {
    btnGo.disabled = param;
    if (param == false) {
        body.classList.remove('locked-goBtn');
    }else{
        body.classList.add('locked-goBtn');
    }
}