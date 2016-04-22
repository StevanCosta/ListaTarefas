function getTarefas() {
  this.itens = [
    {nome: 'Item 01', finalizada: false},
    {nome: 'Item 02', finalizada: false},
    {nome: 'Item 03', finalizada: false}
  ];

  this.removerItem = function (item) {
    var pos = this.itens.indexOf(item);
    this.itens.splice(pos, 1);
  }
}
