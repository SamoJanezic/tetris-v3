let logicController = (() => {
    let score = null;
    let scoreBoard = document.getElementById("score");

    function updateScore() {
        score += 10;
        scoreBoard.innerHTML = `Score: ${score}`;
        if(score % 100 === 0 && score != 0) {
            return true;
        }
    }

    return {
        fillLanded: (arr, c, unit) => {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] === 1) {
                        c.fillStyle = 'rgba(255, 0, 0, 0.7)';
                        c.fillRect(j * unit, i * unit, unit, unit);
                    } else if (arr[i][j] === 2) {
                        c.fillStyle = 'rgba(76, 214, 49, 0.7)';
                        c.fillRect(j * unit, i * unit, unit, unit);
                    } else if (arr[i][j] === 3) {
                        c.fillStyle = 'rgba(233, 237, 14, 0.7)';
                        c.fillRect(j * unit, i * unit, unit, unit);
                    } else if (arr[i][j] === 4) {
                        c.fillStyle = 'rgba(0, 85, 255, 0.7)';
                        c.fillRect(j * unit, i * unit, unit, unit);
                    } else if (arr[i][j] === 5) {
                        c.fillStyle = 'rgba(217, 142, 255, 0.7)';
                        c.fillRect(j * unit, i * unit, unit, unit);
                    } else if (arr[i][j] === 6) {
                        c.fillStyle = 'rgba(255, 38, 211, 0.7)';
                        c.fillRect(j * unit, i * unit, unit, unit);
                    } else if (arr[i][j] === 7) {
                        c.fillStyle = 'rgba(38, 255, 139, 0.7)';
                        c.fillRect(j * unit, i * unit, unit, unit);
                    }
                }
            }
        },
        insert: (grid, tet) => {
            for (let i = 0; i < tet.grid.length; i++) {
                for (let j = 0; j < tet.grid[i].length; j++) {
                    if (tet.grid[i][j] === 0){
                        continue;
                    } else if (grid[i + tet.posY][j + tet.posX] === 0) {
                        grid[i + tet.posY][j + tet.posX] = tet.grid[i][j];
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
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
            c.fillStyle = 'black';
            c.fillRect(0, 0, canv.width, canv.height);
            for (let i = unit; i < canv.height; i += unit) {
                c.beginPath();
                c.moveTo(i, 0);
                c.lineTo(i, canv.height);
                c.strokeStyle = 'white';
                c.lineWidth = 0.5;
                c.stroke();
            }
            for (let i = unit; i < canv.height; i += unit) {
                c.beginPath();
                c.moveTo(0, i);
                c.lineTo(canv.width, i);
                c.strokeStyle = 'white';
                c.lineWidth = 0.5;
                c.stroke();
            }
            c.beginPath();
            c.moveTo(0, canv.height);
            c.lineTo(canv.width, canv.height);
            c.strokeStyle = 'yellow';
            c.lineWidth = 5;
            c.stroke();
        },
        startScreen: (c, canv, unit) => {
            c.fillRect(0, 0, canv.width, canv.height);
            c.strokeStyle = 'white';
            c.rect(unit * 2.5, unit * 5, unit * 5, unit * 1.5);
            c.stroke();
            c.font = "20px Georgia"
            c.fillStyle = "White";
            c.textAlign = "center";
            c.fillText('Start Tetris', canv.width/2, unit * 6);
        },
        collisionDown: (main, tet) => {
            for (let i = 0; i < tet.grid.length; i++) {
                for (let j = 0; j < tet.grid[i].length; j++) {
                    if (tet.grid[i][j] !== 0 && main[i + tet.posY + 1] === undefined) {
                        return 0;
                    } else if (tet.grid[i][j] !== 0 && main[i + tet.posY + 1][j + tet.posX] !== 0) {
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
        },
        removeLine: (grid) => {
            for (let i = 0; i < grid.length; i++) {
                if (grid[i].includes(0) === false) {
                    grid.splice(i, 1);
                    grid.unshift([0,0,0,0,0,0,0,0,0,0]);
                    score += 10;
                    scoreBoard.innerHTML = `Score: ${score}`;
                    if(score % 100 === 0 && score != 0) {
                        return true;
                    }
                }
            }
        },
    }

})();


let elementController = ((logicCtrl) => {

    let speed = 500;
    let check = false;
    const u1 = 25;
    const [space, left, up, right, down] = [32, 37, 38, 39, 40];
    const canvas = document.getElementById('main_canvas');
    canvas.width = u1 * 10;
    canvas.height = u1 * 20;
    const ctx = canvas.getContext("2d");

    class TetGrid {
        constructor(posX, posY, length, grid) {
            this.posX = posX;
            this.posY = posY;
            this.grid = grid;
            this.length = length;
            this.startX = posX;
            this.startY = posY;
            this.startGrid = grid;
            this.counter = 0;
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
            logicCtrl.setCanvas(ctx, canvas, u1);
            logicCtrl.fillLanded(logicCtrl.landed, ctx, u1);
            for (let i = 0; i < this.grid.length; i++) {
                for (let j = 0; j < this.grid[i].length; j++) {
                    switch (this.grid[i][j]) {
                        case 1:
                            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                            ctx.fillRect(j * u1 + this.posX * u1, i * u1 + this.posY * u1, u1, u1);
                            break;
                        case 2:
                            ctx.fillStyle = 'rgba(76, 214, 49, 0.5)';
                            ctx.fillRect(j * u1 + this.posX * u1, i * u1 + this.posY * u1, u1, u1);
                            break;
                        case 3:
                            ctx.fillStyle = 'rgba(233, 237, 14, 0.5)';
                            ctx.fillRect(j * u1 + this.posX * u1, i * u1 + this.posY * u1, u1, u1);
                            break;
                        case 4:
                            ctx.fillStyle = 'rgba(0, 85, 255, 0.5)';
                            ctx.fillRect(j * u1 + this.posX * u1, i * u1 + this.posY * u1, u1, u1);
                            break;
                        case 5:
                            ctx.fillStyle = 'rgba(217, 142, 255, 0.5)';
                            ctx.fillRect(j * u1 + this.posX * u1, i * u1 + this.posY * u1, u1, u1);
                            break;
                        case 6:
                            ctx.fillStyle = 'rgba(255, 38, 211, 0.5)';
                            ctx.fillRect(j * u1 + this.posX * u1, i * u1 + this.posY * u1, u1, u1);
                            break;
                        case 7:
                            ctx.fillStyle = 'rgba(38, 255, 139, 0.5)';
                            ctx.fillRect(j * u1 + this.posX * u1, i * u1 + this.posY * u1, u1, u1);
                            break;
                      }
                }
            }
        }
        reset() {
            this.posX = this.startX;
            this.posY = this.startY;
            this.grid = this.startGrid;
        }
    }

    const tetro = {
        I: new TetGrid(3, 0, 4, [[0, 1, 0, 0],
                                 [0, 1, 0, 0],
                                 [0, 1, 0, 0],
                                 [0, 1, 0, 0]]),
        J: new TetGrid(4, 0, 3, [[0, 2, 0],
                                 [0, 2, 0],
                                 [2, 2, 0]]),
        L: new TetGrid(3, 0, 3, [[0, 3, 0],
                                 [0, 3, 0],
                                 [0, 3, 3]]),
        O: new TetGrid(4, 0, 2, [[4, 4],
                                 [4, 4]]),
        S: new TetGrid(4, 0, 3, [[0, 5, 5],
                                 [5, 5, 0],
                                 [0, 0, 0]]),
        T: new TetGrid(4, 0, 3, [[0, 0, 0],
                                 [6, 6, 6],
                                 [0, 6, 0]]),
        Z: new TetGrid(4, 0, 3, [[7, 7, 0],
                                 [0, 7, 7],
                                 [0, 0, 0]])
    }

    const setupEventListeners = function(el) {
        document.addEventListener('keydown', function movement(event) {
            event.preventDefault();
            if (check === true) {
                document.removeEventListener('keydown', movement, false);
                check = false;
            }
            if (event.keyCode === up || event.which === up) {
                if (logicCtrl.collisionRotate(logicCtrl.landed, el) !== 0) {
                    // el.rotate();
                }
            } else if (event.keyCode === left || event.which === left) {
                if (logicCtrl.collisionLeft(logicCtrl.landed, el) !== 0) {
                    el.left();
                }
            } else if (event.keyCode === right || event.which === right) {
                if (logicCtrl.collisionRight(logicCtrl.landed, el) !== 0) {
                    el.right();
                }
            } else if (event.keyCode === down || event.which === down) {
                if (logicCtrl.collisionDown(logicCtrl.landed, el) !== 0) {
                    el.down();
                }
            } else if (event.keyCode === space || event.which === space) {

            }
            el.draw();
        });
    }




    return {
        gameLoop: () => {
            let randTet = logicCtrl.getRandom(tetro);

            setupEventListeners(randTet);

            randTet.draw();

            let move = setInterval(() => {
                if (logicCtrl.collisionDown(logicCtrl.landed, randTet) !== 0) {
                    randTet.down();
                    logicCtrl.setCanvas(ctx, canvas, u1);
                    randTet.draw();
                } else {
                    check = true;
                    clearInterval(move);
                    logicCtrl.insert(logicCtrl.landed, randTet);
                    let scoreCheck = logicCtrl.removeLine(logicCtrl.landed, score);
                    if (scoreCheck === true) {
                        speed -= 100;
                    }
                    randTet.counter++;
                    randTet.reset();
                    elementController.gameLoop();
                }
            }, speed);
        },
        gameStop: () => {
            logicCtrl.startScreen(ctx, canvas, u1);
        },
    }

})(logicController);

let mainController = (function (logicCtrl, elCtrl) {

    let gameplay = false;

    return {
        changeStatus() {
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            if (mouseX > 590 && mouseX < 715 && mouseY > 170 && mouseY < 210) {
                gameplay = true;
                mainController.init();
            }
        },

        init() {
            if (gameplay === true) {
                elCtrl.gameLoop();
            } else {
                elCtrl.gameStop();
            }
        }
    }


})(logicController, elementController);

mainController.init();




// TODO: score system added but bugs present
// TODO: set gameover with screen
// TODO: repair rotation collision
