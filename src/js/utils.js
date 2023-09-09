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

export function canMove(player, key, lastKey, isDead) {
    if (key.pressed && player.lastKey === lastKey && !isDead) {
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
}

export function runRight(player) {
    if (player.isRunningRight) {
        player.velocity.x = 9;
        player.switchSprite('run');
    } else if (!player.isRunningRight) {
        player.velocity.x = 4;
        player.switchSprite('walk');
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
}

export function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player wins'
    } else if (player.health < enemy.health) {
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