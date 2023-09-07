import { Sprite } from "../sprite";

const sprites = [
    {
        name: 'background1',
        position: {
            x: 0,
            y: 0
        },
        imageSrc: '../assets/imgs/background/background_layer_1.png',
        scale: 3.2
    },
    {
        name: 'background2',
        position: {
            x: 0,
            y: 0
        },
        imageSrc: '../assets/imgs/background/background_layer_2.png',
        scale: 3.2
    },
    {
        name: 'background3',
        position: {
            x: 0,
            y: 0
        },
        imageSrc: '../assets/imgs/background/background_layer_3.png',
        scale: 3.2
    },
    {
        name: 'shop',
        position: {
            x: 600,
            y: 128
        },
        imageSrc: '../assets/imgs/decorations/shop_anim.png',
        scale: 2.75,
        framesMax: 6
    },
    {
        name: 'ground',
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
    },
    {
        name: 'fence1',
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
    },
    {
        name: 'fence2',
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
    },
    {
        name: 'lamp',
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
    },
    {
        name: 'rock1',
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
    },
    {
        name: 'rock2',
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
    },
    {
        name: 'rock3',
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
    },
    {
        name: 'sign',
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
    },
    {
        name: 'grass1_1',
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
    },
    {
        name: 'grass1_2',
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
    },
    {
        name: 'grass2_1',
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
    },
    {
        name: 'grass2_2',
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
    },
    {
        name: 'grass3_1',
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
    },
    {
        name: 'grass3_2',
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
    }
];


export const gameObjects = sprites.map(sprite => new Sprite(sprite))