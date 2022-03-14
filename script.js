var canvas = document.querySelector("canvas");
const clearButton = document.querySelector(".clear-button");
const eraseButton = document.querySelector(".erase-button");
const drawButton = document.querySelector(".draw-button");
const brushSize = document.querySelector(".brush-size-text");
const colorPicker = document.querySelector(".color-picker");
const saveButton = document.querySelector(".save-button");
const uploadButton = document.querySelector(".upload-button");

let isPressed = false;
let x = undefined;
let y = undefined;

const ctx = canvas.getContext('2d');

let size = 2;
let color = "black";
let eraseMode = false;

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    console.log(isPressed);
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if(isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawLine(x,y,x2,y2);
        drawCircle(x,y);
        
        x = x2;
        y = y2;
    }
});

brushSize.addEventListener("change", () => {
    size = brushSize.value;
})
colorPicker.addEventListener("change", () => {
    color = colorPicker.value;
})


function drawCircle(x,y) {
    ctx.beginPath();
    ctx.arc(x,y, size/2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.stroke();
}

clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    color = colorPicker.value;
    eraseMode = false;
});
eraseButton.addEventListener("click", () => {
    eraseMode = true;
    color = "white";
});
drawButton.addEventListener("click", () => {
    eraseMode = false;
    color = colorPicker.value;
});
saveButton.addEventListener("click", () => {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
});

