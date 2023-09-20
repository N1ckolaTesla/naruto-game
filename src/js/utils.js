export function attackCollision(player1, player2) {
    return (
        player1.attackBox.position.x + player1.attackBox.width >= player2.position.x &&
        player1.attackBox.position.x <= player2.position.x + player2.width &&
        player1.attackBox.position.y + player1.attackBox.height >= player2.position.y &&
        player1.attackBox.position.y <= player2.position.y + player2.height &&
        player1.isAttacking &&
        player1.framesCurrent === 2
    )
}

export function move(player, keys, name) {
    switch (name) {
        case 'naruto': {
            if (canMove(player, keys.a, 'a')) {
                runLeft(player)
            } else if (canMove(player, keys.d, 'd')) {
                runRight(player)
            } else {
                player.switchSprite('idle');
            }
            jump(player)
        }
        break
        case 'sasuke': {
            if (canMove(player, keys.ArrowLeft, 'ArrowLeft')) {
                runLeft(player)
            } else if (canMove(player, keys.ArrowRight, 'ArrowRight')) {
                runRight(player)
            } else {
                player.switchSprite('idle');
            }
            jump(player)
        }
        break
    }
}

export function canMove(player, key, lastKey) {
    if (key.pressed && player.lastKey === lastKey && !player.dead) {
        return true
    }
}

export function runLeft(player) {
    if (player.isRunningLeft) {
        player.velocity.x = -9;
        player.switchSprite('run');
    } else if (!player.isRunningLeft) {
        player.velocity.x = -4;
        player.switchSprite('walk');
    }
    restrictMoving(player)
}

export function runRight(player) {
    if (player.isRunningRight) {
        player.velocity.x = 9;
        player.switchSprite('run');
    } else if (!player.isRunningRight) {
        player.velocity.x = 4;
        player.switchSprite('walk');
    }
    restrictMoving(player)
}

export function preventPassingThrough(player1, player2) {
    if (isTouchingRight(player1, player2)) {
        if (isGoingUnder(player1, player2) && player1.lastKey === 'd') {
            return
        }
        if (isPlayerLookingRight(player1, player2) && player1.lastKey !== 'a') {
            player1.velocity.x = 0
        } 
    } else if (isTouchingLeft(player1, player2)) {
        if (isGoingUnder(player1, player2) && player1.lastKey === 'a') {
            return
        }
        if (!isPlayerLookingRight(player1, player2) && player1.lastKey !== 'd') {
            player1.velocity.x = 0
        }
    }
    if (isTouchingRight(player2, player1)) {
        if (isGoingUnder(player2, player1) && player2.lastKey === 'ArrowRight') {
            return
        }
        if (isPlayerLookingRight(player2, player1) && player2.lastKey !== 'ArrowLeft') {
            player2.velocity.x = 0
        }
    } else if (isTouchingLeft(player2, player1)) {
        if (isGoingUnder(player2, player1) && player2.lastKey === 'ArrowLeft') {
            return
        }
        if (!isPlayerLookingRight(player2, player1) && player2.lastKey !== 'ArrowRight') {
            player2.velocity.x = 0
        }
    }
}

export function isTouchingRight(player1, player2) {
    return (
        (player1.position.x + player1.width >= player2.position.x) &&
        (player1.position.x + player1.width <= player2.position.x + player2.width) &&
        (player1.position.y + player1.height > player2.position.y)
    )
}

export function isTouchingLeft(player1, player2) {
    return (
        (player1.position.x <= player2.position.x + player2.width) &&
        (player1.position.x > player2.position.x) &&
        (player1.position.y + player1.height > player2.position.y)
    )
}

export function isGoingUnder(player1, player2) {
    if (player1.position.y < player2.position.y + player2.height) {
        return false
    } else {
        return true
    }
}

export function jump(player) {
    if (player.velocity.y < 0) {
        player.velocity.x = player.velocityXFlying;
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.velocity.x = player.velocityXFlying;
        player.switchSprite('fall');
    }
    restrictMoving(player)
}

export function restrictMoving(player) {
    if (player.position.x < 0) {
        player.position.x = 0
    } else if (player.position.x > 1024 - player.width) {
        player.position.x = 1024 - player.width
    }
}

export function playerThrowBack(player1, player2) {
    if (
        player1.image === player1.activeSprites.fallOff.image &&
        player1.framesCurrent < player1.activeSprites.fallOff.framesMax - 1
    ) {
        if (isPlayerLookingRight(player1, player2)) {
            player1.velocityXFlyingLeft += 0.6
            player1.velocity.x = player1.velocityXFlyingLeft
        } else {
            player1.velocityXFlyingRight -= 0.6
            player1.velocity.x = player1.velocityXFlyingRight           
        }
    } else {
        player1.velocityXFlyingLeft = -22
        player1.velocityXFlyingRight = 22
    }
}

export function playerTakesHit(playerBeaten, playerAttacking, id) {
    if (playerAttacking.image === playerAttacking.activeSprites.attack1.image ||
        playerAttacking.image === playerAttacking.activeSprites.attack2.image ||
        playerAttacking.image === playerAttacking.activeSprites.attackFlying.image) {
        playerBeaten.takeHit(1);
    } else if (playerAttacking.image === playerAttacking.activeSprites.attack3.image) {
        playerBeaten.takeHit(2)
    }
    playerAttacking.isAttacking = false;
    renderHealth(id, playerBeaten.health);
}

function renderHealth(id , health) {
    const element = document.getElementById(id)
    element.style.width = `${health}%`
}

export function attackFlying(player) {
    player.isAttacking = true
    player.switchSprite('attackFlying')
}

export function isPlayerLookingRight(player1, player2) {
    if (player1.position.x < player2.position.x) {
        return true
    } else if (player1.position.x >= player2.position.x) {
        return false
    }
}

export function determineWinner(player1, player2, timerId) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player1.health === player2.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player1.health > player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player wins'
    } else if (player1.health < player2.health) {
        document.querySelector('#displayText').innerHTML = 'Enemy wins'
    }
}

export let timer = 60
export let timerId = null

export function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        document.querySelector('#displayText').style.display = 'flex'
        determineWinner({player, enemy, timerId})
    }
}

export function endGame(player1, player2) {
    if (player1.health <= 0 || player2.health <= 0) {
        determineWinner(player1, player2, timerId);
        if (player1.health <= 0) {
            player1.switchSprite('death');
        } else if (player2.health <= 0) {
            player2.switchSprite('death');
        }
    }
}