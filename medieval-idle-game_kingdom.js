window.kingdom = {
  prestige: 1,
  level: 1,
  upgradeCost: 300
};

window.kingdomMenu = function() {
  let out = `<h2>Kingdom</h2>
    <b>Prestige:</b> ${window.kingdom.prestige}<br>
    <b>Kingdom Level:</b> ${window.kingdom.level}<br>
    <button onclick="upgradeKingdom()">Upgrade Kingdom (${window.kingdom.upgradeCost} Gold)</button>
    <button onclick="window.updateBuildingDisplay()">Back</button>
  `;
  document.getElementById('controls').innerHTML = out;
};

window.upgradeKingdom = function() {
  if (window.resources.gold >= window.kingdom.upgradeCost) {
    window.resources.gold -= window.kingdom.upgradeCost;
    window.kingdom.level += 1;
    window.kingdom.prestige += 2;
    window.kingdom.upgradeCost = Math.round(window.kingdom.upgradeCost * 1.7);
    showEvent("Kingdom upgraded! Prestige increased.");
    window.kingdomMenu();
    updateResourceDisplay();
    // Boost all production buildings
    Object.keys(window.buildings).forEach(k => {
      if (window.buildings[k].level > 0)
        window.buildings[k].baseProduction = Math.round(window.buildings[k].baseProduction * 1.15 * 100) / 100;
    });
    updateBuildingDisplay();
  } else {
    showEvent("Not enough gold to upgrade kingdom.");
  }
};