window.artifacts = {
  found: 0,
  level: 1,
  upgradeCost: 400,
  bonus: 0
};

window.artifactMenu = function() {
  let out = `<h2>Artifacts</h2>
    <b>Artifacts Found:</b> ${window.artifacts.found}<br>
    <b>Artifact Level:</b> ${window.artifacts.level}<br>
    <button onclick="upgradeArtifact()">Upgrade Artifact System (${window.artifacts.upgradeCost} Gold)</button>
    <button onclick="discoverArtifact()">Discover Artifact</button>
    <button onclick="window.updateBuildingDisplay()">Back</button>
  `;
  document.getElementById('controls').innerHTML = out;
};

window.upgradeArtifact = function() {
  if (window.resources.gold >= window.artifacts.upgradeCost) {
    window.resources.gold -= window.artifacts.upgradeCost;
    window.artifacts.level += 1;
    window.artifacts.bonus += 15;
    window.artifacts.upgradeCost = Math.round(window.artifacts.upgradeCost * 1.6);
    showEvent("Artifact system upgraded! Idle bonuses increased.");
    window.artifactMenu();
    updateResourceDisplay();
  } else {
    showEvent("Not enough gold to upgrade artifact system.");
  }
};

window.discoverArtifact = function() {
  if (window.resources.luxury >= 10) {
    window.resources.luxury -= 10;
    window.artifacts.found += 1;
    let bonus = window.artifacts.bonus + window.artifacts.level*5;
    window.resources.gold += bonus;
    showEvent(`Discovered a legendary artifact! Gained ${bonus} gold.`);
    updateResourceDisplay();
    window.artifactMenu();
  } else {
    showEvent("Not enough luxury goods to discover an artifact.");
  }
};