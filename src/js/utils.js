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

function canMove(player, key, lastKey) {
    if (key.pressed && player.lastKey === lastKey && !player.dead) {
        return true
    }
}

function runLeft(player) {
    if (player.isRunningLeft) {
        player.velocity.x = -9;
        player.switchSprite('run');
    } else if (!player.isRunningLeft) {
        player.velocity.x = -4;
        player.switchSprite('walk');
    }
    restrictMoving(player)
}

function runRight(player) {
    if (player.isRunningRight) {
        player.velocity.x = 9;
        player.switchSprite('run');
    } else if (!player.isRunningRight) {
        player.velocity.x = 4;
        player.switchSprite('walk');
    }
    restrictMoving(player)
}

export function checkY(player1, player2) {
    if (
        (player1.position.y + player1.height < player2.position.y) ||
        (player1.position.y > player2.position.y + player2.height)
    ) {
        return true
    } else {
        return false
    }
}

export function checkXRight(player1, player2) {
    if (
        (player1.position.x + player1.width >= player2.position.x) &&
        (player1.position.x + player1.width < player2.position.x + player2.width)
    ) {
        return true
    } else {
        return false
    }
}

export function checkXLeft(player1, player2) {
    if (
        (player1.position.x <= player2.position.x + player2.width) &&
        (player1.position.x > player2.position.x)
    ) {
        return true
    } else {
        return false
    }
}

function jump(player) {
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

export function renderHealth(id, health) {
    const element = document.getElementById(id)
    element.style.width = `${health}%`
}

export function attackFlying(player) {
    player.isAttacking = true
    player.switchSprite('attackFlying')
}

function determineWinner(player1, player2, timerId) {
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

let timer = 60
let timerId = null

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