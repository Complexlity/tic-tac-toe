// TODO 
// 1. Create board object 
// 2. create board populate function 
// 3. check for game win 
// 4. If not won, switch players and repeat steps 2-4
// 5. Call draw



let c = console.log.bind(document)
let dq = document.querySelector.bind(document)
let dqa = document.querySelectorAll.bind(document)

let gameboard = (function(){
    let player = 'X'
    let gameActive = true
    let board = ['','','','','','','','','']
    /* winning sequence            Board Visualization
    [0][1][2] , [3][4][5]         [0, 1, 2]
    [6][7][8] , [0][3][6]         [3, 4, 5]      
    [1][4][7] , [2][5][8]         [6, 7, 8] 
    [0][4][8] , [2][4][6]   */
    // TODO
    function switchPlayer(){
    }
    
    function checkSequence(){
    }

    function populate(square){
        let index = square.dataset.index
        if(!board[index]){
            board[index] =  player
            square.textContent = player
        }
    }

    return {populate, board}

})()
    
let squares = dqa('.tiles')
squares.forEach(square => {
    square.addEventListener('click', (e) => gameboard.populate(e.target))
})