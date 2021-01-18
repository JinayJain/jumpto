const warpEl = document.getElementById("warp-text");

let i = 0;
const warpText = `Initializing warp sequence...\n|Dialing address ${warpUrl}\n|3...|2...|1...| Warp!`;

const TYPE_DELAY = 50;
const BAR_DELAY = 500;

function typewrite() {
    if (i < warpText.length) {
        if (warpText[i] === "|") {
            i++;
            setTimeout(typewrite, BAR_DELAY);
            return;
        }

        warpEl.innerHTML += warpText[i];

        i++;
        setTimeout(typewrite, TYPE_DELAY);
    } else {
        setInterval(rampSpeed, 5);
        setTimeout(redirect, 1500);
    }
}

function rampSpeed() {
    warpSpeed = constrain(warpSpeed + 0.2, 0, 20);
}

function redirect() {
    window.location.replace(warpUrl);
}

typewrite();
