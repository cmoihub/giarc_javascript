const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20)

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function update(time = 0){
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if(dropCounter > dropInterval) playerDrop();
    draw();
    requestAnimationFrame(update);
}

function updateScore(){
    document.getElementById('score').innerText = player.score;
}

//simulates block constantly falling
function playerDrop(){
    player.pos.y++;
    //if block has reached bottom send it back up
    if(collide(arena, player)){
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

// prevents from leaving canvas if you keep moving
// sideways
function playerMove(dir){
    player.pos.x += dir;
    if(collide(arena, player))
        player.pos.x -= dir;
}

function playerReset(){
    const pieces = 'ILJOTSZ';
    player.block = createBlocks(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - 
                    (player.block[0].length / 2 | 0);
    if(collide(arena, player)){
        clearArena();
        player.score = 0;
    }
}

function clearArena(){
    arena.forEach(row => row.fill(0));
}

function arenaSweep(){
    let rowCount = 1;
    // iterate from bottom and up
    outer: for (let y = arena.length - 1; y > 0; --y){
        for (let x = 0; x < arena[y].length; ++x){
            // check if line in arena matrix has 0 in it = not fully populated
            if (arena[y][x] === 0){
                continue outer;
            }
        }
        const row = arena.splice(y,1)[0].fill(0);// remove full row
        arena.unshift(row);// put empty row on top of arena
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function playerRotate(dir){
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.block,dir);
    //special case for when block rotates near a wall
    while(collide(arena, player)){
        player.pos.x += 1;// move to right
        // in case of collision move to left
        offset = -(offset + (offset > 0  ? 1 : -1));
        //if too many moves have been made
        if(offset > player.block[0].length){
            rotate(player.block, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(block, dir){
    for (let y = 0; y < block.length; ++y){
        for (let x = 0; x < y; ++x){
            // switch
            [block[x][y],block[y][x],] = [
                block[y][x],block[x][y],];
        }   
    }
    if(dir > 0)
        block.forEach(row => row.reverse());
    else
        block.reverse();
}

function draw(){
    //draw canvas
    context.fillStyle = '#0000FF';
    context.fillRect(0,0,canvas.width, canvas.height);
    //setup tetris pieces
    insertBlocks(arena, {x:0, y:0});
    insertBlocks(player.block, player.pos);
}

//add block to canvas, offset by player's position
function insertBlocks(block, offset){
    block.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if(value!=0){
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1,1);
            }
        });
    });
}
const arena = createArena(12, 20);
function createArena(w, h){
    const matrix = []
    while(h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createBlocks(type){
    if (type === 'T')
        return t_block;
    else if (type === 'I')
        return i_block;
    else if (type === 'J')
        return j_block;
    else if (type === 'L')
        return l_block;
    else if (type === 'O')
        return o_block;
    else if (type === 'S')
        return s_block;
    else if (type === 'Z')
        return z_block;
}

function merge(arena, player) {
    player.block.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function collide(arena, player) {
    const m = player.block;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

const colors = [ null, 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet',];

//The numbers map to colours
const t_block = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

const j_block = [
    [0,2,0],
    [0,2,0],
    [2,2,0],
];

const l_block = [
    [0,3,0],
    [0,3,0],
    [0,3,3],
];

const o_block = [
    [4,4],
    [4,4],
];
const s_block = [
    [0,0,0],
    [0,5,5],
    [5,5,0],
];

const z_block = [
    [0,0,0],
    [6,6,0],
    [0,6,6],
];

const i_block = [
    [0,0,0],
    [7,7,7],
    [0,0,0],
];

const blocks = [
    t_block, j_block, l_block, o_block, s_block, z_block, i_block
];

const player = {
    pos:{x:0, y:0},
    //start with a random block
    // block: blocks[Math.floor(Math.random() * 7)],
    block: null,
    score: 0
};

//Keyboard events
document.addEventListener('keydown', event => {
    switch(event.keyCode){
        case 37:playerMove(-1);
        break;//left case
        case 39:playerMove(+1);
        break;//right case
        case 38:player.pos.y--;
        break;//up case
        case 40:player.pos.y++;
        break;//down case
        case 81:playerRotate(-1);
        break;//Q case
        case 87:playerRotate(1);
        break;//W case
        case 18:clearArena();
        break;//W case
    }
});

playerReset();
updateScore();
update();