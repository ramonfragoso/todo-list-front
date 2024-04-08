export class AddButton {
  constructor(appInstance) {
    this.width = 190
    this.height = 150
    this.x = 20
    this.y = 20
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
      console.log("Clicked on AddButton");
      this.appInstance.addNewTodo()
    }
  }

  animate(ctx) { 
    ctx.beginPath()
    ctx.roundRect(this.x, this.y, this.width, this.height, 12)
    ctx.stroke();
    ctx.closePath();
    ctx.font="20px monospace";
    ctx.fillStyle = "#000000";
    var rectHeight = 150;
    var rectWidth = 150;
    var rectX = 20;
    var rectY = 20;
    ctx.fillText("Add new todo",rectX+(rectWidth/2)-50,rectY+(rectHeight/2)); 
  }
}