var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;
var draw = false
let devided = width / 28
var data_collector = []
var digit16 = {
    0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:'A', 11:'B', 12:'C', 13:'D', 14:'E', 15:'F'
}

for (let i = 0; i < 28; i++) {
    for (let j = 0; j < 28; j++) {
        data_collector[j * 28 + i] = 0;
        ctx.beginPath();
        ctx.rect(i*devided, j*devided, devided, devided);
        ctx.stroke();
    }
}

// DL part
const model = tf.loadLayersModel('./model/model.json');

console.log(model);

function DrawChange(x=-1, y=-1) {
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
            if (i == x-1 || i == x+1 || i == x) {
                if (j == y-1 || j == y+1 || j == y){
                    data_collector[j * 28 + i] += 3;
                    digit = Math.min(15, parseInt(data_collector[j * 28 + i]));
                    digit = digit16[digit];
                    ctx.fillStyle = '#'+digit+digit+digit;
                    ctx.fillRect(i*devided, j*devided, devided, devided);
                }
            }
        }
    }
}    
function getCursorPosition(canvas, event) {
    if (!draw){
        return
    }
    const rect = canvas.getBoundingClientRect()
    const x = parseInt((event.clientX - rect.left) / devided)
    const y = parseInt((event.clientY - rect.top) / devided)
    DrawChange(x, y)
}

function StartDraw(event) {
    draw = true
}

function StopDraw(event){
    draw=false
}

canvas.addEventListener('mousemove', function(e) {
    getCursorPosition(canvas, e)
})

canvas.addEventListener('mouseup', function(e) {
    StopDraw(canvas, e)
})

canvas.addEventListener('mousedown', function(e) {
    StartDraw(canvas, e)
})