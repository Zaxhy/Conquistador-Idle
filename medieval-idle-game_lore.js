window.loreMenu = function() {
  let out = `<h2>World Lore</h2>
    <p>The Age of Conquest dawned as kingdoms vied for dominance over untamed lands.<br>
    Brave knights, cunning merchants, and ambitious explorers sought glory, gold, and legendary artifacts.<br>
    <br>
    <b>Key Events</b><br>
    - The Founding of Castille<br>
    - The Voyage to the New World<br>
    - The Rise of the Merchant Guilds<br>
    <br>
    <b>Legendary Figures</b><br>
    - Don Rodrigo: Knight of Valor<br>
    - Isabella: Explorer Queen<br>
    - El Grande: Scholar of Mythos<br>
    </p>
    <button onclick="window.updateBuildingDisplay()">Back</button>
  `;
  document.getElementById('controls').innerHTML = out;
};