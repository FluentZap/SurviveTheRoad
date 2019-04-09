var CarMoney;

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
  var inventoryItem = this.getItem(item.name);
  console.log(inventoryItem);
  if (inventoryItem) {
    inventoryItem.quantity += item.quantity
    return;
  }
  this.inventory.push(item)
}

Inventory.prototype.removeItem = function(name, quantity){
  var inventoryItem = this.getItem(name);
  if (inventoryItem) {
    if (!quantity) inventoryItem.quantity = 0;
    else inventoryItem.quantity -= quantity
    if(inventoryItem.quantity <= 0) delete this.inventory[i];
    return
  }
}

Inventory.prototype.buyItem = function(name, sentTo) {
  var inventoryItem = this.getItem(name);
  if (inventoryItem.cost <= CarMoney) {
    CarMoney -= inventoryItem.cost;
    var newItem = new StuffToBuy(
      inventoryItem.name,
      inventoryItem.cost,
      inventoryItem.weight, 1)
    sentTo.addItem(newItem)
    this.removeItem(inventoryItem.name, 1);
  }
}

Inventory.prototype.getItem = function(name){
  for (var i = 0; i < this.inventory.length; i++) {
    if(this.inventory[i].name === name) return this.inventory[i];
  }
  return false;
}


Inventory.prototype.addInitialItems = function () {
  this.addItem(new StuffToBuy("Food", 100, 10, 30));
  this.addItem(new StuffToBuy("Water", 4, 8, 30));
  this.addItem(new StuffToBuy("Gas", 20, 8, 20));
  this.addItem(new StuffToBuy("Substances", 1000, 0, 4));
  this.addItem(new StuffToBuy("Breathing Masks", 250, 2, 5));
  this.addItem(new StuffToBuy("Tire Repire Kits", 300, 20, 7));
}

function addEventHandlers() {
  //buy item
  $("#market-inventory").on("click", "tr", function() {
    var itemId = this.id.replace("item-", "")
    firstShop.buyItem(itemId, carInventory);
    updateInventoryTable(firstShop, '#market-inventory');
    updateInventoryTable(carInventory, '#car-inventory');
    updateMoney();
  });
}

function updateMoney() {
  $('#current-money').text("$" + CarMoney + " current funds");
}

//UI Stuff
function updateInventoryTable(stuff, table) {
  var items = "<tr><th>Item</th><th>Cost</th><th>Weight</th><th>Quanity</th></tr>"
  for (var i = 0; i < stuff.inventory.length; i++) {
    var inv = stuff.inventory[i]
    items += "<tr id='item-" + inv.name + "'><th>" + inv.name +
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
  CarMoney = 2000;
  addEventHandlers();
  updateMoney();
  firstShop.addInitialItems();
  updateInventoryTable(firstShop, '#market-inventory');
  updateInventoryTable(carInventory, '#car-inventory');

})
