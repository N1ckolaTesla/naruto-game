import { GameConstants } from "./gameConstants"
import { Sprite } from "./sprite"
import { Fighter } from "./fighter"
import { decreaseTimer, rectangularCollision, determineWinner, timerId } from "./utils"

const gameConstants = new GameConstants()

const background1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: '../assets/imgs/background/background_layer_1.png',
    scale: 3.2
})
const background2 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: '../assets/imgs/background/background_layer_2.png',
    scale: 3.2
})
const background3 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: '../assets/imgs/background/background_layer_3.png',
    scale: 3.2
})
const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/shop_anim.png',
    scale: 2.75,
    framesMax: 6
})
const ground = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/oak_woods_tileset.png',
    scale: 2,
    framesMax: 1,
    offset: {
        x: 0,
        y: -350
    }
})
const fence1 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/fence_1.png',
    scale: 2,
    framesMax: 1,
    offset: {
        x: -450,
        y: -312
    }
})
const fence2 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/fence_2.png',
    scale: 2,
    framesMax: 1,
    offset: {
        x: -920,
        y: -312
    }
})
const lamp = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/lamp.png',
    scale: 2,
    framesMax: 1,
    offset: {
        x: -400,
        y: -237
    }
})
const rock1 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/rock_1.png',
    scale: 2,
    framesMax: 1,
    offset: {
        x: -50,
        y: -328
    }
})
const rock2 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/rock_2.png',
    scale: 2,
    framesMax: 1,
    offset: {
        x: -300,
        y: -327
    }
})
const rock3 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/rock_3.png',
    scale: 2,
    framesMax: 1,
    offset: {
        x: -170,
        y: -313
    }
})
const sign = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/sign.png',
    scale: 3,
    framesMax: 1,
    offset: {
        x: -930,
        y: -259
    }
})
const grass1_1 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/grass_1.png',
    scale: 3,
    framesMax: 1,
    offset: {
        x: -830,
        y: -341
    }
})
const grass1_2 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/grass_1.png',
    scale: 3,
    framesMax: 1,
    offset: {
        x: -430,
        y: -342
    }
})
const grass2_1 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/grass_2.png',
    scale: 3,
    framesMax: 1,
    offset: {
        x: -340,
        y: -336
    }
})
const grass2_2 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/grass_2.png',
    scale: 3,
    framesMax: 1,
    offset: {
        x: -140,
        y: -336
    }
})
const grass3_1 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/grass_3.png',
    scale: 3,
    framesMax: 1,
    offset: {
        x: -270,
        y: -338
    }
})
const grass3_2 = new Sprite({
    position: {
        x: 0,
        y: 128
    },
    imageSrc: '../assets/imgs/decorations/grass_3.png',
    scale: 3,
    framesMax: 1,
    offset: {
        x: -520,
        y: -338
    }
})

const player = new Fighter({
    position: {
        x: 300,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: '../assets/imgs/person/naruto-idle-right.png',
    framesMax: 1,
    scale: 1,
    offset: {
        x: 0,
        y: -48
    },
    sprites: {
        idle: {
            imageSrc: '../assets/imgs/person/naruto-idle-right.png',
            framesMax: 1
        },
        run: {
            imageSrc: '../assets/imgs/person/n-run-right.png',
            framesMax: 7
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
            imageSrc: '../assets/imgs/person/Attack1.png',
            framesMax: 6      
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
})
const enemy = new Fighter({
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
            imageSrc: '../assets/imgs/person/n-attack2-right.png',
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
})

player.draw()
enemy.draw()

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }, 
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    gameConstants.ctx.fillStyle = 'black'
    gameConstants.ctx.fillRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight)
    background1.update()
    background2.update()
    background3.update()
    shop.update()
    ground.update()
    fence1.update()
    fence2.update()
    lamp.update()
    rock1.update()
    rock2.update()
    rock3.update()
    sign.update()
    grass1_1.update()
    grass1_2.update()
    grass2_1.update()
    grass2_2.update()
    grass3_1.update()
    grass3_2.update()
    gameConstants.ctx.fillStyle = 'rgba(255, 255, 255, .15)'
    gameConstants.ctx.fillRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    

    //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        if (player.isRunningLeft) {
            player.velocity.x = -10
        } else if (!player.isRunningLeft) {
            player.velocity.x = -5
        }
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        if (player.isRunningRight) {
            player.velocity.x = 10
        } else if (!player.isRunningRight) {
            player.velocity.x = 5
        }
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        if (enemy.isRunningLeft) {
            enemy.velocity.x = -10
        } else if (!enemy.isRunningLeft) {
            enemy.velocity.x = -5
        }
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        if (enemy.isRunningRight) {
            enemy.velocity.x = 10
        } else if (!enemy.isRunningRight) {
            enemy.velocity.x = 5
        }
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }
    //detect for collision & enemy gets hit
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && 
        player.isAttacking &&
        player.framesCurrent === 4
    ) {
        enemy.takeHit()
        player.isAttacking = false
        gsap.to('#enemyHealth', {width: enemy.health + '%'})
    } //if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }
    //detect for collison & player gets hit
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) && 
        enemy.isAttacking &&
        enemy.framesCurrent === 2
    ) {
        player.takeHit()
        enemy.isAttacking = false
        gsap.to('#playerHealth', {width: player.health + '%'})
    } //if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }
    // end game based on health
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({player, enemy, timerId})
        if (player.health <= 0) {
            player.switchSprite('death')
        } else if (enemy.health <= 0) {
            enemy.switchSprite('death')
        }
    }
}

