const testing = (function(){

    const u1 = 25;
    const [u2, u3, u4, u5, u6, u7, u8] = [u1*2, u1*3, u1*4, u1*5, u1*6, u1*7, u1*8];
    const [space, left, up, right, down] = [32, 37, 38, 39, 40];
    const landed = [];
    const canvas = document.getElementById("main_canvas");
    canvas.width = u1 * 10;
    canvas.height = u1 * 20;
    const ctx = canvas.getContext("2d");

    return {
        fillLanded: (arr, c) => {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] !== 0) {
                        c.fillStyle = 'rgba(255, 0, 0, 0.5)';
                        c.fillRect(j * 25, i * 25, 25, 25);
                    }
                }
            }
        },
        insert: () => {
            for (let i = 0; i < mainGrid.length; i++) {                         // i => column(y) coordinates
                if (i >= this.posY && i < this.posY + this.length) {
                    console.log(i)
                    for (let j = 0; j < mainGrid[i].length; j++) {              // j => row(x) coordinates
                        if (j >= this.posX && j < (this.posX + this.length)) {
                            mainGrid[i][j] = this.grid[i][j - this.posX];
                        }
                    }
                }
            }
        },
        landed: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        ],
        getRandom: (obj) => {
            let keys = [];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    keys.push(prop[0]);
                }
            }
            let randomNum = Math.floor(Math.random() * Math.floor(keys.length));
            return obj[keys[randomNum]];
        },
        setCanvas: (c) => {
            c.fillStyle = "black";
            c.fillRect(0, 0, canvas.width, canvas.height);
            for (let i = u1; i < canvas.height; i += u1) {
                c.beginPath();
                c.moveTo(i, 0);
                c.lineTo(i, canvas.height);
                c.strokeStyle = "white";
                c.lineWidth = 0.5;
                c.stroke();
            }
            for (let i = u1; i < canvas.height; i += u1) {
                c.beginPath();
                c.moveTo(0, i);
                c.lineTo(canvas.width, i);
                c.strokeStyle = "white";
                c.lineWidth = 0.5;
                c.stroke();
            }
            c.beginPath();
            c.moveTo(0, canvas.height);
            c.lineTo(canvas.width, canvas.height);
            c.strokeStyle = "yellow";
            c.lineWidth = 5;
            c.stroke();
        },
        collision: () => {

        }
    }

})();




const collisionController = (() => {

    const u1 = 25;
    const [u2, u3, u4, u5, u6, u7, u8] = [u1*2, u1*3, u1*4, u1*5, u1*6, u1*7, u1*8];
    const [space, left, up, right, down] = [32, 37, 38, 39, 40];
    const landed = [];
    const canvas = document.getElementById("main_canvas");
    canvas.width = u1 * 10;
    canvas.height = u1 * 20;
    const ctx = canvas.getContext("2d");

    function createGrid(x, y, grid) {
        for (let i = 0; i < y; i++) {
            grid.push([0]);
            for (let j = 0; j < x; j++) {
                grid[i].push(0);
            }
        }
    }

    //createGrid(9, 20, landed);

    class TetGrid {
        constructor(posX, posY, length, grid) {
            this.posX = posX;
            this.posY = posY;
            this.grid = grid;
            this.length = length;
        }
        left() {
            this.posX--;
        }
        right() {
            this.posX++;
        }
        down() {
            this.posY++;
        }
        rotate() {
            let tempGrid = [];
            for (let i = 0; i < this.length; i++) {
                tempGrid.push([]);
                for (let j = 0; j < this.length; j++) {
                    tempGrid[i].unshift(this.grid[j][i]);
                }
            }
            return this.grid = tempGrid;
        }
        draw() {
            for (let i = 0; i < this.grid.length; i++) {
                for (let j = 0; j < this.grid[i].length; j++) {
                    if (this.grid[i][j] !== 0) {
                        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                        ctx.fillRect(j * u1 + this.posX * u1, i * u1 + this.posY * u1, u1, u1);
                    }
                }
            }
        }
    }

    const tetro = {
        I: new TetGrid(3, 0, 4, [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]),
        J: new TetGrid(4, 0, 3, [[0, 2, 0], [0, 2, 0], [2, 2, 0]]),
        L: new TetGrid(3, 0, 3, [[0, 3, 0], [0, 3, 0], [0, 3, 3]]),
        O: new TetGrid(4, 0, 2, [[4, 4], [4, 4]]),
        S: new TetGrid(4, 0, 3, [[0, 5, 5], [5, 5, 0], [0, 0, 0]]),
        T: new TetGrid(4, 0, 3, [[0, 0, 0], [6, 6, 6], [0, 6, 0]]),
        Z: new TetGrid(4, 0, 3, [[7, 7, 0], [0, 7, 7], [0, 0, 0]]),
        bla: new TetGrid(3, 0, 1, [[1]])
    }

    testing.setCanvas(ctx);

    tetro["O"].draw();

    // console.log(testing.landed);
    testing.fillLanded(testing.landed, ctx);

    const setupEventListeners = function(el) {
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === up || event.which === up) {
                tetro["O"].rotate();
                testing.setCanvas(ctx);
                tetro["O"].draw();
                testing.fillLanded(testing.landed, ctx);
            } else if (event.keyCode === left || event.which === left) {
                if ( testing.landed[tetro["O"].posY][tetro["O"].posX-1] === 0) {
                    tetro["O"].left();
                    testing.setCanvas(ctx);
                    tetro["O"].draw();
                    testing.fillLanded(testing.landed, ctx);
                    console.log(testing.landed[tetro["O"].posY][tetro["O"].posX]);
                }
            } else if (event.keyCode === right || event.which === right) {
                if ( testing.landed[tetro["O"].posY][tetro["O"].posX+1] === 0) {
                    tetro["O"].right();
                    testing.setCanvas(ctx);
                    tetro["O"].draw();
                    testing.fillLanded(testing.landed, ctx);
                    console.log(testing.landed[tetro["O"].posY][tetro["O"].posX]);
                }
            } else if (event.keyCode === down || event.which === down) {
                if (testing.landed[tetro["O"].posY+1][tetro["O"].posX] === 0) {
                    tetro["O"].down();
                    testing.setCanvas(ctx);
                    tetro["O"].draw();
                    testing.fillLanded(testing.landed, ctx);
                    console.log(testing.landed[tetro["O"].posY][tetro["O"].posX]);
                }
            } else if (event.keyCode === space || event.which === space) {

            }
        }, false);
    }

    // remove default eventListeners
    window.addEventListener("keydown", function(e) {
        if([space, left, up, right, down].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    });
    setupEventListeners();

    // const collision = (main, tet) => {
    //     for (let i = 0; i < main.length; i++) {
    //         for (let j = 0; j < main[i].length; j++) {
    //             if (main[i][j])
    //         }
    //     }
    // }

})();

