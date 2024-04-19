export class Todo {
  constructor(title, x, y, toggled, canvas) {
    this.title = title;
    this.done = false;
    this.x = x;
    this.y = y;
    this.toggled = false;
    this.canvas = canvas;
    this.offsetX = 0;
    this.offsetY = 0;
    this.height = 100;
    this.width = 250;
    this.canvas.addEventListener("mousemove", this.updatePosition.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
  }

  mouseUp(event) {
    this.toggled = false;
    if (
      event.clientX >= this.x &&
      event.clientX <= this.x + this.width &&
      event.clientY >= this.y &&
      event.clientY <= this.y + this.height
    ) {
      this.x += 5;
      this.y += 5;
    }
  }

  mouseDown(event) {
    if (
      event.clientX >= this.x &&
      event.clientX <= this.x + this.width &&
      event.clientY >= this.y &&
      event.clientY <= this.y + this.height
    ) {
      this.toggled = true;
      this.x -= 5;
      this.y -= 5;
      this.offsetX = event.clientX - this.x;
      this.offsetY = event.clientY - this.y;
    }
  }

  updatePosition(event) {
    if (this.toggled) {
      const x = event.clientX - this.offsetX;
      const y = event.clientY - this.offsetY;
      this.x = x;
      this.y = y;
    }
  }

  animate(ctx) {
    const isToggled = this.toggled;
    if(this.toggled){
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Darker color for shadow (adjust opacity as needed)
      ctx.roundRect(this.x + 10, this.y + 10, this.width, this.height, 5); // Offset the shadow
      ctx.fill();
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Darker color for shadow (adjust opacity as needed)
      ctx.roundRect(this.x + 5, this.y + 5, this.width, this.height, 5); // Offset the shadow
      ctx.fill();
      ctx.closePath();
    }

    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, 5);
    ctx.fillStyle = "#f2eecb";
    ctx.fill();
    ctx.closePath();
  }
}
