const outerGrid = document.querySelector(".outer-grid");
let board = Array.from({length : 9}, () => Array(9).fill(0));
function render() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.dataset.row = row;
            cell.dataset.col = col;

            outerGrid.appendChild(cell);
            if (col % 3 === 0) cell.classList.add("left-border");
            if (col === 8) cell.classList.add("right-border");
            if (row % 3 === 0) cell.classList.add("top-border");
            if (row === 8) cell.classList.add("bottom-border");
        }
    }
}


let selectedCell = null;
outerGrid.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cell")) return;

    if (selectedCell) {
        selectedCell.classList.remove("selected");
    }

    selectedCell = e.target;
    selectedCell.classList.add("selected");
});

document.addEventListener("keydown",(element) => {
    if(!selectedCell){
        return;
    }
    const key = element.key;
    if(key >= "1" && key <= "9"){
        const row = +selectedCell.dataset.row;
        const col = +selectedCell.dataset.col;
        const previous = board[row][col];
        board[row][col] = 0;
        const num = Number(key);
        if(isValid(board, row, col, num)){
            board[row][col] = num;
            selectedCell.textContent = num;
        }else{
            board[row][col] = previous;
            selectedCell.classList.add("invalid");
            const cell = selectedCell;
            setTimeout(() => {
                cell.classList.remove("invalid");
            }, 300);
        }
    }else if(key === "Backspace" || key === "Delete"){
        const row = +selectedCell.dataset.row;
        const col = +selectedCell.dataset.col;

        board[row][col] = 0;
        selectedCell.textContent = "";
    }
});

function isValid(board, row, col, num){
    for(let i = 0; i < 9; i++){
        if(board[row][i] === num || board[i][col] === num){
            return false;
        }
    }
    let startRow = Math.floor(row/3)*3;
    let startCol = Math.floor(col/3)*3;

    for(let i = startRow; i<= startRow+2; i++){
        for(let j = startCol; j <= startCol+2; j++){
            if(board[i][j] === num){
                return false;
            }
        }
    }
    return true;
}
let copy = board.map(row => [...row]);
render();