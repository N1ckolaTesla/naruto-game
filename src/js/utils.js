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