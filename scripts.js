// confetti code compliments of https://codepen.io/EmersonGS/pen/vwVNvp


const settings = {
    numConfetti: 150,
    distance: 275,
    colors: ["blue", "green", "yellow", "red", "pink"],
    shapes: ["square", "circle", "rectangle"]
};

function getRandomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRotation() {
    return Math.floor(Math.random() * 360) + 1;
}

function emit() {
    var container = document.getElementById("confetti-container");
    var containerRect = container.getBoundingClientRect();
    var containerData = {
        x: containerRect.left,
        y: containerRect.top,
        height: containerRect.right - containerRect.left,
        width: containerRect.bottom - containerRect.top
    };

    var start = {
        x: containerData.x + containerData.width / 2,
        y: containerData.y + containerData.height / 2
    };

    var maxY = containerData.y + containerData.height + settings.distance;
    var minY = containerData.y - settings.distance;

    var maxX = containerData.x + containerData.width + settings.distance;
    var minX = containerData.x - settings.distance;

    var docFrag = document.createDocumentFragment();

    for (var i = 0; i < settings.numConfetti; i++) {
        let confetti = document.createElement("div");
        let color = getRandomArrayItem(settings.colors);
        let shape = getRandomArrayItem(settings.shapes);
        let size = getRandomInt(8, 4);
        let newX = getRandomInt(minX, maxX);
        let newY = getRandomInt(minY, maxY);
        confetti.className += "confetti " + color + " " + shape;
        confetti.style.top = start.y + "px";
        confetti.style.left = start.x + "px";
        confetti.style.height = size + "px";
        confetti.style.width = size + "px";
        confetti.style.transform = "rotate(" + getRotation() + "deg)";
        docFrag.appendChild(confetti);

        setTimeout(function () {
            confetti.style.transition = "all " + getRandomFloat(1.5, 0.5) + "s ease";
            confetti.style.top = newY + "px";
            confetti.style.left = newX + "px";
            confetti.style.transform = "rotate(" + getRotation() + "deg)";

            confetti.addEventListener("transitionend", function () {
                confetti.style.transition = "all " + getRandomFloat(1.25, 1) + " ease";
                confetti.style.opacity = 0;
                confetti.style.transform = "rotate(" + getRotation() + "deg)";
                confetti.style.top = parseInt(confetti.style.top) + 10 + "px";
                setTimeout(function () {
                    confetti.remove();
                    confetti = null;
                }, 1000);
            });
        }, 1);
    }
    document.body.appendChild(docFrag);
}
