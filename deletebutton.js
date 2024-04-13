export class DeleteButton {
  constructor(appInstance) {
    this.width = 230
    this.height = 150
    this.x = 20 
    this.y = document.body.clientHeight - 190 - 20
    this.appInstance = appInstance
    this.canvas = this.appInstance.canvas
    this.canvas.addEventListener('click', this.handleClick.bind(this))
  }

  handleClick(event) {
    const clickX = event.clientX;
    const clickY = event.clientY;
    if (
      clickX >= this.x && clickX <= this.x + this.width &&
      clickY >= this.y && clickY <= this.y + this.height
    ) {
      console.log("Clicked on deleteButton");
      this.appInstance.deleteTodo()
    }
  }

  animate(ctx) { 
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, 12)
    ctx.font="20px monospace";
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.fillStyle = "black";
    var rectHeight = this.height;
    var rectWidth = this.width;
    var rectX = this.x;
    var rectY = this.y;
    ctx.fillText("TRASH",rectX+(rectWidth/2)-30,rectY+(rectHeight/2)+5); 
    ctx.closePath();
  }
}