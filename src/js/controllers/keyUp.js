export const keyUpListener = ({keys, player, enemy}) => (e) => {
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
}