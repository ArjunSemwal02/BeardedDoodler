const gridElement = document.querySelector('.grid');
const beardedDoodlerElement = document.createElement('div')

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

let doodlerLeftSpace
let startPoint = 5
let doodlerBottomSpace = startPoint
let isGameOver = false
let platformCount = 7
let platforms = []
let upTimerId
let downTimerId
let isJumping = false
let isGoingLeft = false
let isGoingRight = false
let leftTimerId
let rightTimerId

const createDoodler = () => {
    beardedDoodlerElement.classList.add('doodler')
    gridElement.appendChild(beardedDoodlerElement)
    doodlerLeftSpace = platforms[0].left
    beardedDoodlerElement.style.left = doodlerLeftSpace + 'rem'
    beardedDoodlerElement.style.bottom = doodlerBottomSpace + 'rem'
}

const createPlatforms = () => {
    for( let i = 0; i < platformCount; i++){
       let platformGap = 70 / platformCount
       let newPlatformBottom = 9 + i * platformGap
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
        })
    }
}

const jump = () => {
    clearInterval(downTimerId)
    isJumping = true
    upTimerId = setInterval(() => {
        doodlerBottomSpace += .8
        beardedDoodlerElement.style.bottom = doodlerBottomSpace + 'rem'
        if(doodlerBottomSpace > startPoint + 30)
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

function gameOver(){
    console.log('Game is Over')
    isGameOver = true
    clearInterval(upTimerId)
    clearInterval(downTimerId)
}

const control = (e) => {
    if(e.key === 'ArrowLeft'){
        moveLeft()
    }else if(e.key === "ArrowRight"){
        //moveRight
    }else if(e.key === "ArrowUp"){
        //moveUp
    }
}

const moveLeft = () => {
    isGoingLeft = true
    leftTimerId = setInterval( function () {
        if(doodlerLeftSpace >= 0){
            doodlerLeftSpace -= .5
            beardedDoodlerElement.style.left = doodlerLeftSpace + 'rem'
        }
    }, 30)
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