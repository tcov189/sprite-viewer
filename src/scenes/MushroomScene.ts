import { Scene } from "phaser";
import { ButtonObject } from "../gameObjects/ButtonObject";
import { MushroomObject } from "../gameObjects/MushroomObject";

export class MushroomScene extends Scene {
  constructor() {
    super("MushroomScene");
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.image("background", "assets/bg.png");
    this.load.image("platform", "assets/platform.png");

    this.initLoader();

    MushroomObject.loadSpriteSheets(this);
  }

  create() {
    const mushroomSprite = new MushroomObject({ scene: this, x: 400, y: 170 });

    this.physics.add.existing(mushroomSprite);

    mushroomSprite.setCollideWorldBounds(true).setScale(3);

    const versionText = this.add.text(600, 20, "Version: 1", {
      fontStyle: "bold",
      fontSize: "1.5rem",
    });

    const colorText = this.add.text(600, 60, "Color: 1", {
      fontStyle: "bold",
      fontSize: "1.5rem",
    });

    this.data.set({
      sprite: mushroomSprite,
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
      .setBelow(mushroomSprite)
      .setAlpha(0.7)
      .setScale(4)
      .refreshBody();

    this.physics.add.collider(ground, mushroomSprite);

    MushroomObject.initAnimations(this);
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();

    let spaceBar = cursors.space;

    let sprite: MushroomObject = this.data.get("sprite");
    let version = this.data.get("version");
    let color = this.data.get("color");

    if (cursors.left.isDown) {
      sprite.moveLeft(version, color);
    } else if (cursors.right.isDown) {
      sprite.moveRight(version, color);
    } else if (spaceBar.isDown) {
      sprite.attack(version, color);
    } else {
      sprite.idle(version, color);
    }

    if (cursors.up.isDown && sprite.body!.touching.down) {
      sprite.setVelocityY(-330);
    }

    if (sprite.body!.touching.down === false) {
      sprite.jump(version, color);
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
