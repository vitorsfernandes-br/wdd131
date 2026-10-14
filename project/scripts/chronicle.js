
const STORAGE_KEY = "lichPlayer";

const emptyChronicle = document.querySelector("#empty-chronicle");
const chronicleContent = document.querySelector("#chronicle-content");

const chronicleName = document.querySelector("#chronicle-name");
const chronicleLocation = document.querySelector("#chronicle-location");
const chronicleEquipment = document.querySelector("#chronicle-equipment");
const chronicleDiscoveries = document.querySelector("#chronicle-discoveries");
const chronicleStatus = document.querySelector("#chronicle-status");
const chronicleContinue = document.querySelector("#chronicle-continue");

// Display names for equipment stored in the game.
const equipmentNames = {
    sword: "Holy Sword",
    potion: "Invisibility Potion",
    enchantment: "Enchantment"
};

// Display names for discoveries.
const discoveryNames = {
    "elara-secret": "Elara's Story and the Soul-Jewel",
    "lich-name": "The Forgotten Name: Aldren"
};

// Display names for game locations.
const locationNames = {
    "tower-gate": "The Tower Gate",
    "tower-riddle": "The Guardian's Riddle",
    "riddle-success": "The Gates Open",
    "riddle-failure": "The Forgotten Dungeon",
    "dungeon-silence": "A Passage Behind the Stones",
    "dungeon-iron-door": "The Undead Guard",
    "dungeon-tunnel": "Eyes in the Darkness",
    "dungeon-staircase": "The Broken Staircase",
    "dungeon-taunt": "The Lich's Wrath",
    "dungeon-guardian-defeat": "A Hopeless Battle",
    "dungeon-guardian-escape": "A Vanishing Hope",
    "dungeon-guardian-enchantment": "The Guardian's Will",
    "hidden-path": "The Hidden Path",
    "zombie-hall": "The Hall of the Restless",
    "zombie-sword": "A Light Spent",
    "zombie-invisible": "Unseen, Not Unfollowed",
    "zombie-spell-success": "The Dead Turn on the Dead",
    "zombie-spell-failure": "The Spell Breaks",
    "zombie-flight": "Footsteps Behind You",
    "forgotten-chamber": "The Forgotten Chamber",
    "journal-discovery": "The Pages He Could Not Burn",
    "journal-name-revealed": "A Name Returned",
    "mirror-chamber": "The Mirror of Sacrifice",
    "mirror-passage": "The Price of Passage",
    "ritual-entrance": "The Ritual Chamber",
    "princess-rescue": "A Hand Through the Flames",
    "lich-conversation": "The Name He Buried",
    "final-confrontation": "The Last Bell",
    "ending-defeat": "The Curse Is Broken",
    "ending-disarm": "The Staff Falls",
    "ending-escape": "The Princess's Escape",
    "ending-redemption": "The Lich's Redemption",
    "ending-victory": "The Lich's Victory",
    "ending-immortal": "A Heart That Cannot Die",
    "ending-horde": "The Horde Returns",
    "ending-judgment": "A Wound Too Deep",
    "ending-false-promise": "A Promise That Cannot Be Kept",
    "ending-mirror": "The Mirror's Price",
    "ending-sacrifice": "A Hero's Last Spell"
};

// Display names for the four endings.
const endingNames = {
    defeat: "The Lich's Defeat",
    escape: "The Princess's Escape",
    redemption: "The Lich's Redemption",
    victory: "The Lich's Victory",
    sacrifice: "The Hero's Sacrifice"
};

// Read saved data from localStorage.
function loadChronicle() {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
        return null;
    }

    try {
        const savedPlayer = JSON.parse(savedData);

        if (
            !savedPlayer ||
            typeof savedPlayer.name !== "string" ||
            !Array.isArray(savedPlayer.equipment) ||
            !Array.isArray(savedPlayer.discoveries) ||
            !Object.hasOwn(locationNames, savedPlayer.currentScene)
        ) {
            return null;
        }

        return savedPlayer;
    } catch (error) {
        console.error(`Unable to load chronicle:`, error);
        return null;
    }
}

// Convert stored IDs into readable names.
function formatItems(items, names) {
    if (items.length === 0) {
        return "None";
    }

    return items
        .map(item => names[item] ?? item)
        .join(", ");
}

// Display the saved character's information.
function renderChronicle(player) {
    chronicleName.textContent = player.name;

    chronicleLocation.textContent =
        locationNames[player.currentScene];

    chronicleEquipment.textContent = formatItems(player.equipment, equipmentNames) +
        (player.equipment.includes("sword") && player.swordMagic === false ? " (Holy Sword blessing spent)" : "");

    chronicleDiscoveries.textContent =
        formatItems(player.discoveries, discoveryNames);

    const sceneEnd = ["dungeon-tunnel", "dungeon-guardian-defeat"].includes(player.currentScene);
    chronicleStatus.textContent = sceneEnd
        ? "Journey Ended — Fallen in the Dungeon"
        : player.ending
            ? endingNames[player.ending] ?? "Adventure Completed"
            : "Adventure In Progress";

    chronicleContinue.textContent = (player.ending || locationNames[player.currentScene]?.startsWith("A Hopeless") || player.currentScene === "dungeon-tunnel")
        ? "Review Your Ending"
        : "Continue Adventure";
}

// Initialize the Chronicle page.
function initializeChronicle() {
    const player = loadChronicle();

    if (!player) {
        emptyChronicle.hidden = false;
        return;
    }

    chronicleContent.hidden = false;
    renderChronicle(player);
}

initializeChronicle();
