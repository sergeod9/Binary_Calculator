
const countElement = document.querySelector('.count');
const binaryDigitsContainer = document.querySelector('.binary-digits--digits');
const binaryBulbsContainer = document.querySelector('.binary-digits--bulbs');
const binarySection = document.querySelector(".binary-digits--section");
const bulbsValues = document.querySelector(".bulbs-values");
const totalElement = document.querySelector(".total");
const radioBulbsElement = document.getElementById("bulbs");
const radioBitsElement = document.getElementById("bits");
const intro = document.querySelector(".intro");
const introToggleButton = document.querySelectorAll(".toggle");
const bulbImageOn = "img/light_bulb_on.jpg";
const bulbImageOff = "img/light_bulb_off.jpg";
const digitalImageOn = "img/digital_on.jpg";
const digitalImageOff = "img/digital_off.jpg";
let imageType="bulbs";
let counter = 0;

updateBinaryElements();

totalElement.innerHTML = `<p style = "font-size:1.2rem">Total Decimal Equivalent</p><p style="font-size:3rem; margin-top:.2rem">${counter}<p>`;


binarySection.addEventListener('click',toggleBulbState);

countElement.addEventListener('change',updateBinaryElements);

radioBulbsElement.addEventListener('click',updateImagesState);
radioBitsElement.addEventListener('click',updateImagesState);


introToggleButton[0].firstElementChild.addEventListener('click', introToggle);
introToggleButton[1].firstElementChild.addEventListener('click', introToggle);

function updateBinaryElements(){

    let count = +countElement.value;
    counter = 0;
    binaryDigitsContainer.innerHTML="";
    binaryBulbsContainer.innerHTML="";
    bulbsValues.innerHTML ="";
    totalElement.innerHTML =  `<p style = "font-size:1.2rem">Total Decimal Equivalent</p><p style="font-size:3rem; margin-top:.2rem">${counter}<p>`;
    

    const elementWidth = Math.round(binaryDigitsContainer.getBoundingClientRect().width/count -10);

    for(let i = 0; i < count; i++){
        binaryDigitsContainer.innerHTML += `<div class='digits-unit' style='width: ${elementWidth}px'>${Math.pow(2,i+1)}<span style="font-size: 1rem; display: block;"> numbers</span></div> `;
        
        binaryBulbsContainer.innerHTML += `<div class='bulbs-unit' id="bulb${i}" style='width: ${elementWidth}px' max-value="${Math.pow(2,i+1)-1}" status="off"></div>`;

        bulbsValues.innerHTML += `<div class='bulbs-unit-value' id="value${i}" style='width: ${elementWidth}px' max-value='${Math.pow(2,i+1)/2}' >0</div> `;
        
    }
   binaryDigitsContainer.lastElementChild.style.transform = "scale(1.3)";
   binaryDigitsContainer.lastElementChild.style.color = "#ffecaa"; 
     
   updateImages(imageType);
}

function toggleBulbState(e){
    // Get the value element associated with the clicked bulb
    if(e.target.className == "bulbs-unit"){
        const bulbValueElement = document.getElementById(`value${e.target.attributes["id"].value.slice(4)}`);
        const bulbPower = +bulbValueElement.attributes["id"].value.slice(5);
        let imageOn = bulbImageOn;
        let imageOff = bulbImageOff;
        if (imageType == "bulbs"){
            imageOn = bulbImageOn;
            imageOff = bulbImageOff;
        }
        else if (imageType == "bits"){
            imageOn = digitalImageOn;
            imageOff = digitalImageOff;
        }
        
        if (e.target.attributes["status"].value == 'off'){
            e.target.attributes["status"].value = 'on';
            e.target.style.backgroundImage = `url(${imageOn})`;
            
            bulbValueElement.textContent = Math.pow(2,bulbPower);
            counter += Math.pow(2,bulbPower);
        }
        else{
            e.target.attributes["status"].value = "off";
            e.target.style.backgroundImage = `url(${imageOff})`;
            bulbValueElement.textContent = 0;
            counter -= Math.pow(2,bulbPower);
        }
        totalElement.innerHTML = `<p style = "font-size:1.2rem">Total Decimal Equivalent</p><p style="font-size:3rem; margin-top:.2rem">${counter}<p>`;    
        
    }
    
}

function updateImagesState(e){

    if(e.target == radioBulbsElement) imageType = "bulbs";
    else {imageType = "bits"};
    updateImages(imageType);
}

function updateImages(imageType){
    const binaryImagesArray = document.querySelectorAll(".bulbs-unit");
    binaryImagesArray.forEach(imgElement => {
        if (imageType == "bulbs"){
            if (imgElement.attributes["status"].value == 'on')
                imgElement.style.backgroundImage = `url(${bulbImageOn})`;
            else { imgElement.style.backgroundImage = `url(${bulbImageOff})`};
        }
        else{
            if (imgElement.attributes["status"].value == 'on')
                imgElement.style.backgroundImage = `url(${digitalImageOn})`;
            else { imgElement.style.backgroundImage = `url(${digitalImageOff})`};
        }
    });    
}

function introToggle(e){
    if (intro.className.includes('collapse')){
        intro.className = "intro";
    }
    else{
        intro.className = "intro intro-collapse";
    }
}