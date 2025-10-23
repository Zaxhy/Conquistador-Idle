window.trading = {
  merchants: 1,
  level: 1,
  upgradeCost: 130,
  tradeBonus: 0
};

window.tradingMenu = function() {
  let out = `<h2>Trading</h2>
    <b>Merchants:</b> ${window.trading.merchants}<br>
    <b>Level:</b> ${window.trading.level}<br>
    <button onclick="upgradeTrading()">Upgrade Market (${window.trading.upgradeCost} Gold)</button>
    <button onclick="tradeGoods()">Trade Goods</button>
    <button onclick="window.updateBuildingDisplay()">Back</button>
  `;
  document.getElementById('controls').innerHTML = out;
};

window.upgradeTrading = function() {
  if (window.resources.gold >= window.trading.upgradeCost) {
    window.resources.gold -= window.trading.upgradeCost;
    window.trading.level += 1;
    window.trading.merchants += 1;
    window.trading.tradeBonus += 5;
    window.trading.upgradeCost = Math.round(window.trading.upgradeCost * 1.5);
    showEvent("Market upgraded! More merchants available.");
    window.tradingMenu();
    updateResourceDisplay();
  } else {
    showEvent("Not enough gold to upgrade trading.");
  }
};

window.tradeGoods = function() {
  if (window.resources.wood >= 10 && window.resources.food >= 15) {
    window.resources.wood -= 10;
    window.resources.food -= 15;
    let profit = 40 + window.trading.tradeBonus;
    window.resources.gold += profit;
    showEvent(`Traded goods for ${profit} gold!`);
    window.tradingMenu();
    updateResourceDisplay();
  } else {
    showEvent("Not enough goods to trade.");
  }
};