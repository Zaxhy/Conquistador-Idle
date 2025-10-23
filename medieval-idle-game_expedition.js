window.expedition = {
  ships: 1,
  level: 1,
  upgradeCost: 250,
  discoveries: 0
};

window.expeditionMenu = function() {
  let out = `<h2>Expedition</h2>
    <b>Ships:</b> ${window.expedition.ships}<br>
    <b>Expedition Level:</b> ${window.expedition.level}<br>
    <b>Discoveries:</b> ${window.expedition.discoveries}<br>
    <button onclick="upgradeExpedition()">Upgrade Fleet (${window.expedition.upgradeCost} Gold)</button>
    <button onclick="sailExpedition()">Send Expedition</button>
    <button onclick="window.updateBuildingDisplay()">Back</button>
  `;
  document.getElementById('controls').innerHTML = out;
};

window.upgradeExpedition = function() {
  if (window.resources.gold >= window.expedition.upgradeCost) {
    window.resources.gold -= window.expedition.upgradeCost;
    window.expedition.level += 1;
    window.expedition.ships += 1;
    window.expedition.upgradeCost = Math.round(window.expedition.upgradeCost * 1.6);
    showEvent("Fleet upgraded! More ships ready for exploration.");
    window.expeditionMenu();
    updateResourceDisplay();
  } else {
    showEvent("Not enough gold to upgrade fleet.");
  }
};

window.sailExpedition = function() {
  if (window.resources.food >= 25 && window.resources.wood >= 15) {
    window.resources.food -= 25;
    window.resources.wood -= 15;
    let discovery = Math.random() < (0.5 + window.expedition.level*0.07);
    if (discovery) {
      window.expedition.discoveries += 1;
      window.resources.luxury += 4 + window.expedition.level;
      showEvent("Expedition successful! Exotic goods brought home.");
      updateResourceDisplay();
    } else {
      showEvent("Expedition failed to discover new lands.");
    }
    window.expeditionMenu();
  } else {
    showEvent("Not enough supplies to send an expedition.");
  }
};