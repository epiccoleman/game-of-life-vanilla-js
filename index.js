const CANVAS = document.getElementById("golCanvas");
const ctx = CANVAS.getContext("2d");

const GRID_SIZE = 40;
const CELL_SIZE = ctx.canvas.width / GRID_SIZE;

let BOARD = createBoard(GRID_SIZE)

function createBoard(size) {
    let board = [];
    for(let x = 0; x < size; x++){
        let row = []
        for(let y = 0; y < size; y++){
            row.push(0)
        }
        board.push(row);
    }
    return board;
}

function renderGridLines() {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    let coord;
    for(let i = 0; i < GRID_SIZE; i++) {
        coord = i * CELL_SIZE;

        ctx.beginPath();
        ctx.moveTo(coord, 0);
        ctx.lineTo(coord, ctx.canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, coord);
        ctx.lineTo(ctx.canvas.height, coord);
        ctx.stroke();
    }
}

function renderGameBoard(){
    ctx.fillStyle = "#ff0000"
    for(let x = 0; x < GRID_SIZE; x++){
        for(let y = 0; y < GRID_SIZE; y++){
            if(BOARD[x][y]){
                console.log("BOARD[" + x + "][" + y + "] = " + BOARD[x][y])
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
        }
    }
}


function main(){
    BOARD[10][10] = 1;
    renderGameBoard();
    renderGridLines();
}

main();
