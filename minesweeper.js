//Welcome to version 1 minesweeper on console.

var userboard = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var bombboard = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var rows, cols, bombs, bombsleft;
var letters = ['a','b','c','d','e','f','g','h','i','j'];
var numbers = [1,2,3,4,5,6,7,8,9,10];
var cCol, cRow, cMark, selectspace, userspace;
var difficulty;
var showuserboard = "";
var showbombboard = "";
var selectspace;
var count = 0;
var tempC, tempR, clarr;
var spacesLeft;
var x, y;
var reference = false;
var ul, up, ur, l, r, bl, bot, br;
var Bul, Bup, Bur, Bl, Br, Bbl, Bbot, Bbr;


(function gameIntro(){

    alert("Welcome to minesweeper.\n\nThere are three difficulty settings.\n\n" +
          "Easy, Medium, and Hard.\n\nTo win, uncover all the empty spaces.\n\n" +
          "If you click on a bomb you lose.\n\nYou can flag spots that you determine to be bombs.\n\n" +
          "A clicked spot that does not have a bomb will let you know how many neighboring bombs there are.\n\n" +
          "Good Luck!");
    
    setBoard();

}());



function setBoard() {
    
    difficulty = prompt("What level difficulty would you like to play?\n\n" +
                        "'easy', 'medium', 'hard'");
    
    if (difficulty === 'easy') {
    
        rows = 5;
        cols = 5;
        bombs = 6;
    
    }
    
    else if (difficulty === 'medium') {
    
        rows = 7;
        cols = 8;
        bombs = 11;

    }
    
    else if (difficulty === 'hard') {
    
        rows = 10;
        cols = 10;
        bombs = 18;
    
    } else {
    
        alert("That is not an available difficulty setting.");
        setBoard();
    
    }
    
    bombsleft = bombs;
    
    letters.splice(cols, 10-cols);
    numbers.splice(rows, 10-rows);
    console.log(letters);
    console.log(numbers);
    
    var cheat = prompt("Would you like to see the bomb board as you play?\n\n" +
                       "If you want to win fairly type 'no'.\n\n" +
                       "If you are testing the game for bugs I recommend 'yes'.");
    
    if (cheat === 'yes') {
    
        reference = true;
    
    }
    
    for (var i = 0; i < cols + 1; i++) {

        userboard[0][i+1] = letters[i];
        userboard[rows+1][i] = ' X';
        bombboard[0][i+1] = letters[i];
        bombboard[rows+1][i] = ' X';

    }

    for (var i = 0; i < rows + 1; i++) {

        userboard[i+1][0] = numbers[i];
        userboard[i][cols+1] = 'X';
        bombboard[i+1][0] = numbers[i];
        bombboard[i][cols+1] = 'X';

    }

    userboard[0][0] = 'X';
    bombboard[0][0] = 'X';
    userboard[rows+1][cols+1] = 'X';
    userboard[rows+1][0] = 'X';
    bombboard[rows+1][cols+1] = 'X';
    bombboard[rows+1][0] = 'X';

    for (var i = 1; i < rows + 1; i++) {

        for (var j = 1; j < cols + 1; j++) {

            userboard[i][j] = '[_]';
            bombboard[i][j] = '[_]';

        }

    }

    var x, y;

    for (var i = 0; i < bombs; i++) {

        placeBomb();

    }
    
    seeUserBoard();
    
    if (reference === true) {
    
        seeBombBoard();
        
    }
    
    return playerMove();
    
}


function placeBomb() {

    x = Math.ceil(Math.random() * cols);
    y = Math.ceil(Math.random() * rows);
    
    if (bombboard[y][x] === "[B]") {
    
        placeBomb();
    
    } else {
    
        bombboard[y][x] = "[B]";
        
    }
    
}


function seeUserBoard () {
    
    showuserboard = "\n\n~~~~~~USER BOARD~~~~~~\n";

    for (var i = 0; i < rows + 2; i++){

        showuserboard += "\n";

        for (j = 0; j < cols + 2; j++) {

            showuserboard += userboard[i][j] + "\t";
            
        }

    }
    console.log(showuserboard);
    
    console.log("\n\nBombs left: " + bombsleft);
    
}

