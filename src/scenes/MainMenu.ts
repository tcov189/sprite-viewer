import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  preload() {
    this.load.setPath("assets/creatures");

    this.load.spritesheet(
      "mushroom",
      "moody-mushroom/moody mushroom A v01.png",
      {
        frameWidth: 30,
        frameHeight: 30,
        spacing: 2,
      }
    );

    const mushroom = this.make
      .sprite({
        x: 70,
        y: 120,
        scale: 2,
        add: false,
      })
      .setTexture("mushroom_1")
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("MushroomScene");
      });

    this.data.set("mushroom", mushroom);
  }

  create() {
    this.add.text(300, 20, "Monster Viewer", {
      fontFamily: "Arial",
      fontSize: "2rem",
    });

    this.add.text(325, 60, "Click a Monster to View", {
      fontFamily: "Arial",
      //   fontSize: "2rem",
    });

    const mushroom = this.data.get("mushroom");

    this.add.existing(mushroom);

    this.initAnimations();
  }

  update(): void {
    const mushroom = this.data.get("mushroom");

    mushroom.anims.play("idle", true);
  }

  initAnimations() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("mushroom", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
