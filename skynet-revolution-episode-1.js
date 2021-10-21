/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

//Globals assignment
const neighbors = []; //assigns the neighbors of each nodes
const exit = [] //array for the exit points

var inputs = readline().split(' ');
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L = parseInt(inputs[1]); // the number of links
const E = parseInt(inputs[2]); // the number of exit gateways
for (let i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    const N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    const N2 = parseInt(inputs[1]);
    neighbors[N1] ? neighbors[N1].push(N2) : neighbors[N1] = [N2];
    neighbors[N2] ? neighbors[N2].push(N1) : neighbors[N2] = [N1];
}

for (let i = 0; i < E; i++) {
    const EI = parseInt(readline()); // the index of a gateway node
    exit.push(EI);
}

// game loop
while (true) {
    const SI = parseInt(readline()); // The index of the node on which the Bobnet agent is positioned this turn

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    let que = []; //create a fifo queue (using array push and shift methods) - item format: [Source, Dest]
    const previous = []; //assigns the node previous to the current node in index
    let exitPnt; //contains the nearest exit point that the virus would attack

    //queues the first neighbors of the source
    neighbors[SI].forEach(e => que.push([SI, e]));

    //loops while que is not empty
    while(que){

        //pops the first entry from que
        const temp = que.shift();

        //if there is no recorded traversal
        if(!previous[temp[1]]) previous[temp[1]] = temp[0];

        //ques the neighbors of the current node
        neighbors[temp[1]].forEach(e => {
            if(previous[e]) return;
            que.push([temp[1], e]);
        });

        //checks if exit point is reached and terminate
        if(exit.includes(temp[1])){
            exitPnt = temp[1];
            que = false;
        }
    }

    // Example: 0 1 are the indices of the nodes you wish to sever the link between

    //severes the first link of the shortest path from the virus to the exit point
    console.log(`${exitPnt} ${previous[exitPnt]}`);
}
