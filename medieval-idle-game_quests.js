window.quests = {
  active: false,
  level: 1,
  upgradeCost: 200,
  questCount: 0
};

window.questMenu = function() {
  let out = `<h2>Quests</h2>
    <b>Quest Level:</b> ${window.quests.level}<br>
    <b>Quests Completed:</b> ${window.quests.questCount}<br>
    <button onclick="upgradeQuests()">Upgrade Quest System (${window.quests.upgradeCost} Gold)</button>
    <button onclick="startQuest()">Start Quest</button>
    <button onclick="window.updateBuildingDisplay()">Back</button>
  `;
  document.getElementById('controls').innerHTML = out;
};

window.upgradeQuests = function() {
  if (window.resources.gold >= window.quests.upgradeCost) {
    window.resources.gold -= window.quests.upgradeCost;
    window.quests.level += 1;
    window.quests.upgradeCost = Math.round(window.quests.upgradeCost * 1.7);
    showEvent("Quest system upgraded! Better rewards unlocked.");
    window.questMenu();
    updateResourceDisplay();
  } else {
    showEvent("Not enough gold to upgrade quest system.");
  }
};

window.startQuest = function() {
  let success = Math.random() < (0.6 + window.quests.level*0.05);
  if (success) {
    window.quests.questCount += 1;
    let reward = 100 + window.quests.level*30;
    window.resources.gold += reward;
    showEvent(`Quest completed! You earn ${reward} gold.`);
    updateResourceDisplay();
    window.questMenu();
  } else {
    showEvent("Quest failed. Try upgrading your quest system!");
    window.questMenu();
  }
};