function seeBombBoard () {
    
    showbombboard = "\n\n~~~~~~BOMB BOARD~~~~~~\n";

    for (var i = 0; i < rows + 2; i++){

        showbombboard += "\n";

        for (j = 0; j < cols + 2; j++) {

            showbombboard += bombboard[i][j] + "\t";
            
        }

    }
    console.log(showbombboard);
    
}




function playerMove() {
    
    checkForWin();

    cCol = prompt("Pick a column").toLowerCase();
    
    if (letters.indexOf(cCol) === -1) {
    
        alert("That is not a column on this board");
        return playerMove();
        
    }
    
    cRow = Number(prompt("Pick a row"));
    
    if (numbers.indexOf(cRow) === -1 || cRow > rows || cRow === 0) {
    
        alert("That is not a row on this board");
        return playerMove();
        
    }
    
    cMark = prompt("What do you want to do? 'click' or 'flag'").toLowerCase();
    
    if (cMark === 'click') {
    
        tempC = letters.indexOf(cCol)+1;
        tempR = numbers.indexOf(cRow)+1;
        
        clarr = [tempC, tempR];
    
        selectspace = bombboard[numbers.indexOf(cRow)+1][letters.indexOf(cCol)+1];
        userspace = userboard[numbers.indexOf(cRow)+1][letters.indexOf(cCol)+1];
        console.log(selectspace);
        doAction();
     
    } else if (cMark === 'flag') {
    
        tempC = letters.indexOf(cCol)+1;
        tempR = numbers.indexOf(cRow)+1;
    
        selectspace = bombboard[numbers.indexOf(cRow)+1][letters.indexOf(cCol)+1];
        userspace = userboard[numbers.indexOf(cRow)+1][letters.indexOf(cCol)+1];
        console.log(selectspace);
        doAction();
    
    } else {
    
        alert("That is not an option for this game");
        return playerMove();
    
    }
    
}

function doAction() {
    
    if(cMark === 'click') {
    
        return playerClick();
    
    } else if (cMark === 'flag') {
    
        return playerFlag();
    
    }

}
    
function playerClick() {
    
    if (userspace === '[F]') {
    
        var verify = prompt("You currently have that space flagged as a bomb.\n\n" +
                      "Are you sure you want to click it? 'yes' or 'no'");
        
        if (verify === 'yes') {
        
            bombsleft++;
            
            if (selectspace === '[B]') {
    
                return gameOver();
    
            }   
            
            return spaceClicked(clarr);
        
        } else if (verify === 'no') {
        
            return playerMove();
        
        } else {
        
            alert("Didn't catch that");
            return playerMove();
        
        }
    
    }
    
    if (selectspace === '[B]') {
    
        return gameOver();
    
    } 
    
    
    if (selectspace === '[_]') {
    
        return spaceClicked(clarr);
    
    }
    
    else {
    
        alert("That spot has already been clicked");
        return playerMove();
    
    }
    

}    

function playerFlag() {

    if (selectspace === '[B]' || userspace === '[_]') {
    
        userboard[numbers.indexOf(cRow)+1][letters.indexOf(cCol)+1] = '[F]';
        userspace = userboard[numbers.indexOf(cRow)+1][letters.indexOf(cCol)+1];
        bombsleft--;
    
    } else {
    
        alert("That space has either already been flagged or clicked.");
        return playerMove();
    
    }
    
    seeUserBoard();
    
    if (reference === true) {
    
        seeBombBoard();
        
    }
    
    return playerMove();
    
}





    
function gameOver() {

    alert("BOMB! GAME OVER!");
    bombboard[numbers.indexOf(cRow)+1][letters.indexOf(cCol)+1] = '{Z}';
    return seeBombBoard();
    
}
    
function spaceClicked(arr) {
    
    console.log(arr);
    
    countNearbyBombs(arr);
    
    if (count === 0) {
    
        checkNeighbors('[B]', arr);
    
    }
    
    
    seeUserBoard();
    
    if (reference === true) {
    
        seeBombBoard();
        
    }
    
    return playerMove();

}

