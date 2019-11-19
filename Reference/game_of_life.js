'use strict';

function makearray(cols, rows) {
    var array = Array.from(Array(cols), () => new Array(rows));
    return array;
}

const c = document.getElementById("Canvas");
const ctx = c.getContext("2d");
var grid;
let resolution = 7;
let cols;
let rows;

function setup() {
    cols = ceil(document.getElementById("Canvas").clientWidth / resolution);
    rows = ceil(document.getElementById("Canvas").clientHeight / resolution);
    grid = makearray(cols, rows)
    for (let i = 0; i < cols; i++) {
        for (let ii = 0; ii < rows; ii++) {
            grid[i][ii] = floor(random(2));
        }
    }
}

function draw() {


    for (let i = 0; i < cols; i++) {
        for (let ii = 0; ii < rows; ii++) {
            if (grid[i][ii] == 1) {
                let x = i * resolution;
                let y = ii * resolution;
                ctx.fillStyle = 'blue';
                ctx.strokeStyle = "darkgrey";
                ctx.strokeRect(x + 0.5, y - 0.5, resolution - 1, resolution);
                ctx.fillRect(x, y, resolution - 1, resolution);
                ctx.rect(x, y, resolution - 1, resolution);
            } else {
                let x = i * resolution;
                let y = ii * resolution;
                ctx.fillStyle = 'whitesmoke';
                ctx.strokeStyle = "darkgrey";
                ctx.strokeRect(x + 0.5, y - 0.5, resolution - 1, resolution);
                ctx.fillRect(x, y, resolution - 1, resolution);
                ctx.rect(x, y, resolution - 1, resolution);
            }
        }
    }

    let next = makearray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let ii = 0; ii < rows; ii++) {
            let sum = 0;
            let neighbours = countNeighbours(grid, i, ii);
            let state = grid[i][ii];

            if (state == 0 && neighbours == 3) {
                next[i][ii] = 1;
            } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                next[i][ii] = 0;
            } else {
                next[i][ii] = state;
            }
        }
    }

    grid = next;

}

function countNeighbours(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let ii = -1; ii < 2; ii++) {
            let col = (x + i + cols) % cols;
            let row = (y + ii + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}