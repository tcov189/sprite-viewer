export class MushroomObject extends Phaser.Physics.Arcade.Sprite {
  static spriteSheetVersions = ["A", "B", "C", "D"];
  static creatureAssetPath = "assets/creatures";

  constructor(options: { scene: Phaser.Scene; x: number; y: number }) {
    super(options.scene, options.x, options.y, "mushroom_1_color_1", 0);

    options.scene.add.existing(this);
  }

  static loadSpriteSheets(scene: Phaser.Scene) {
    for (let index = 1; index <= this.spriteSheetVersions.length; index++) {
      const sheet = this.spriteSheetVersions[index - 1];

      for (let colorIndex = 1; colorIndex <= 5; colorIndex++) {
        scene.load.spritesheet(
          `mushroom_${index}_color_${colorIndex}`,
          `${MushroomObject.creatureAssetPath}/moody-mushroom/moody mushroom ${sheet} v0${colorIndex}.png`,
          {
            frameWidth: 30,
            frameHeight: 30,
            spacing: 2,
          }
        );
      }
    }
  }

  static initAnimations(scene: Phaser.Scene) {
    for (let index = 1; index <= this.spriteSheetVersions.length; index++) {
      for (let colorIndex = 1; colorIndex <= 5; colorIndex++) {
        const spriteSheet = `mushroom_${index}_color_${colorIndex}`;

        scene.anims.create({
          key: `idle${index}_color_${colorIndex}`,
          frames: scene.anims.generateFrameNumbers(spriteSheet, {
            start: 0,
            end: 3,
          }),
          frameRate: 8,
          repeat: -1,
        });

        scene.anims.create({
          key: `left${index}_color_${colorIndex}`,
          frames: scene.anims.generateFrameNumbers(spriteSheet, {
            start: 19,
            end: 23,
          }),
          frameRate: 10,
          repeat: -1,
        });

        scene.anims.create({
          key: `right${index}_color_${colorIndex}`,
          frames: scene.anims.generateFrameNumbers(spriteSheet, {
            start: 19,
            end: 23,
          }),
          frameRate: 10,
          repeat: -1,
        });

        scene.anims.create({
          key: `jump${index}_color_${colorIndex}`,
          frames: [{ key: spriteSheet, frame: 24 }],
          frameRate: 20,
        });

        scene.anims.create({
          key: `attack${index}_color_${colorIndex}`,
          frames: scene.anims.generateFrameNumbers(spriteSheet, {
            start: 40,
            end: 43,
          }),
          frameRate: 10,
          repeat: -1,
        });
      }
    }
  }

  moveLeft(version: string, color: string) {
    this.setVelocityX(-160);
    this.setFlipX(true);
    this.anims.play(`left${version}_color_${color}`, true);
  }

  moveRight(version: string, color: string) {
    this.setVelocityX(160);
    this.setFlipX(false);
    this.anims.play(`right${version}_color_${color}`, true);
  }

  attack(version: string, color: string) {
    this.anims.play(`attack${version}_color_${color}`, true);
  }

  idle(version: string, color: string) {
    this.setVelocityX(0);
    this.anims.play(`idle${version}_color_${color}`, true);
  }

  jump(version: string, color: string) {
    this.anims.play(`jump${version}_color_${color}`);
  }
}
