import { Scene } from "phaser";
import { ButtonObject } from "../gameObjects/ButtonObject";

export class MushroomScene extends Scene {
  background: Phaser.GameObjects.Image;
  activeSprite: "mushroom_1" | "mushroom_2" = "mushroom_1";

  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  spriteSheetPaths = ["A", "B", "C", "D"];

  constructor() {
    super("MushroomScene");
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.image("background", "assets/bg.png");
    this.load.image("platform", "assets/platform.png");

    this.load.setPath("assets/creatures");

    this.initLoader();

    for (let index = 1; index <= this.spriteSheetPaths.length; index++) {
      const sheet = this.spriteSheetPaths[index - 1];

      for (let colorIndex = 1; colorIndex <= 5; colorIndex++) {
        this.load.spritesheet(
          `mushroom_${index}_color_${colorIndex}`,
          `moody-mushroom/moody mushroom ${sheet} v0${colorIndex}.png`,
          {
            frameWidth: 30,
            frameHeight: 30,
            spacing: 2,
          }
        );
      }
    }
  }

  create() {
    const mushroom = this.physics.add
      .sprite(400, 170, "mushroom_1_color_1")
      .setCollideWorldBounds(true)
      .setScale(3);

    const versionText = this.add.text(600, 20, "Version: 1", {
      fontStyle: "bold",
      fontSize: "1.5rem",
    });

    const colorText = this.add.text(600, 60, "Color: 1", {
      fontStyle: "bold",
      fontSize: "1.5rem",
    });

    this.data.set({
      sprite: mushroom,
      version: "1",
      color: "1",
    });

    for (let versionIndex = 1; versionIndex <= 4; versionIndex++) {
      const button = new ButtonObject({
        scene: this,
        x: 10 + (versionIndex - 1) * 95,
        y: 20,
        text: `Version ${versionIndex}`,
        callback: () => {
          this.data.set("version", versionIndex);
          versionText.setText(`Version: ${versionIndex}`);
        },
      });

      this.add.existing(button);
    }

    for (let colorIndex = 1; colorIndex <= 5; colorIndex++) {
      const button = new ButtonObject({
        scene: this,
        x: 10 + (colorIndex - 1) * 90,
        y: 60,
        text: `Color ${colorIndex}`,
        callback: () => {
          this.data.set("color", colorIndex);
          colorText.setText(`Color: ${colorIndex}`);
        },
      });

      this.add.existing(button);
    }

    const ground = this.physics.add
      .staticSprite(0, 530, "platform")
      .setScale(4)
      .refreshBody();

    this.physics.add
      .staticSprite(0, 515, "platform")
      .setBelow(mushroom)
      .setAlpha(0.7)
      .setScale(4)
      .refreshBody();

    this.physics.add.collider(ground, mushroom);

    this.initAnimations();
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();

    let spaceBar = cursors.space;

    let sprite = this.data.get("sprite");
    let version = this.data.get("version");
    let color = this.data.get("color");

    if (cursors.left.isDown) {
      sprite.setVelocityX(-160);
      sprite.setFlipX(true);

      sprite.anims.play(`left${version}_color_${color}`, true);
    } else if (cursors.right.isDown) {
      sprite.setVelocityX(160);
      sprite.setFlipX(false);

      sprite.anims.play(`right${version}_color_${color}`, true);
    } else if (spaceBar.isDown) {
      sprite.anims.play(`attack${version}_color_${color}`, true);
    } else {
      sprite.setVelocityX(0);

      sprite.anims.play(`idle${version}_color_${color}`, true);
    }

    if (cursors.up.isDown && sprite.body.touching.down) {
      sprite.setVelocityY(-330);
    }

    if (sprite.body.touching.down === false) {
      sprite.anims.play(`jump${version}_color_${color}`);
    }
  }

  initAnimations() {
    for (let index = 1; index <= this.spriteSheetPaths.length; index++) {
      for (let colorIndex = 1; colorIndex <= 5; colorIndex++) {
        const spriteSheet = `mushroom_${index}_color_${colorIndex}`;
        this.anims.create({
          key: `idle${index}_color_${colorIndex}`,
          frames: this.anims.generateFrameNumbers(spriteSheet, {
            start: 0,
            end: 3,
          }),
          frameRate: 8,
          repeat: -1,
        });

        this.anims.create({
          key: `left${index}_color_${colorIndex}`,
          frames: this.anims.generateFrameNumbers(spriteSheet, {
            start: 19,
            end: 23,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: `right${index}_color_${colorIndex}`,
          frames: this.anims.generateFrameNumbers(spriteSheet, {
            start: 19,
            end: 23,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: `jump${index}_color_${colorIndex}`,
          frames: [{ key: spriteSheet, frame: 24 }],
          frameRate: 20,
        });

        this.anims.create({
          key: `attack${index}_color_${colorIndex}`,
          frames: this.anims.generateFrameNumbers(spriteSheet, {
            start: 40,
            end: 43,
          }),
          frameRate: 10,
          repeat: -1,
        });
      }
    }
  }

  initLoader() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        color: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        color: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        color: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }
}
