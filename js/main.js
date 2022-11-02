// TODO 
// 1. Create board object 
// 2. create board populate function 
// 3. check for game win 
// 4. If not won, switch players and repeat steps 2-4
// 5. Call draw



let c = console.log.bind(document)
let dq = document.querySelector.bind(document)
let dqa = document.querySelectorAll.bind(document)
let gameStarted = true

let gameboard = (function(){
    let player = 'X'
    let board = ['','','','','','','','','']
    let gameOn = true
    let winner = undefined
    let winningSequence = [
        [0,1,2], [3,4,5], [6,7,8], [0,3,6],
        [1,4,7], [2,5,8], [0,4,8],  [2,4,6] 
    ]
   
    // TODO
    function switchPlayer(){
        if(player == 'X'){
            player = 'O'
            return
        }
        player = 'X'
    }
    
    function populate(square){
        let index = square.dataset.index
        
        if(!board[index]){
            board[index] =  player
            square.textContent = player
        }
    }    

    function checkSequence(){
        return winningSequence.some(isValidSequence)
    }

    function isValidSequence(arr){
        return arr.every((value) => board[value] == player)
    }

    function checkGame(){
        winner = undefined
        gameOn = true
        if(checkSequence()){
            winner = player
            gameOn = false 
            board.forEach(value => value = '')
            
        }
        else if (board.every(value => value == true)){
            gameOn = false
            board.forEach(value => value = '')
        }
        return {winner, gameOn}
    }

function makeMove(square){
    populate(square)
    let winningCheck = checkGame()
    if(!gameOn){
        let winner = winningCheck.winner
        if(winningCheck.winner){
            result = `${winner} wins`
        }
        else result = "it's a draw"
        
        resetDefaults()
        return result
    }
    else{
        switchPlayer()
        return false
    }
}

function resetDefaults(){
    player = "X"
    winner = undefined
    board = ['','','','','','','','','']
}

    return {makeMove, checkGame, switchPlayer, resetDefaults}

})()
    
let squares = dqa('[data-index]')
let start = dq('.start')
let message = dq('.message')

squares.forEach(square => {
    square.addEventListener('click', playGame)
})
start.addEventListener('click', startGame)

function playGame(){
    if (gameStarted){
        let gameResult = gameboard.makeMove(this)
        // c(message)
        if(gameResult) {
            message.style.display='block'
            message.textContent = gameResult
            gameStarted = false 
            start.style.display = 'block' 
        }
}
}

function startGame(){
    gameStarted = true
    this.style.display = 'none';
    squares.forEach(square => {
        square.textContent = ''
    })
    message.style.display = 'none'

}

