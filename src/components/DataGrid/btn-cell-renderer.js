function BtnCellRenderer() {}

BtnCellRenderer.prototype.init = function(params) {
  this.params = params;

  this.eGui = document.createElement("button");
  this.eGui.innerHTML = "Click me!";

  this.btnClickedHandler = this.btnClickedHandler.bind(this);
  this.eGui.addEventListener("click", this.btnClickedHandler);
};

BtnCellRenderer.prototype.getGui = function() {
  return this.eGui;
};

BtnCellRenderer.prototype.destroy = function() {
  this.eGui.removeEventListener("click", this.btnClickedHandler);
};

BtnCellRenderer.prototype.btnClickedHandler = function(event) {
  this.params.clicked(this.params.value);
};

export default BtnCellRenderer;