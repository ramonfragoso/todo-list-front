export class TodoInput {
  constructor(open, appInstance) {
    this.open = open;
    this.appInstance = appInstance;
    const inputContainer = document.createElement("div");
    inputContainer.style.background = "rgba(0, 0, 0, 0.5)";
    inputContainer.style.position = "absolute";
    inputContainer.style.width = "100%";
    inputContainer.style.height = "100%";
    inputContainer.style.zIndex = "20";
    inputContainer.style.display = "flex";
    inputContainer.style.justifyContent = "center";
    inputContainer.style.alignItems = "center";

    const modal = document.createElement("form");
    modal.style.padding = "30px";
    modal.style.borderRadius = "8px";
    modal.style.background = "white";
    modal.style.display = "flex";
    modal.style.flexDirection = "column";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.gap = "10px";

    const title = document.createElement("h1");
    title.innerText = "What's your next to do?";
    title.style.fontFamily = "monospace";
    modal.appendChild(title);

    const inputElement = document.createElement("textarea");
    inputElement.style.padding = "10px";
    inputElement.style.width = "100%";
    inputElement.style.height = "100px";
    inputElement.style.margin = "10px 5px";
    inputElement.style.borderRadius = "8px";
    inputElement.id = "inputContainer";
    modal.appendChild(inputElement);

    const buttonElement = document.createElement("button");
    buttonElement.style.fontSize = "1em";
    buttonElement.style.padding = "10px 30px";
    buttonElement.style.border = "none";
    buttonElement.style.background = "#96DED1";
    buttonElement.style.color = "#4f4f4f";
    buttonElement.style.outline = "none";
    buttonElement.style.borderRadius = "8px";
    buttonElement.innerText = "Save";
    buttonElement.type = "submit";
    buttonElement.style.fontFamily = "monospace";
    buttonElement.style.fontWeight = "bold";
    buttonElement.style.fontSize = "16px";
    modal.appendChild(buttonElement);

    inputContainer.appendChild(modal);
    inputContainer.style.display = !!open ? "flex" : "none";
    inputContainer.addEventListener("click", (e) =>
      this.handleClickOutside(e.target.contains(inputContainer))
    );

    this.inputContainer = inputContainer;
    this.modal = modal;

    document.body.appendChild(inputContainer);
    modal.addEventListener("submit", this.onSave.bind(this));
  }

  toggle() {
    this.open = !this.open;
    this.inputContainer.style.display = !!this.open ? "flex" : "none";
  }

  handleClickOutside(e) {
    if (e) {
      this.toggle();
    }
  }
  onSave(e) {
    e.preventDefault();
    this.toggle();
    const data = new FormData(this.modal);
    const input = document.getElementById("inputContainer")
    this.appInstance.handleSave(input.value);
    input.value = ""
  }
}
