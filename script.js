var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var radius = Math.random() * 1.2;
    var opacity = Math.random();
    starArray.push({ x, y, radius, opacity });
}

var frameNumber = 0;
var opacity = 0;

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "rgba(255,255,255," + star.opacity + ")";
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

function drawDocumentOverlay() {
    // Calculate document dimensions and position
    const docWidth = Math.min(700, canvas.width * 0.85);
    const docHeight = Math.min(600, canvas.height * 0.75);
    const docX = (canvas.width - docWidth) / 2;
    const docY = (canvas.height - docHeight) / 2;

    // Draw semi-transparent document background
    context.fillStyle = "rgba(255, 250, 245, 0.45)";
    context.shadowColor = "rgba(0, 0, 0, 0.4)";
    context.shadowBlur = 30;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 10;
    context.fillRect(docX, docY, docWidth, docHeight);
    
    // Reset shadow
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // Add subtle border
    context.strokeStyle = "rgba(139, 64, 73, 0.15)";
    context.lineWidth = 1;
    context.strokeRect(docX, docY, docWidth, docHeight);

    // Add subtle lined paper effect
    context.strokeStyle = "rgba(139, 64, 73, 0.03)";
    context.lineWidth = 1;
    for (let i = docY + 32; i < docY + docHeight; i += 32) {
        context.beginPath();
        context.moveTo(docX, i);
        context.lineTo(docX + docWidth, i);
        context.stroke();
    }

    // Add "Dear Shiela" at the top
    context.font = "italic 24px Georgia";
    context.textAlign = "left";
    context.fillStyle = "rgba(107, 64, 66, 0.95)";
    context.fillText("My dearest Shiela,", docX + 40, docY + 50);
}

function drawText() {

    var fontSize = Math.min(28, window.innerWidth / 24);
    var lineHeight = 8;

    // Romantic serif font
    context.font = fontSize + "px Georgia";
    context.textAlign = "center";

    // Ink glow effect
    context.shadowColor = "rgba(139, 64, 73, 0.3)";
    context.shadowBlur = 3;

    const block = 600;
    let phase = Math.floor(frameNumber / block);
    let localFrame = frameNumber % block;

    if(localFrame < block/2){
        opacity = localFrame/(block/2);
    } else {
        opacity = 1 - ((localFrame-(block/2))/(block/2));
    }

    // Rich text color for letter aesthetic
    context.fillStyle = `rgba(74, 50, 52, ${opacity})`;

    if(phase === 0){
        drawTextWithLineBreaks([
            "On this Valentine's Day,",
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
            "that reflects who you truly are —",
            "genuine, warm, and unwavering.",
            "",
            "Even on days when you doubt yourself,",
            "remember there are people",
            "who admire and care about you."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
    }

    if(phase === 4){
        drawTextWithLineBreaks([
            "This Valentine's Day",
            "isn't just about romance —",
            "it's about celebrating",
            "hearts like yours.",
            "",
            "And yours is truly special."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
    }

    if(phase >= 5){
        context.fillText("Happy Valentine's Day ♥", canvas.width/2, canvas.height/2);
        button.style.display = "block";
    }

    context.shadowBlur = 0;
}

function draw() {

    // ✨ Letter-style gradient background - matching the burgundy image
    let bg = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    bg.addColorStop(0, "#8B4049");  // lighter burgundy
    bg.addColorStop(1, "#3D1319");  // deep burgundy

    context.fillStyle = bg;
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();
    updateStars();
    
    // Draw the document overlay before the text
    drawDocumentOverlay();
    
    drawText();

    frameNumber++;
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.requestAnimationFrame(draw);
