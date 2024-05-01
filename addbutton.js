export class AddButton {
  constructor(appInstance) {
    this.height = 190;
    this.width = Math.round(appInstance.stageWidth*0.12);
    this.x = 20;
    this.y = 20;
    this.appInstance = appInstance;
    this.canvas = this.appInstance.canvas;
    this.canvas.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(event) {
    const clickX = event.clientX;
    const clickY = event.clientY;
    if (
      clickX >= this.x &&
      clickX <= this.x + this.width &&
      clickY >= this.y &&
      clickY <= this.y + this.height
    ) {
      this.appInstance.addNewTodo();
    }
  }

  animate(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Darker color for shadow (adjust opacity as needed)
    ctx.rect(this.x + 5, this.y + 5, this.width, this.height); // Offset the shadow
    ctx.fill();
    ctx.closePath();

    ctx.fillText("+", centerX, centerY);
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
    ctx.font = "5em monospace";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var centerX = this.x + this.width / 2;
    var centerY = this.y + this.height / 2;
    ctx.fillText("+", centerX, centerY);
  }
}
