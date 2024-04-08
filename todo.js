export class Todo {
  constructor(title, x, y, toggled, canvas) {
    this.title = title
    this.done = false
    this.x = x
    this.y = y
    this.toggled = false
    this.canvas = canvas
    this.offsetX = 0;
    this.offsetY = 0;
    this.canvas.addEventListener("mousemove", this.updatePosition.bind(this))
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this))
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this))
  }

  mouseUp(event) {
    this.toggled = false
  }

  mouseDown(event) {
    const todoRadius = 50
    const distance = Math.sqrt((event.clientX - this.x) ** 2 + (event.clientY - this.y) ** 2)
    if (distance <= todoRadius) {
      this.toggled = true 
      this.offsetX = event.clientX - this.x
      this.offsetY = event.clientY - this.y
    }
  }

  updatePosition(event) {
    if(this.toggled) {
      const x = event.clientX - this.offsetX
      const y = event.clientY - this.offsetY
      this.x = x
      this.y = y
    }
  }

  animate(ctx) {
    const isToggled = this.toggled
    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}
