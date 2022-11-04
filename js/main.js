// TODO 
// 1. Create board object 
// 2. create board populate function 
// 3. check for game win 
// 4. If not won, switch players and repeat steps 2-4
// 5. Call draw

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
    function populate(square){
        let index = square.dataset.index
        
        if(!board[index]){
            board[index] =  player
            square.textContent = player
        }
    }    
    
    function checkGame(){
        winner = undefined
        gameOn = true
        if(checkSequence()){
            winner = player
            gameOn = false 
        }
        else if (board.every(value => value)){
            gameOn = false
        }
        return {winner, gameOn}
    }
    function switchPlayer(){
        if(player == 'X'){
            player = 'O'
            return 
        }
        player = 'X'
    }
    
    function makeMove(square){
        populate(square)
        let winningCheck = checkGame()
        if(!gameOn){
            let winner = winningCheck.winner
            if(winningCheck.winner){
                result = `${winner} wins`
            }
            else {
                result = "it's a draw"
            }
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

    function checkSequence(){
        return winningSequence.some(isValidSequence)
    }

    function isValidSequence(arr){
        return arr.every((value) => board[value] == player)
    }

    return {makeMove, checkGame, switchPlayer, resetDefaults, player}

})()
    
let c = console.log.bind(document)
let dq = document.querySelector.bind(document)
let dqa = document.querySelectorAll.bind(document)
let gameStarted = false
let squares = dqa('[data-index]')
let start = dq('.start')
let message = dq('.message')
let running = dq('.running')
let player = dq('.running span')
let playerTurn = "X"

squares.forEach(square => {
    square.addEventListener('click', playGame)
})
start.addEventListener('click', startGame)

function playGame(){
    let playerValue = this.textContent

    if (gameStarted){
        if(playerValue) return
        let gameResult = gameboard.makeMove(this)
        if(gameResult) {
            message.style.display='block'
            message.textContent = gameResult
            gameStarted = false 
            running.style.display = 'none'
            start.style.display = 'block' 
            start.classList.add('restart')
            start.textContent = 'Restart'
        }
        else {
            switchPlayer(playerValue)
        running.style.display = 'block'
        player.textContent = playerTurn
        }
    }
}

function startGame(){
    running.style.display = 'block'
    gameStarted = true
    this.style.display = 'none';
    squares.forEach(square => {
        square.textContent = ''
    })
    message.style.display = 'none'
    playerTurn = "X"
    player.textContent = playerTurn
}

function switchPlayer(){
    if(playerTurn == 'X'){
        playerTurn = 'O'
        return 
    }
    playerTurn = 'X'
}

