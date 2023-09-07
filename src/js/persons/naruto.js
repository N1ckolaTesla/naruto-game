export const personNaruto = {
    position: {
        x: 300,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: '../assets/imgs/person/naruto-idle-right.png',
    framesMax: 6,
    scale: 2,
    offset: {
        x: 0,
        y: -31
    },
    sprites: {
        idle: {
            imageSrc: '../assets/imgs/person/naruto-idle-right.png',
            framesMax: 6
        },
        walk: {
            imageSrc: '../assets/imgs/person/naruto-walk-right.png',
            framesMax: 6
        },
        run: {
            imageSrc: '../assets/imgs/person/naruto-run-right.png',
            framesMax: 6
        },
        jump: {
            imageSrc: '../assets/imgs/person/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: '../assets/imgs/person/Fall.png',
            framesMax: 2        
        },
        attack1: {
            imageSrc: '../assets/imgs/person/naruto-attack1-right.png',
            framesMax: 4
        },
        attack2: {
            imageSrc: '../assets/imgs/person/Attack2.png',
            framesMax: 6
        },
        attack3: {
            imageSrc: '../assets/imgs/person/naruto-hit-right.png',
            framesMax: 13
        },
        attackFlying: {
            imageSrc: '../assets/imgs/person/n-attack2-right.png',
            framesMax: 2
        },
        takeHit: {
            imageSrc: '../assets/imgs/person/Take Hit.png',
            framesMax: 4
        },
        death: {
            imageSrc: '../assets/imgs/person/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
}