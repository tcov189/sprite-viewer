import { Scene } from "phaser";
import { MushroomObject } from "../gameObjects/MushroomObject";
import { GremlinObject } from "../gameObjects/GremlinObject";

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

    this.load.spritesheet(
      "gremlin",
      "greedy-gremlin/greedy gremlin (base) v01.png",
      {
        frameWidth: 50,
        frameHeight: 50,
        spacing: 14,
      }
    );
  }

  create() {
    const mushroomSprite = new MushroomObject({ scene: this, x: 70, y: 120 });

    mushroomSprite
      .setScale(2)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("MushroomScene");
      });

    this.data.set("mushroom", mushroomSprite);

    const gremlinSprite = new GremlinObject({ scene: this, x: 140, y: 120 })
      .setScale(1.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("GremlinScene");
      });

    this.data.set("gremlin", gremlinSprite);

    this.add.text(300, 20, "Monster Viewer", {
      fontFamily: "Arial",
      fontSize: "2rem",
    });

    this.add.text(325, 60, "Click a Monster to View", {
      fontFamily: "Arial",
      //   fontSize: "2rem",
    });

    this.initAnimations();
  }

  update(): void {
    const mushroom = this.data.get("mushroom");
    const gremlin = this.data.get("gremlin");

    mushroom.anims.play("idle", true);
    gremlin.anims.play("idleGremlin", true);
  }

  initAnimations() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("mushroom", {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "idleGremlin",
      frames: this.anims.generateFrameNumbers("gremlin", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
