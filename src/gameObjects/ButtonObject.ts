export class ButtonObject extends Phaser.GameObjects.Text {
  constructor(options: {
    scene: Phaser.Scene;
    x: number;
    y: number;
    text: string;
    style?: Phaser.Types.GameObjects.Text.TextStyle;
    callback?: any;
  }) {
    super(options.scene, options.x, options.y, options.text, {
      padding: { x: 8, y: 4 },
      ...options.style,
      fontFamily: "Verdana",
      backgroundColor: "#f2f2f2",
      color: "black",
    });

    this.setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.enterButtonHoverState())
      .on("pointerout", () => this.enterButtonRestState())
      .on("pointerdown", () => this.enterButtonActiveState())
      .on("pointerup", () => {
        this.enterButtonHoverState();
        if (options.callback) {
          options.callback();
        }
      });
  }

  enterButtonHoverState() {
    this.setStyle({ fill: "gray" });
  }

  enterButtonRestState() {
    this.setStyle({ fill: "black" });
  }

  enterButtonActiveState() {
    this.setStyle({ fill: "black" });
  }
}
