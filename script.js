function drawText() {
    var fontSize = Math.min(26, window.innerWidth / 26);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    // glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // Paragraph 1
    if(frameNumber < 250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks([
            "On this Valentine’s Day, I just want to remind you",
            "of something simple but powerful:",
            "you are seen, and you are loved."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        opacity += 0.01;
    }
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks([
            "On this Valentine’s Day, I just want to remind you",
            "of something simple but powerful:",
            "you are seen, and you are loved."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        opacity -= 0.01;
    }

    if(frameNumber == 500){ opacity = 0; }

    // Paragraph 2
    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks([
            "The way you laugh, the way you carry yourself,",
            "the quiet strength you show every day",
            "none of it goes unnoticed.",
            "You may not realize the light you bring,",
            "but I feel it."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        opacity += 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks([
            "Your kindness, dedication, and grace",
            "inspire more hearts than you know."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        opacity -= 0.01;
    }

    if(frameNumber == 1000){ opacity = 0; }

    // Paragraph 3
    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks([
            "You deserve a love that reflects who you are",
            "genuine, warm, and unwavering."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        opacity += 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks([
            "Even on days when you doubt yourself,",
            "remember there are people who admire you,",
            "appreciate you, and care deeply."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        opacity -= 0.01;
    }

    if(frameNumber == 1500){ opacity = 0; }

    // Paragraph 4 (final)
    if(frameNumber > 1500 && frameNumber < 99999){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks([
            "This Valentine’s Day isn’t just about romance",
            "it’s about celebrating hearts like yours.",
            "And yours is truly special."
        ], canvas.width/2, canvas.height/2, fontSize, lineHeight);
        opacity += 0.01;
    }

    // Reset glow
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
}
