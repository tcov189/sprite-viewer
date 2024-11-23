export class GremlinObject extends Phaser.Physics.Arcade.Sprite {
  static spriteSheetVersions = ["base", "horns_and_tail", "horns", "tail"];
  static creatureAssetPath = "assets/creatures";

  constructor(options: { scene: Phaser.Scene; x: number; y: number }) {
    super(options.scene, options.x, options.y, "gremlin_base_color_1", 0);

    options.scene.add.existing(this);
  }

  static loadSpriteSheets(scene: Phaser.Scene) {
    for (let index = 1; index <= this.spriteSheetVersions.length; index++) {
      const sheet = this.spriteSheetVersions[index - 1];

      for (let colorIndex = 1; colorIndex <= 7; colorIndex++) {
        scene.load.spritesheet(
          `gremlin_${index}_color_${colorIndex}`,
          `${
            GremlinObject.creatureAssetPath
          }/greedy-gremlin/greedy gremlin (${sheet.replaceAll(
            "_",
            " "
          )}) v0${colorIndex}.png`,
          {
            frameWidth: 50,
            frameHeight: 50,
            margin: 14,
            spacing: 14,
          }
        );
      }
    }
  }

  static initAnimations(scene: Phaser.Scene) {
    for (let index = 1; index <= this.spriteSheetVersions.length; index++) {
      for (let colorIndex = 1; colorIndex <= 7; colorIndex++) {
        const spriteSheet = `gremlin_${index}_color_${colorIndex}`;

        scene.anims.create({
          key: `gremlin_idle${index}_color_${colorIndex}`,
          frames: scene.anims.generateFrameNumbers(spriteSheet, {
            start: 0,
            end: 3,
          }),
          frameRate: 8,
          repeat: -1,
        });

        scene.anims.create({
          key: `gremlin_left${index}_color_${colorIndex}`,
          frames: scene.anims.generateFrameNumbers(spriteSheet, {
            start: 19,
            end: 23,
          }),
          frameRate: 10,
          repeat: -1,
        });

        scene.anims.create({
          key: `gremlin_right${index}_color_${colorIndex}`,
          frames: scene.anims.generateFrameNumbers(spriteSheet, {
            start: 19,
            end: 23,
          }),
          frameRate: 10,
          repeat: -1,
        });

        scene.anims.create({
          key: `gremlin_jump${index}_color_${colorIndex}`,
          frames: [{ key: spriteSheet, frame: 24 }],
          frameRate: 20,
        });

        scene.anims.create({
          key: `gremlin_attack${index}_color_${colorIndex}`,
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

  static initIdleAnimation(scene: Phaser.Scene) {}

  moveLeft(version: string, color: string) {
    this.setVelocityX(-160);
    this.setFlipX(true);
    this.anims.play(`gremlin_left${version}_color_${color}`, true);
  }

  moveRight(version: string, color: string) {
    this.setVelocityX(160);
    this.setFlipX(false);
    this.anims.play(`gremlin_right${version}_color_${color}`, true);
  }

  attack(version: string, color: string) {
    this.anims.play(`gremlin_attack${version}_color_${color}`, true);
  }

  idle(version: string, color: string) {
    this.setVelocityX(0);
    this.anims.play(`gremlin_idle${version}_color_${color}`, true);
  }

  jump(version: string, color: string) {
    this.anims.play(`gremlin_jump${version}_color_${color}`);
  }
}
