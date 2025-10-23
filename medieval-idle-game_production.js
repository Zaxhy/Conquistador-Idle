// Idle production system: balanced for rewarding & engaging play

window.resources = {
  gold: 100,
  food: 70,
  wood: 40,
  iron: 15,
  luxury: 0
};

window.buildings = {
  farm: {level: 1, baseProduction: 3, resource: 'food', upgradeCost: 50, name: 'Farm', unlock: true},
  mine: {level: 1, baseProduction: 1, resource: 'iron', upgradeCost: 80, name: 'Mine', unlock: true},
  workshop: {level: 1, baseProduction: 2, resource: 'wood', upgradeCost: 65, name: 'Workshop', unlock: true},
  market: {level: 1, baseProduction: 0.3, resource: 'gold', upgradeCost: 120, name: 'Market', unlock: true},
  vineyard: {level: 0, baseProduction: 0.5, resource: 'luxury', upgradeCost: 500, name: 'Vineyard', unlock: false}
};

// Unlock vineyard after market level 3
function checkBuildingUnlocks() {
  if (!window.buildings.vineyard.unlock && window.buildings.market.level >= 3) {
    window.buildings.vineyard.unlock = true;
    showEvent("Your thriving market unlocks the <b>Vineyard</b>! Now you can produce luxury goods.");
    updateBuildingDisplay();
  }
}

// Idle production tick every second
window.idleProductionTick = function() {
  Object.keys(window.buildings).forEach(key => {
    let b = window.buildings[key];
    if (b.unlock && b.level > 0) {
      let amount = b.level * b.baseProduction;
      window.resources[b.resource] += amount;
    }
  });
  checkBuildingUnlocks();
  updateResourceDisplay();
};

// Upgrade handler
window.upgradeBuilding = function(name) {
  let b = window.buildings[name];
  if (window.resources.gold >= b.upgradeCost) {
    window.resources.gold -= b.upgradeCost;
    b.level += 1;
    b.baseProduction = Math.round(b.baseProduction * 1.35*100)/100; // 35% boost per level
    b.upgradeCost = Math.round(b.upgradeCost * 1.6); // Cost increases per level
    showUpgradeFeedback(b.name, b.level);
    updateResourceDisplay();
    updateBuildingDisplay();
    // Animate upgrade
    setTimeout(() => {
      let el = document.getElementById('building-'+name);
      if (el) el.classList.add('upgraded');
      setTimeout(() => el.classList.remove('upgraded'), 800);
    }, 40);
  } else {
    showUpgradeFeedback(b.name, null, true);
  }
};

// Utility
function showUpgradeFeedback(name, level, failed = false) {
  let out = document.getElementById('output');
  if (failed) {
    out.innerHTML = `Not enough gold to upgrade <b>${name}</b>!`;
  } else {
    out.innerHTML = `<b>${name}</b> upgraded to level ${level}! Production increased.`;
  }
}

window.getProductionSummary = function() {
  let text = '';
  Object.keys(window.buildings).forEach(key => {
    let b = window.buildings[key];
    if (b.unlock && b.level > 0) {
      text += `<b>${b.name}</b> (Lv.${b.level}): +${(b.baseProduction*b.level).toFixed(1)} ${capitalize(b.resource)}/sec<br>`;
    }
  });
  return text || "No production buildings unlocked yet!";
};

function showEvent(msg) {
  let ev = document.getElementById('events');
  ev.innerHTML = msg;
  setTimeout(()=>ev.innerHTML='',3500);
}
window.showEvent = showEvent;

function capitalize(str) {
  return str.charAt(0).toUpperCase()+str.slice(1);
}
window.capitalize = capitalize;