animate()

window.addEventListener('keydown', (e) => {
    if (!player.dead) {
        switch (e.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                if (player.readyToRunRight) {
                    if (player.readyToRunRightTimeout) {
                        clearTimeout(player.readyToRunRightTimeout)
                    }
                    player.readyToRunRight = true
                    player.isRunningRight = true
                }
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                if (player.readyToRunLeft) {
                    if (player.readyToRunLeftTimeout) {
                        clearTimeout(player.readyToRunLeftTimeout)
                    }
                    player.readyToRunLeft = true
                    player.isRunningLeft = true
                }
                break
            case 'w':
                if (player.velocity.y === 0) player.velocity.y = -20
                break
            case ' ': 
                player.attackCountAvailable++
                player.attack()
                break
        }
    }
    if (!enemy.dead) {
        switch (e.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                if (enemy.readyToRunRight) {
                    if (enemy.readyToRunRightTimeout) {
                        clearTimeout(enemy.readyToRunRightTimeout)
                    }
                    enemy.readyToRunRight = true
                    enemy.isRunningRight = true
                }
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                if (enemy.readyToRunLeft) {
                    if (enemy.readyToRunLeftTimeout) {
                        clearTimeout(enemy.readyToRunLeftTimeout)
                    }
                    enemy.readyToRunLeft = true
                    enemy.isRunningLeft = true
                }
                break
            case 'ArrowUp':
                if (enemy.velocity.y === 0) enemy.velocity.y = -20
                break
            case 'ArrowDown':
                enemy.attackCountAvailable++
                enemy.attack()
                break
        }
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = false
            player.readyToRunRight = true
            player.readyToRunRightTimeout = setTimeout(() => player.readyToRunRight = false, 500)
            if (player.readyToRunRight && player.isRunningRight) {
                player.readyToRunRight = false
                player.isRunningRight = false
            }
            break
        case 'a':
            keys.a.pressed = false
            player.readyToRunLeft = true
            player.readyToRunLeftTimeout = setTimeout(() => player.readyToRunLeft = false, 500)
            if (player.readyToRunLeft && player.isRunningLeft) {
                player.readyToRunLeft = false
                player.isRunningLeft = false
            }
            break
        case 'w':
            keys.w.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            enemy.readyToRunRight = true
            enemy.readyToRunRightTimeout = setTimeout(() => enemy.readyToRunRight = false, 500)
            if (enemy.readyToRunRight && enemy.isRunningRight) {
                enemy.readyToRunRight = false
                enemy.isRunningRight = false
            }
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            enemy.readyToRunLeft = true
            enemy.readyToRunLeftTimeout = setTimeout(() => enemy.readyToRunLeft = false, 500)
            if (enemy.readyToRunLeft && enemy.isRunningLeft) {
                enemy.readyToRunLeft = false
                enemy.isRunningLeft = false
            }
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
})