function countNearbyBombs(colrow) {

    console.log(colrow);
    count = 0;
    
    if(bombboard[colrow[1]-1][colrow[0]-1] === '[B]') {
        count++;
    }
    if(bombboard[colrow[1]-1][colrow[0]] === '[B]') {
        count++;
    }
    if(bombboard[colrow[1]-1][colrow[0]+1] === '[B]') {
        count++;
    }
    if(bombboard[colrow[1]][colrow[0]-1] === '[B]') {
        count++;
    }
    if(bombboard[colrow[1]][colrow[0]+1] === '[B]') {
        count++;
    }
    if(bombboard[colrow[1]+1][colrow[0]-1] === '[B]') {
        count++;
    }
    if(bombboard[colrow[1]+1][colrow[0]] === '[B]') {
        count++;
    }
    if(bombboard[colrow[1]+1][colrow[0]+1] === '[B]') {
        count++;
    }
    
    console.log(count);

    placeNumber(colrow);
    
}

function placeNumber(arr) {
    
    userboard[arr[1]][arr[0]] = ' ' + count;
    bombboard[arr[1]][arr[0]] = ' ' + count;
    
}

function checkNeighbors(b, arr) {
    
    console.log(arr);
    
    ul = [arr[0]-1, arr[1]-1];
    up = [arr[0], arr[1]-1];
    ur = [arr[0]+1, arr[1]-1];
    l = [arr[0]-1, arr[1]];
    r = [arr[0]+1, arr[1]];
    bl = [arr[0]-1, arr[1]+1];
    bot = [arr[0], arr[1]+1];
    br = [arr[0]+1, arr[1]+1];
    
    var loop = [ul, up, ur, l, r, bl, bot, br];
        
    Bul = bombboard[ul[1]][ul[0]];
    console.log(Bul);
    Bup = bombboard[up[1]][up[0]];
    Bur = bombboard[ur[1]][ur[0]];
    Bl = bombboard[l[1]][l[0]];
    Br = bombboard[r[1]][r[0]];
    Bbl = bombboard[bl[1]][bl[0]];
    Bbot = bombboard[bot[1]][bot[0]];
    Bbr = bombboard[br[1]][br[0]];
    
    
//    
//    
//    console.log(ul);
//    console.log(up);
//    console.log(ur);
//    console.log(l);
//    console.log(r);
//    console.log(bl);
//    console.log(bot);
//    console.log(br);
    
    if (Bul != b && Bup != b && Bur != b && Bl != b && Br != b && Bbl != b && Bbot != b && Bbr != b) {
    
        console.log("no neighbors");
        
        if (Bul === '[_]'){ countNearbyBombs(ul) }
        if (Bup === '[_]'){ countNearbyBombs(up) }
        if (Bur === '[_]'){ countNearbyBombs(ur) }
        if (Bl === '[_]'){ countNearbyBombs(l) }
        if (Br === '[_]'){ countNearbyBombs(r) }
        if (Bbl === '[_]'){ countNearbyBombs(bl) }
        if (Bbot === '[_]'){ countNearbyBombs(bot) }
        if (Bbr === '[_]'){ countNearbyBombs(br) }
        
        
    }
    

}

function checkForWin() {

    spacesLeft = 0;
    
    for (var i = 1; i < rows + 1; i++) {

        for (var j = 1; j < cols + 1; j++) {
    
            if (bombboard[i][j] === '[_]') {
        
                spacesLeft++;
        
            }
    
        }
        
    }

    console.log(spacesLeft);

    if (spacesLeft === 0) {
    
        return playerWins();
        
    }
    
}

function playerWins() {

    alert("Congratulations! You win!");
    seeBombBoard();
    
    return resetGame();
    
}

function resetGame() {

    
    userboard = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    bombboard = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    letters = ['a','b','c','d','e','f','g','h','i','j'];
    numbers = [1,2,3,4,5,6,7,8,9,10];
    bombs = 0;
    showuserboard = "";
    showbombboard = "";
    reference = false;
    bombsleft = 0;

    return setBoard();
    
}