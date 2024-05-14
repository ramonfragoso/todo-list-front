export class Todo {
  constructor(id, title, x, y, toggled, canvas, appInstance) {
    this.title = title;
    this.id = id;
    this.done = false;
    this.x = x;
    this.y = y;
    this.toggled = false;
    this.canvas = canvas;
    this.offsetX = 0;
    this.offsetY = 0;
    this.height = 100;
    this.width = 250;
    this.appInstance = appInstance;
    this.deleteButton = appInstance.deleteButton;
    this.toggledTodoId = undefined;
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
      event.clientY <= this.y + this.height &&
      this.toggledTodoId === this.id
    ) {
      this.x += 5;
      this.y += 5;
    }
    if (
      event.clientX >= this.deleteButton.x &&
      event.clientX <= this.deleteButton.x + this.deleteButton.width &&
      event.clientY >= this.deleteButton.y &&
      event.clientY <= this.deleteButton.y + this.deleteButton.height &&
      this.toggledTodoId === this.id
    ) {
      this.appInstance.deleteTodo(this.id)
    }
  }

  mouseDown(event) {
    for (let i = this.appInstance.todos.length - 1; i >= 0; i--) {
      const todo = this.appInstance.todos[i];
      if (
        event.clientX >= todo.x &&
        event.clientX <= todo.x + todo.width &&
        event.clientY >= todo.y &&
        event.clientY <= todo.y + todo.height
      ) {
        todo.toggled = true;
        todo.x -= 5;
        todo.y -= 5;
        todo.offsetX = event.clientX - todo.x;
        todo.offsetY = event.clientY - todo.y;
        this.toggledTodoId = todo.id;
        break;
      }
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

  splitTextIntoLines(ctx, text, maxWidth) {
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i] + " ";
      const { width } = ctx.measureText(testLine);

      if (width > maxWidth) {
        lines.push(currentLine.trim());
        currentLine = words[i] + " ";
      } else {
        currentLine = testLine;
      }
    }

    lines.push(currentLine.trim());
    return lines;
  }

  animate(ctx) {
    const isToggled = this.toggled;
    if (this.toggled) {
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

    ctx.fillStyle = "black";
    ctx.font = "1.1em monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    var centerX = this.x + 10;
    var centerY = this.y + this.height / 2;
    const lines = this.splitTextIntoLines(ctx, this.title, this.width - 20); // Adjusting for padding
    const lineHeight = 19; // Adjust as needed
    this.height = lines.length * lineHeight + 20; // Update todo height based on the number of lines and line height

    for (let i = 0; i < lines.length; i++) {
      const lineY =
        centerY - ((lines.length - 1) / 2) * lineHeight + i * lineHeight;
      ctx.fillText(lines[i], centerX, lineY);
    }
  }
}
