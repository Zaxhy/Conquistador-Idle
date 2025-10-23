// Main entry point for Age of Conquest Idle Game

function updateResourceDisplay() {
  let output = "<h2>Resources</h2>";
  Object.keys(window.resources).forEach(k => {
    output += `${capitalize(k)}: <b>${Math.floor(window.resources[k])}</b><br>`;
  });
  output += "<hr><h3>Current Production</h3>"+getProductionSummary();
  document.getElementById('dashboard').innerHTML = output;
}

function updateBuildingDisplay() {
  let controls = document.getElementById('controls');
  let html = "<h2>Production Buildings</h2>";
  Object.keys(window.buildings).forEach(key => {
    let b = window.buildings[key];
    if (!b.unlock) return;
    html += `
      <div class="building" id="building-${key}">
        <b>${b.name}</b> (Level ${b.level})<br>
        Produces: <b>${(b.baseProduction*b.level).toFixed(1)} ${capitalize(b.resource)}/sec</b><br>
        <button onclick="window.upgradeBuilding('${key}')">
          Upgrade (${b.upgradeCost} Gold)
        </button>
      </div>
    `;
  });
  controls.innerHTML = html + `<hr>${mainMenuButtons()}`;
}

// Main menu buttons for active play
function mainMenuButtons() {
  return `
    <button onclick="combatMenu()">Army & Combat</button>
    <button onclick="diplomacyMenu()">Diplomacy</button>
    <button onclick="tradingMenu()">Trading</button>
    <button onclick="questMenu()">Quests</button>
    <button onclick="artifactMenu()">Artifacts</button>
    <button onclick="kingdomMenu()">Kingdom</button>
    <button onclick="expeditionMenu()">Expedition</button>
    <button onclick="loreMenu()">Lore</button>
  `;
}

// Idle loop
setInterval(() => {
  window.idleProductionTick();
  updateResourceDisplay();
}, 1000);

window.onload = function() {
  updateResourceDisplay();
  updateBuildingDisplay();
  document.getElementById('output').innerHTML = "Welcome, Sovereign! Your kingdom awaits.";
};

// Active play stubs (connect these to mechanics)
function combatMenu() { window.combatMenu && window.combatMenu(); }
function diplomacyMenu() { window.diplomacyMenu && window.diplomacyMenu(); }
function tradingMenu() { window.tradingMenu && window.tradingMenu(); }
function questMenu() { window.questMenu && window.questMenu(); }
function artifactMenu() { window.artifactMenu && window.artifactMenu(); }
function kingdomMenu() { window.kingdomMenu && window.kingdomMenu(); }
function expeditionMenu() { window.expeditionMenu && window.expeditionMenu(); }
function loreMenu() { window.loreMenu && window.loreMenu(); }