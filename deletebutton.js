export class DeleteButton {
  constructor(appInstance) {
    this.width = Math.round(appInstance.stageWidth*0.12);
    this.height = 150;
    this.x = 20;
    this.y = document.body.clientHeight - 190;
    this.appInstance = appInstance;
    this.canvas = this.appInstance.canvas;
  }

  animate(ctx) {

    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Darker color for shadow (adjust opacity as needed)
    ctx.rect(this.x+5, this.y+5, this.width, this.height);
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.font = "1.3em monospace";
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var centerX = this.x + this.width / 2;
    var centerY = this.y + this.height / 2;
    ctx.fillText("Drop here to delete", centerX, centerY);
  }
}