function StuffToBuy(name, cost, weight, quantity) {
  this.name = name
  this.cost = cost
  this.weight = weight
  this.quantity = quantity
}

function Inventory() {
  this.inventory = []
}

Inventory.prototype.addItem = function(item) {
  for (var i = 0; i < this.inventory.length; i++) {
    if (this.inventory[i].name === item.name) {
      this.inventory[i].quantity+=item.quantity
      return;
    }
  }
  this.inventory.push(item)
}

Inventory.prototype.removeItem = function(name, quantity){
  for (var i = 0; i < this.inventory.length; i++) {
    if(this.inventory[i].name === name){
      if (!quantity) {
        this.inventory[i].quantity = 0;
      } else {
        this.inventory[i].quantity -= quantity
      }
    if(this.inventory[i].quantity<=0){
      delete this.inventory[i];
    }
      return
    }
  }
}

Inventory.prototype.addInitialItems = function () {
  this.addItem(new StuffToBuy("Food", 100, 10, 30));
  this.addItem(new StuffToBuy("Water", 4, 8, 30));
  this.addItem(new StuffToBuy("Gas", 20, 8, 20));
  this.addItem(new StuffToBuy("Substances", 1000, 0, 4));
  this.addItem(new StuffToBuy("Breathing Masks", 250, 2, 5));
  this.addItem(new StuffToBuy("Tire Repire Kits", 300, 20, 7));
}




//UI Stuff
function updateInventoryTable(stuff, table) {
  var items = "<tr><th>Item</th><th>Cost</th><th>Weight</th><th>Quanity</th></tr>"
  for (var i = 0; i < stuff.inventory.length; i++) {
    var inv = stuff.inventory[i]
    items += "<tr><th>" + inv.name +
             "</th><th>" + inv.cost +
             "</th><th>" + inv.weight +
             "</th><th>" + inv.quantity + "</th>"
  }

  $(table).empty();
  $(table).html(items);

}

var firstShop = new Inventory();
var carInventory = new Inventory();
//Shorthand for $(document).ready()
$(function () {
  firstShop.addInitialItems();
  updateInventoryTable(firstShop, '#market-inventory');
  updateInventoryTable(carInventory, '#car-inventory');

})
