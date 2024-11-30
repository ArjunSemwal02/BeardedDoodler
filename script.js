const gridElement = document.querySelector('.grid');
const beardedDoodlerElement = document.createElement('div')

let doodlerLeftSpace
let doodlerBottomSpace = 5
let isGameOver = false
let platformCount = 6
let platforms = []
let upTimerId
let downTimerId

const createDoodler = () => {
    beardedDoodlerElement.classList.add('doodler')
    gridElement.appendChild(beardedDoodlerElement)
    doodlerLeftSpace = platforms[0].left

    beardedDoodlerElement.style.left = doodlerLeftSpace + 'rem'
    beardedDoodlerElement.style.bottom = doodlerBottomSpace + 'rem'
}

const movePlatforms = () => {
    if(doodlerBottomSpace > 4){
        platforms.forEach(platform => {
            platform.bottom -= .5
            let visual = platform.visual
            visual.style.bottom = platform.bottom + 'rem'
        })
    }
}

const jump = () => {
    clearInterval(downTimerId)
    upTimerId = setInterval(() => {
        doodlerBottomSpace += .5
        beardedDoodlerElement.style.bottom = doodlerBottomSpace + 'rem'
        if(doodlerBottomSpace > 20)
            fall()
    }, 30)
}

const fall = () => {
    clearInterval(upTimerId)
    downTimerId = setInterval(() => {
        doodlerBottomSpace -= .5
        beardedDoodlerElement.style.bottom = doodlerBottomSpace + 'rem'
        if(doodlerBottomSpace <= 0)
            gameOver()
    }, 30)
}

function gameOver(){
    console.log('Game is Over')
    isGameOver = true
    clearInterval(upTimerId)
    clearInterval(downTimerId)
}

const start = () => {
    if(!isGameOver){
        createPlatforms()
        createDoodler()
        setInterval(movePlatforms, 30)
        jump()
    }
}

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

const createPlatforms = () => {
    for( let i = 0; i < platformCount; i++){
       let platformGap = 57 / platformCount
       let newPlatformBottom = 9 + i * platformGap
       let newPlaform = new Platform(newPlatformBottom)
       platforms.push(newPlaform)
       console.log(platforms)
    }
}

//attach it to a button
start()