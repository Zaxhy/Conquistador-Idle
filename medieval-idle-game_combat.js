// Army & Combat mechanics with upgrades

window.army = {
  soldiers: 10,
  level: 1,
  upgradeCost: 120,
  defense: 5,
  attack: 7
};

window.combatMenu = function() {
  let out = `<h2>Army & Defense</h2>
    <b>Soldiers:</b> ${window.army.soldiers}<br>
    <b>Level:</b> ${window.army.level}<br>
    <b>Attack:</b> ${window.army.attack}<br>
    <b>Defense:</b> ${window.army.defense}<br>
    <button onclick="upgradeArmy()">Upgrade Army (${window.army.upgradeCost} Gold)</button>
    <button onclick="recruitSoldiers()">Recruit Soldiers (10 Food)</button>
    <button onclick="window.updateBuildingDisplay()">Back</button>
    <hr><button onclick="simulateRaid()">Send Raid</button>
  `;
  document.getElementById('controls').innerHTML = out;
};

window.upgradeArmy = function() {
  if (window.resources.gold >= window.army.upgradeCost) {
    window.resources.gold -= window.army.upgradeCost;
    window.army.level += 1;
    window.army.attack += 3;
    window.army.defense += 2;
    window.army.upgradeCost = Math.round(window.army.upgradeCost * 1.7);
    showEvent("Army upgraded! Attack and defense increased.");
    window.combatMenu();
    updateResourceDisplay();
  } else {
    showEvent("Not enough gold to upgrade your army.");
  }
};

window.recruitSoldiers = function() {
  if (window.resources.food >= 10) {
    window.resources.food -= 10;
    window.army.soldiers += 5 + window.army.level;
    showEvent("Recruited new soldiers!");
    window.combatMenu();
    updateResourceDisplay();
  } else {
    showEvent("Not enough food to recruit soldiers.");
  }
};

window.simulateRaid = function() {
  let loot = Math.floor(window.army.attack * Math.random() * 3);
  window.resources.gold += loot;
  showEvent(`Raid success! You gained ${loot} gold.`);
  updateResourceDisplay();
};