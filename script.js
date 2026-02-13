var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
  if (button.textContent === "Click Me! ❤") {
    button.textContent = "loading...";
    fetch('send_mail.php')
      .then(response => {
        button.textContent = response.ok ? "Check Your Email 🙃" : "Error 😞";
      })
      .catch(() => {
        button.textContent = "Error 😞";
      });
  }
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {

    var fontSize = Math.min(28, window.innerWidth / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    context.shadowColor = "rgba(45,45,255,1)";
    context.shadowBlur = 8;

    // Timing blocks (each 600 frames)
    const block = 600;
    let phase = Math.floor(frameNumber / block);
    let localFrame = frameNumber % block;

    // Fade curve
    if(localFrame < block/2){
        opacity = localFrame/(block/2);
    } else {
        opacity = 1 - ((localFrame-(block/2))/(block/2));
    }

    context.fillStyle = `rgba(45,45,255,${opacity})`;

    // -------- TEXT SEQUENCE --------

    if(phase === 0){
        drawTextWithLineBreaks([
            "On this Valentine’s Day,",
            "I just want to remind you",
            "of something simple but powerful:",
            "you are seen, and you are loved."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
    }

    if(phase === 1){
        drawTextWithLineBreaks([
            "The way you laugh,",
            "the way you carry yourself,",
            "the quiet strength you show every day,",
            "none of it goes unnoticed.",
            "You may not always realize",
            "the light you bring into a room,",
            "but others feel it. I feel it."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
    }

    if(phase === 2){
        drawTextWithLineBreaks([
            "Your kindness, your dedication,",
            "and your grace inspire",
            "more hearts than you know."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
    }

    if(phase === 3){
        drawTextWithLineBreaks([
            "You deserve a love",
            "that reflects who you truly are",
            "genuine, warm, and unwavering.",
            "",
            "Even on days when you doubt yourself,",
            "remember there are people",
            "who admire and care about you."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
    }

    if(phase === 4){
        drawTextWithLineBreaks([
            "This Valentine’s Day",
            "isn’t just about romance",
            "it’s about celebrating",
            "hearts like yours.",
            "",
            "And yours is truly special."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
    }

    if(phase >= 5){
        context.fillText("Happy Valentine's Day <3", canvas.width/2, canvas.height/2);
        button.style.display = "block";
    }

    context.shadowBlur = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    frameNumber++;
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);
