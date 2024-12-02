const gridElement = document.querySelector('.grid');
const beardedDoodlerElement = document.createElement('div')

let doodlerLeftSpace
let startPoint = 5
let doodlerBottomSpace = startPoint
let platforms = []
let platformCount = 7
let upTimerId
let downTimerId
let leftTimerId
let rightTimerId
let isJumping = false
let isGoingLeft = false
let isGoingRight = false
let isGameOver = false
let score = 0

class Platform{
    constructor(newPlatformBottom){
        this.bottom = newPlatformBottom
        this.left = Math.random() * 36
        this.visual = document.createElement('div')

        const visual = this.visual
        visual.classList.add('platforms')
        visual.style.left = this.left + 'rem'
        visual.style.bottom = this.bottom + 'rem'
        gridElement.appendChild(visual)
    }
}

const createDoodler = () => {
    beardedDoodlerElement.classList.add('doodler')
    gridElement.appendChild(beardedDoodlerElement)
    doodlerLeftSpace = platforms[0].left
    beardedDoodlerElement.style.left = doodlerLeftSpace + 'rem'
    beardedDoodlerElement.style.bottom = doodlerBottomSpace + 'rem'
}

const createPlatforms = () => {
    for( let i = 0; i < platformCount; i++){
       let platformGap = 57 / platformCount
       let newPlatformBottom = 10 + i * platformGap
       let newPlaform = new Platform(newPlatformBottom)
       platforms.push(newPlaform)
       console.log(platforms)
    }
}

const movePlatforms = () => {
    if(doodlerBottomSpace > 5){
        platforms.forEach(platform => {
            platform.bottom -= .3
            let visual = platform.visual
            visual.style.bottom = platform.bottom + 'rem'

            if(platform.bottom < .8){
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platforms')
                score++
                platforms.shift()
                console.log(platforms)
                let newPlatform = new Platform(57)
                platforms.push(newPlatform)
            }
        })
    }
}

const jump = () => {
    clearInterval(downTimerId)
    isJumping = true
    upTimerId = setInterval(() => {
        doodlerBottomSpace += .8
        beardedDoodlerElement.style.bottom = doodlerBottomSpace + 'rem'
        if(doodlerBottomSpace > startPoint + 25)
            fall()
    }, 30)
}

const fall = () => {
    clearInterval(upTimerId)
    isJumping = false
    downTimerId = setInterval(() => {
        doodlerBottomSpace -= .5
        beardedDoodlerElement.style.bottom = doodlerBottomSpace + 'rem'
        if(doodlerBottomSpace <= 0)     gameOver()
        platforms.forEach(platform => {
            if(
                (doodlerBottomSpace >= platform.bottom) &&
                (doodlerBottomSpace <= (platform.bottom + 1)) &&
                ((doodlerLeftSpace + 6) >= platform.left) &&
                (doodlerLeftSpace <= (platform.left + 9)) &&
                !isJumping
            ) {
                console.log('landed')
                startPoint = doodlerBottomSpace
                jump()
            }
        })
    }, 30)
}

const control = (e) => {
    if(e.key === "ArrowLeft"){
        moveLeft()
    }else if(e.key === "ArrowRight"){
        moveRight()
    }else if(e.key === "ArrowUp"){
        moveStraight()
    }
}

const moveLeft = () => {
    if(isGoingRight){
        clearInterval(rightTimerId)
        isGoingRight = false
    }
    isGoingLeft = true
    leftTimerId = setInterval( function () {
        if(doodlerLeftSpace >= 0){
            doodlerLeftSpace -= .5
            beardedDoodlerElement.style.left = doodlerLeftSpace + 'rem'
        }
    }, 30)
}

function moveRight() {
    if(isGoingLeft){
        clearInterval(leftTimerId)
        isGoingLeft = false
    }
    isGoingRight = true
    rightTimerId = setInterval(function() {
        if(doodlerLeftSpace <= 39){
            doodlerLeftSpace += .5
            beardedDoodlerElement.style.left = doodlerLeftSpace + 'rem'
        }
    }, 30)
}

function moveStraight() {
    isGoingLeft = false
    isGoingRight = false
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
}

function gameOver(){
    console.log('Game is Over')
    isGameOver = true
    while(gridElement.firstChild){
        gridElement.removeChild(gridElement.firstChild)
    }
    displayScore()
    clearInterval(upTimerId)
    clearInterval(downTimerId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
}

const displayScore = () => {
    const scoreElement = document.createElement('div')
    scoreElement.innerHTML = `Score: ${score}`
    scoreElement.style.fontSize = '4rem'
    scoreElement.style.justifySelf = 'center'
    scoreElement.style.color = 'darkred'
    gridElement.appendChild(scoreElement)
}

const start = () => {
    if(!isGameOver){
        createPlatforms()
        createDoodler()
        setInterval(movePlatforms, 30)
        jump()
        document.addEventListener('keyup', control)
    }
}

//attach it to a button
start()