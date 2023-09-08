export const personSaski = {
    position: {
        x: 682,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: '../assets/imgs/enemy/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 172
    },
    sprites: {
        idle: {
            imageSrc: '../assets/imgs/enemy/Idle.png',
            framesMax: 4
        },
        walk: {
            imageSrc: '../assets/imgs/person/naruto-walk-right.png',
            framesMax: 6
        },
        run: {
            imageSrc: '../assets/imgs/enemy/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: '../assets/imgs/enemy/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: '../assets/imgs/enemy/Fall.png',
            framesMax: 2        
        },
        attack1: {
            imageSrc: '../assets/imgs/enemy/Attack1.png',
            framesMax: 4    
        },
        attack2: {
            imageSrc: '../assets/imgs/enemy/Attack2.png',
            framesMax: 4
        },
        attack3: {
            imageSrc: '../assets/imgs/person/naruto-hit-right.png',
            framesMax: 13
        },
        attackFlying: {
            imageSrc: '../assets/imgs/person/naruto-attack-jump-right.png',
            framesMax: 2
        },
        takeHit: {
            imageSrc: '../assets/imgs/enemy/Take Hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: '../assets/imgs/enemy/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    },
    facingRight: false
}