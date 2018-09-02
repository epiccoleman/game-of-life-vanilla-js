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

function renderGridLines(ctx, gridSize, cellSize) {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    let coord;
    for(let i = 0; i < gridSize; i++) {
        coord = i * cellSize;

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

function renderGameBoard(ctx, board, cellSize){

    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
    let grid_size = board[0].length

    ctx.fillStyle = "#ff0000"
    for(let x = 0; x < grid_size; x++){
        for(let y = 0; y < grid_size; y++){
            if(board[x][y]){
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
            }
        }
    }
}

function getAt(board, x, y){
    let safeX = Math.abs(x % board[0].length)
    let safeY = Math.abs(y % board[0].length)
    return board[safeX][safeY]
}

function countNeighbors(board, x, y){
    let gridSize = board[0].length
    let vals = []

    vals.push(getAt(board, x - 1, y - 1))
    vals.push(getAt(board, x - 1, y ))
    vals.push(getAt(board, x - 1, y + 1))
    vals.push(getAt(board, x, y - 1))
    vals.push(getAt(board, x, y + 1))
    vals.push(getAt(board, x + 1, y - 1))
    vals.push(getAt(board, x + 1, y ))
    vals.push(getAt(board, x + 1, y + 1))

    let count = vals.filter(x =>  x == 1).length

    return count
}

function nextCellState(board, x, y){
    let alive = !!board[x][y]
    let neighbors = countNeighbors(board, x, y)

    if(alive){
        return (neighbors == 2 || neighbors == 3) ? 1 : 0
    } else if (neighbors == 3){
        return 1
    }
    return 0
}

function nextBoardState(prevState){
    let gridSize = prevState[0].length

    let nextState = createBoard(gridSize);
    for(let x = 0; x < gridSize; x++){
        for(let y = 0; y < gridSize; y++){
            nextState[x][y] = nextCellState(prevState, x, y)
        }
    }
    return nextState;
}

function flipCoin(){
    return !!(Math.floor(Math.random() * 100) % 4 == 0)
}

function randomFillBoard(board){
    let gridSize = board[0].length
    let newBoard = board

    for(let x = 0; x < gridSize; x++){
        for(let y = 0; y < gridSize; y++){
            newBoard[x][y] = flipCoin() ? 1 : 0
        }
    }

    return newBoard;
}

function koksGalaxy(board){
    let gridSize = board[0].length
    let newBoard = board

    center = Math.floor(gridSize / 2)

    for(let w = -4; w <= 1; w++){
        newBoard[center + w][center - 4] = 1
        newBoard[center + w][center - 3] = 1
    }

    for(let h = -4; h <= 1; h++){
        newBoard[center + 3][center + h] = 1
        newBoard[center + 4][center + h] = 1
    }

    for(let w = -1; w <= 4; w++){
        newBoard[center + w][center + 3] = 1
        newBoard[center + w][center + 4] = 1
    }

    for(let h = -1; h <= 4; h++){
        newBoard[center - 4][center + h] = 1
        newBoard[center - 3][center + h] = 1
    }

    return newBoard
}

async function main(){
    const ctx = document.getElementById("golCanvas").getContext("2d");

    const GRID_SIZE = 150;
    const CELL_SIZE = ctx.canvas.width / GRID_SIZE;

    let board = createBoard(GRID_SIZE)
    board = randomFillBoard(board)
    /* board = koksGalaxy(board) */

    /* board[10][10] = 1
     * board[10][9] = 1
     * board[9][10] = 1
     * board[8][10] = 1
     * board[9][8] = 1 */

    while(true){
        board = nextBoardState(board)
        await new Promise(resolve => setTimeout(resolve, 100))
        renderGameBoard(ctx, board, CELL_SIZE);
        /* renderGridLines(ctx, GRID_SIZE, CELL_SIZE); */
    }
}

main();
