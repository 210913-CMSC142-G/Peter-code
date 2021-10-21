/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const W = parseInt(inputs[0]); // width of the building.
const H = parseInt(inputs[1]); // height of the building.
const N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
const X0 = parseInt(inputs[0]);
const Y0 = parseInt(inputs[1]);

let x1 = 0;
let y1 = 0;
let x2 = W - 1;
let y2 = H - 1;
let x=X0,y=Y0;

// game loop
while (true) {
    const bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    bombDir.includes('U') ? (y2==1 ? y2=0 : y2=y) : bombDir.includes('D') ? (y1==H-2 ? y1=H-1 : y1=y) : '';
    bombDir.includes('R') ? (x1==W-2 ? x1=W-1 : x1=x) : bombDir.includes('L') ? (x2==1 ? x2=0 : x2=x) : '';

    x = x1 + Math.floor((x2-x1)/2);
    y = y1 + Math.floor((y2-y1)/2);
    
    // the location of the next window Batman should jump to.
    console.log(`${x} ${y}`);
    console.error(bombDir,x1,x2,y1,y2);
}