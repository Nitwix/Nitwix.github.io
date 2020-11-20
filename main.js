const isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
if (isMobile) {
  alert("Ouais, euh, en fait ça marche que sur l'ordi :/");
  alert("Du coup, tiens, ça pourrait t'intéresser en attendant:");
  window.location.href = "https://fr.wikipedia.org/wiki/Cheval";
} 

const BTN_OFFSET = 50;
const BTN_GROWTH = 50;
const BTN_FONT_GROWTH = 4; //px
const BTN_FONT_MIN_SIZE = 5;
const BTN_MIN_SIZE = 40;
const UNIT_PX = "px";
const DEBUG_MODE = false; // TODO set to false

function getRandomHexColor(){
    return "#"+((1<<24)*Math.random()|0).toString(16);
}

function setElementPosition(elt, x, y){
    if(isNaN(x) || isNaN(y)) console.exception("x and y must be numbers");
    elt.style.left = x + UNIT_PX;
    elt.style.top = y + UNIT_PX;
}

function setElementSize(elt, w,h){
    console.assert(!isNaN(w) && !isNaN(h), w, h);
    elt.style.width = w + UNIT_PX;
    elt.style.height = h + UNIT_PX;
}

function getPropertyIntValueOrElse(prop, dflt){
    console.assert(typeof prop === "string");
    if(prop == ""){
        return dflt;
    }else{
        return parseInt(prop.substring(0, prop.length-UNIT_PX.length));
    }
}

function getPropertyIntValue(prop){
    return getPropertyIntValueOrElse(prop, 0);
}

/**
 * @param {Integer} min Minimum number, included
 * @param {Integer} max Maximum number, included
 */
function getRandomBetween(min, max){
    return Math.floor(Math.random() * (max-min + 1));
}

function getRandomPositionInWindow(elt){
    console.assert(!isNaN(elt.offsetWidth) && !isNaN(elt.offsetHeight));
    return [getRandomBetween(0, window.innerWidth - elt.offsetWidth),
         getRandomBetween(0, window.innerHeight - elt.offsetHeight)];
}

var spookyButtonShouldMove = true;
var numberOfMoves = 0;
const maxNumberOfMoves = DEBUG_MODE ? 6 : 25;
function moveSpookyButton(btn){
    const texts = ["Allez!", "Plus Vite!", "Trop lent :/", "GO GO GO!"]

    const currTop = btn.style.top;
    let offset = getPropertyIntValue(currTop);

    if(spookyButtonShouldMove && numberOfMoves < maxNumberOfMoves){
        numberOfMoves++;
        offset += BTN_OFFSET;
        const randPos = getRandomPositionInWindow(btn);
        setElementPosition(btn, randPos[0], randPos[1]);
        btn.innerHTML = texts[Math.floor(Math.random()*texts.length)];
        document.body.style.backgroundColor = getRandomHexColor();
    }else{
        const newOffset = 0;
        setElementPosition(btn, newOffset, newOffset);
        document.body.style.backgroundColor = "#FFF";
        spookyButtonShouldMove = false;
    }
}

var currNClicks = 0;

const txtAnniv = "Hey bravo! T'as attrapé le bouton! Bref, tout ça pour te dire \
JOYEUX ANNIVERSAIRE VAL!".split(" ");

var explosionInterval;
function clickSpookyButton(btn){
    const newBtnHeight = getPropertyIntValueOrElse(btn.style.width, BTN_MIN_SIZE) + BTN_GROWTH;
    if(newBtnHeight < window.innerHeight - BTN_GROWTH){
        setElementSize(btn, newBtnHeight, newBtnHeight);
        const newFontSize = getPropertyIntValueOrElse(btn.style.fontSize, BTN_FONT_MIN_SIZE) + BTN_FONT_GROWTH;
        btn.style.fontSize = newFontSize + UNIT_PX;
        btn.style.backgroundColor = getRandomHexColor();
        btn.style.color = getRandomHexColor();
    }else{
        btn.parentNode.removeChild(btn);
        alert("Attention, si t'es épileptique, il vaut mieux que tu cliques pas sur OK, ok?");
        explosionInterval = setInterval(explosion, EXPLOSION_TIMEOUT);
    }
    btn.innerHTML = txtAnniv[currNClicks] || "ʕっ•ᴥ•ʔっ";
    currNClicks++;
}

const EXPLOSION_TIMEOUT = 100;
var explosionCounter = 0;
function explosion(){
    explosionCounter++;
    document.body.style.backgroundColor = getRandomHexColor();
    if(explosionCounter % 50 == 0){
        alert("Tu vois, je t'avais prévenu...");
        alert("Franchement, ça m'énerve ces gens qui m'écoutent pas.");
        const continuer = confirm("Bon, tu veux vraiment continuer?");
        if(!continuer) clearInterval(explosionInterval);
    }
}

