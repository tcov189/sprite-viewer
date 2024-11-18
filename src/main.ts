import { Game, Types } from "phaser";
import { MushroomScene } from "./scenes/MushroomScene";
import { MainMenu } from "./scenes/MainMenu";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: "game-container",
  backgroundColor: "#028af8",
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300, x: 0 },
      // debug: true,
    },
  },
  scene: [MainMenu, MushroomScene],
};

export default new Game(config);
