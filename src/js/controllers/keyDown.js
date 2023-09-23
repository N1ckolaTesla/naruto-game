export const keyDownListener =  ({keys, player, enemy}) => (e) => {
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
                if (player.velocity.y === 0) {
                    player.velocity.y = -20
                    player.velocityXFlying = player.velocity.x
                }
                break
            case ' ': 
                player.attackCountAvailable++
                player.attack()
                break
            case 'e': 
                keys.e.pressed = true
                player.lastKey = 'e'
                player.block()
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
                if (enemy.velocity.y === 0) {
                    enemy.velocity.y = -20
                    enemy.velocityXFlying = enemy.velocity.x
                }
                break
            case 'ArrowDown':
                enemy.attackCountAvailable++
                enemy.attack()
                break
            case 'l': 
                keys.l.pressed = true
                enemy.lastKey = 'l'
                enemy.block()
                break
        }
    }
}