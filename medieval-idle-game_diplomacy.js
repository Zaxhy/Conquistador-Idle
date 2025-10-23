window.diplomacy = {
  influence: 0,
  level: 1,
  upgradeCost: 110,
  faction: "Castille"
};

window.diplomacyMenu = function() {
  let out = `<h2>Diplomacy</h2>
    <b>Faction:</b> ${window.diplomacy.faction}<br>
    <b>Influence:</b> ${window.diplomacy.influence}<br>
    <b>Level:</b> ${window.diplomacy.level}<br>
    <button onclick="upgradeDiplomacy()">Upgrade Diplomacy (${window.diplomacy.upgradeCost} Gold)</button>
    <button onclick="sendEnvoy()">Send Envoy (5 Luxury)</button>
    <button onclick="window.updateBuildingDisplay()">Back</button>
  `;
  document.getElementById('controls').innerHTML = out;
};

window.upgradeDiplomacy = function() {
  if (window.resources.gold >= window.diplomacy.upgradeCost) {
    window.resources.gold -= window.diplomacy.upgradeCost;
    window.diplomacy.level += 1;
    window.diplomacy.influence += 10;
    window.diplomacy.upgradeCost = Math.round(window.diplomacy.upgradeCost * 1.55);
    showEvent("Diplomacy upgraded! Influence increased.");
    window.diplomacyMenu();
    updateResourceDisplay();
  } else {
    showEvent("Not enough gold to upgrade diplomacy.");
  }
};

window.sendEnvoy = function() {
  if (window.resources.luxury >= 5) {
    window.resources.luxury -= 5;
    window.diplomacy.influence += 7 + window.diplomacy.level;
    showEvent("Envoy sent! Faction relations improved.");
    window.diplomacyMenu();
    updateResourceDisplay();
  } else {
    showEvent("Not enough luxury goods for an envoy.");
  }
};