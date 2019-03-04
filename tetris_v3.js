const testing = (() => {

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
            [1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
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
        setCanvas: (c, canv, unit) => {
            c.fillStyle = "black";
            c.fillRect(0, 0, canv.width, canv.height);
            for (let i = unit; i < canv.height; i += unit) {
                c.beginPath();
                c.moveTo(i, 0);
                c.lineTo(i, canv.height);
                c.strokeStyle = "white";
                c.lineWidth = 0.5;
                c.stroke();
            }
            for (let i = unit; i < canv.height; i += unit) {
                c.beginPath();
                c.moveTo(0, i);
                c.lineTo(canv.width, i);
                c.strokeStyle = "white";
                c.lineWidth = 0.5;
                c.stroke();
            }
            c.beginPath();
            c.moveTo(0, canv.height);
            c.lineTo(canv.width, canv.height);
            c.strokeStyle = "yellow";
            c.lineWidth = 5;
            c.stroke();
        },
        collisionDown: (main, tet) => {
            for (let i = 0; i < tet.grid.length; i++) {
                for (let j = 0; j < tet.grid[i].length; j++) {
                    if(tet.grid[i][j] !== 0 && main[i + tet.posY + 1][j + tet.posX] !== 0) {
                        return 0;
                    }
                }
            }
        },
        collisionLeft: (main, tet) => {
            for (let i = 0; i < tet.grid.length; i++) {
                for (let j = 0; j < tet.grid[i].length; j++) {
                    if(tet.grid[i][j] !== 0 && main[i + tet.posY][j + tet.posX - 1] !== 0) {
                        return 0;
                    }
                }
            }
        },
        collisionRight: (main, tet) => {
            for (let i = 0; i < tet.grid.length; i++) {
                for (let j = 0; j < tet.grid[i].length; j++) {
                    if(tet.grid[i][j] !== 0 && main[i + tet.posY][j + tet.posX + 1] !== 0) {
                        return 0;
                    }
                }
            }
        },
        // ! needs fixing
        collisionRotate: (main, tet) => {
            tet.rotate();
            for (let i = 0; i < tet.grid.length; i++) {
                for (let j = 0; j < tet.grid[i].length; j++) {
                    if(tet.grid[i][j] !== 0 && main[i + tet.posY][j + tet.posX] !== 0) {
                        return 0;
                    }
                }
            }
        }
    }

})();




const MainController = (() => {

    const u1 = 25;
    const [space, left, up, right, down] = [32, 37, 38, 39, 40];
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
            testing.setCanvas(ctx, canvas, u1);
            testing.fillLanded(testing.landed, ctx);
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
        Z: new TetGrid(4, 0, 3, [[7, 7, 0], [0, 7, 7], [0, 0, 0]])
    }



    // tetro["I"].draw();

    // console.log(testing.landed);

    const setupEventListeners = function(el) {
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === up || event.which === up) {
                if (testing.collisionRotate(testing.landed, el) !== 0) {
                    // el.rotate();
                }
            } else if (event.keyCode === left || event.which === left) {
                if (testing.collisionLeft(testing.landed, el) !== 0) {
                    el.left();
                }
            } else if (event.keyCode === right || event.which === right) {
                if (testing.collisionRight(testing.landed, el) !== 0) {
                    el.right();
                }
            } else if (event.keyCode === down || event.which === down) {
                if (testing.collisionDown(testing.landed, el) !== 0) {
                    el.down();
                }
            } else if (event.keyCode === space || event.which === space) {

            }
            el.draw();
            // testing.fillLanded(testing.landed, ctx);
        }, false);
    }

    //? remove default eventListeners
    window.addEventListener("keydown", function(e) {
        if([space, left, up, right, down].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    });

    const init = () => {
        // 1 select random tetro
        let randTet = testing.getRandom(tetro);
        console.log(randTet)
        // 2. set event listeners
        setupEventListeners(randTet);

        // 4. draw tetro on canvas
        randTet.draw();

        // 5. start tetro movement
        //! needs fixing
        // let move = setInterval(() => {
        //     if (testing.collisionDown(testing.landed, randTet) !== 0) {
        //         randTet.down();
        //         testing.setCanvas(ctx, canvas, u1);
        //         randTet.draw();
        //         // testing.fillLanded(testing.landed, ctx);
        //     } else {
        //         clearInterval(move);
        //         init();
        //     }
        // }, 500)
    }

    init();

})();

