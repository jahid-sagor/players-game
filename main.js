(function () {
//Selector
const formElm = document.querySelector('form')
const winnerElm = document.querySelector('.winner')
const scoreElm = document.querySelector('.score span')
const p1ScoreElm = document.querySelector('.p1')
const p2ScoreElm = document.querySelector('.p2')
const inputElm = document.querySelector('#input')
const resetbtnElm = document.querySelector('#resetbtn')
const p1btnElm = document.querySelector('.p1btn')
const p2btnElm = document.querySelector('.p2btn')

//Data store
let p1Score = 0
let p2Score = 0
let winningScore = 10
let gameOver = false
let winner = null
let p1Turn = true
let p2Turn = false

function setInitialPlayerTurnValue() {
    const player = randomizeStartPlayer()
    if(player === 'p1'){
       p1Turn = true
       p2btnElm.setAttribute('disabled','disabled')
       p1btnElm.removeAttribute('disabled')
    }else{
        p2Turn = true
        p1btnElm.setAttribute('disabled','disabled')
        p2btnElm.removeAttribute('disabled')
    }
}

setInitialPlayerTurnValue()

function randomizeStartPlayer() {
    const players = ['p1', 'p2']
    const index = Math.floor((Math.random() * players.length ))
    const Player = players[index]
    return Player
}

function identifyWinningState() {
    if (p1Score === winningScore || p2Score === winningScore) {
        gameOver = true
    }
}

function disableBtnInput() {
    p1btnElm.setAttribute('disabled', 'disabled')
    p2btnElm.setAttribute('disabled', 'disabled')
}

function identifyWinner() {
    if(p1Score === winningScore){
       winner = 'p1'
       winnerElm.textContent = 'Player-1 is Winner'
    }

    if(p2Score === winningScore){
        winner = 'p2'
        winnerElm.textContent = 'Player-2 is Winner'
    }
}

function resetInput() {
    p1Score = 0
    p2Score = 0
    winningScore = 10
    gameOver = false
    winner = null

    p1ScoreElm.textContent = p1Score
    p2ScoreElm.textContent = p2Score
    scoreElm.textContent = winningScore
    winnerElm.textContent = ''


    p1btnElm.removeAttribute('disabled')
    p2btnElm.removeAttribute('disabled')

}

function validateInput(elmVal) {
    if (elmVal.trim() == '' || Number(elmVal) !== Number(elmVal) || Number(elmVal) <= 0) {
        alert('Invalid: Please Input a Valid Number')
        return false
    }else{
        return true
    }
}
//setting winning score into DOM
scoreElm.textContent = winningScore


//p1 increment
p1btnElm.addEventListener('click',(e)=>{
    if(p1Turn){
        p1Score++
        p1ScoreElm.textContent = p1Score
        identifyWinningState()
        identifyWinner()
        p1Turn = false
        p2Turn = true
        p1btnElm.setAttribute('disabled','disabled')
        p2btnElm.removeAttribute('disabled')
    }
    if(gameOver){
        disableBtnInput()
    }
})

//p2 increment
p2btnElm.addEventListener('click',(e)=>{
    if(p2Turn){
        p2Score++
        p2ScoreElm.textContent = p2Score
        identifyWinningState()
        identifyWinner()
        p2Turn = false
        p1Turn = true
        p2btnElm.setAttribute('disabled','disabled')
        p1btnElm.removeAttribute('disabled')
    }
    if(gameOver){
        disableBtnInput()
    }
})

resetbtnElm.addEventListener('click', (e)=>{
   resetInput()
})

formElm.addEventListener('submit',(e)=>{
   e.preventDefault()
   resetInput()
   if (!validateInput(inputElm.value)) return
   const val = Number(inputElm.value)
   console.log((inputElm.value));
   winningScore = val
   scoreElm.textContent = val
   inputElm.value = '' 
   setInitialPlayerTurnValue()
})

})()
