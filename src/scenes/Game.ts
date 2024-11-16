import { Scene } from "phaser";
import { ButtonObject } from "../gameObjects/ButtonObject";

export class Game extends Scene {
  background: Phaser.GameObjects.Image;
  activeSprite: "mushroom_1" | "mushroom_2" = "mushroom_1";

  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super("Game");
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.image("background", "assets/bg.png");
    this.load.image("platform", "assets/platform.png");

    this.load.setPath("assets/creatures");

    this.load.spritesheet(
      "mushroom_1",
      "moody-mushroom/moody mushroom B v01.png",
      {
        frameWidth: 30,
        frameHeight: 30,
        spacing: 2,
      }
    );

    this.load.spritesheet(
      "mushroom_2",
      "moody-mushroom/moody mushroom A v01.png",
      {
        frameWidth: 30,
        frameHeight: 30,
        spacing: 2,
      }
    );

    this.data.set({
      sprite: null,
    });
  }

  create() {
    const button = new ButtonObject({
      scene: this,
      x: 10,
      y: 20,
      text: "Version 1",
      callback: () => {
        const sprite = this.data.get("sprite");

        // Not working
        sprite.setTexture("mushroom_2");

        console.log({ sprite });

        this.data.set("sprite", sprite);
      },
    });

    this.add.existing(button);

    const ground = this.physics.add.staticSprite(0, 330, "platform");
    ground.setScale(4).refreshBody();

    const sprite = this.physics.add.sprite(400, 170, this.activeSprite);
    sprite.setCollideWorldBounds(true);
    sprite.setScale(3);

    this.data.set("sprite", sprite);

    this.physics.add.collider(ground, sprite);

    this.initAnimations();
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();

    let sprite = this.data.get("sprite");

    if (cursors.left.isDown) {
      sprite.setVelocityX(-160);
      sprite.setFlipX(true);

      sprite.anims.play("left", true);
    } else if (cursors.right.isDown) {
      sprite.setVelocityX(160);
      sprite.setFlipX(false);

      sprite.anims.play("right", true);
    } else {
      sprite.setVelocityX(0);

      sprite.anims.play("turn");
    }

    if (cursors.up.isDown && sprite.body.touching.down) {
      sprite.setVelocityY(-330);
    }

    if (sprite.body.touching.down === false) {
      sprite.anims.play("up");
    }
  }

  initAnimations() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(this.activeSprite, {
        start: 19,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: this.activeSprite, frame: 0 }],
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(this.activeSprite, {
        start: 19,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: [{ key: this.activeSprite, frame: 24 }],
      frameRate: 20,
    });
  }
}
