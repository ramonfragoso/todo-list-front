import { AddButton } from "./addbutton";
import { DeleteButton } from "./deletebutton";
import { Todo } from "./todo";
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    this.todos = [];
    this.total = 2;
    this.addButton = new AddButton(this);
    this.deleteButton = new DeleteButton(this);
    for (let i = 0; i < this.total; i++) {
      const stageWidth = document.body.clientWidth;
      const stageHeight = document.body.clientHeight;
      const randomX = Math.random() * stageWidth;
      const randomY = Math.random() * stageHeight;
      this.todos[i] = new Todo("Todo", randomX, randomY, false, this.canvas);
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }

  addNewTodo() {
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;
    const randomX = Math.random() * stageWidth;
    const randomY = Math.random() * stageHeight;
    const newTodo = new Todo("Todo", randomX, randomY, true, this.canvas);
    this.todos.push(newTodo);
  }

  deleteTodo() {
    const todos = this.todos
    this.todos = todos.filter((todo) => !todo.toggled) 
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    console.log(this.stageHeight);
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.addButton.animate(this.ctx);
    this.deleteButton.animate(this.ctx);
    for (let i = 0; i < this.todos.length; i++) {
      this.todos[i].animate(this.ctx);
    }
  }
}

window.onload = () => {
  const app = new App();
  app.animate();
};
