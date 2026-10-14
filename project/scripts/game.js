
const characterForm = document.querySelector("#character-form");
const characterCreation = document.querySelector("#character-creation");
const gameArea = document.querySelector("#game-area");
const heroName = document.querySelector("#hero-name");
const equipmentCheckboxes = document.querySelectorAll(
    'input[name="equipment"]'
);
const equipmentCount = document.querySelector("#equipment-count");
const sceneTitle = document.querySelector("#scene-title");
const sceneDescription = document.querySelector("#scene-description");
const sceneChoices = document.querySelector("#scene-choices");
const playerEquipment = document.querySelector("#player-equipment");
const playerDiscoveries = document.querySelector("#player-discoveries");
const restartButton = document.querySelector("#restart-button");
const savedAdventure = document.querySelector("#saved-adventure");
const savedMessage = document.querySelector("#saved-message");
const continueButton = document.querySelector("#continue-button");
const newGameButton = document.querySelector("#new-game-button");
const riddleForm = document.querySelector("#riddle-form");
const riddleAnswer = document.querySelector("#riddle-answer");
const gameConsequences = document.querySelector("#game-consequences");


const STORAGE_KEY = "lichPlayer";

const equipmentNames = {
    sword: "Holy Sword",
    potion: "Invisibility Potion",
    enchantment: "Enchantment"
};

const discoveryNames = {
    "elara-secret": "Elara's Story and the Soul-Jewel",
    "lich-name": "The Forgotten Name: Aldren"
};

let player = null;

// Game scenes and available choices.
const scenes = {

    "tower-gate": {
        title: "The Tower Gate",
        description: `
The Lich's tower rises before you, {heroName}, its black spires disappearing into a sky without stars.

An unnatural silence surrounds the fortress. Even the wind seems unwilling to approach its ancient walls.

Before you stands a massive stone gate, sealed by runes that pulse with a pale blue light.

As you draw closer, a voice emerges from the stone itself.

"Speak the answer to my riddle, and the path shall open. Fail... and face the consequences."

The runes grow brighter.

You may accept the challenge or search the outer walls for another entrance.
    `,
        choices: [
            {
                text: "Answer the ancient riddle",
                nextScene: "tower-riddle"
            },
            {
                text: "Search for another entrance",
                nextScene: "hidden-path"
            }
        ]
    },


    "tower-riddle": {
        title: "The Guardian's Riddle",
        description: `
You approach the ancient gate.

The runes flare with cold blue fire, illuminating symbols carved long before your kingdom existed.

"Long have I guarded this entrance," the voice declares.

"Only those who possess both courage and wisdom may pass."

A deep silence follows.

Then the guardian speaks once more.

"There exists a force that no one has ever mastered.

It destroys empires, devours mountains, and erases memories.

Speak its name."

The tower waits for your answer.
    `,
        choices: []
    },


    "riddle-success": {
        title: "The Gates Open",
        description: `
For a moment, nothing happens.

Then the ancient runes begin to fade, one by one.

A deep rumble shakes the ground beneath your feet.

"You have answered wisely," the guardian declares.

"May your courage prove equal to your wisdom."

With a thunderous groan, the massive stone doors swing open.

Beyond them stretches a corridor swallowed by darkness.

A cold wind carries the scent of dust, decay, and forbidden magic.

You have entered the Lich's tower.
    `,
        choices: [
            {
                text: "Enter the dark corridor",
                nextScene: "zombie-hall"
            }
        ]
    },

    "riddle-failure": {
        title: "The Forgotten Dungeon",
        description: `
The moment you speak your answer, the runes erupt with blinding crimson light.

The world disappears.

When your vision returns, you find yourself inside a cold prison cell deep beneath the tower.

Your weapons have been taken from you.

Beyond the iron bars, a ghostly figure begins to form.

The Lich.

"Fool," he whispers, a cruel smile spreading across his pale face.

"You will rot in this cell long before you ever threaten my ritual."

His spectral image flickers in the darkness.

You must find a way to escape.
    `,
        choices: [
            {
                text: "Remain silent and examine the cell",
                nextScene: "dungeon-silence"
            },
            {
                text: "Taunt the Lich",
                nextScene: "dungeon-taunt"
            }
        ]
    },


    "dungeon-silence": {
        title: "A Passage Behind the Stones",
        description: `
You remain silent beneath the Lich's mocking gaze.

For a moment, the spectral figure waits for an answer.

"Nothing to say, little hero?"

His laughter echoes through the dungeon before his image fades into the darkness.

You are alone.

Searching the cold walls of your cell, you notice a loose stone near the floor. Behind it lies a narrow opening, barely wide enough to crawl through.

You squeeze into the darkness.

After what feels like an eternity, the passage opens into a forgotten chamber with three exits.

An iron door stands to your left. Beyond it, you hear the footsteps of a lone guard.

A narrow tunnel stretches ahead, carrying a foul smell from somewhere deep underground.

To your right, a decaying wooden staircase rises toward the upper levels of the tower.

You must choose your path.
    `,
        choices: [
            {
                text: "Open the iron door",
                nextScene: "dungeon-iron-door"
            },
            {
                text: "Enter the dark tunnel",
                nextScene: "dungeon-tunnel"
            },
            {
                text: "Climb the wooden staircase",
                nextScene: "dungeon-staircase"
            }
        ]
    },

    "dungeon-iron-door": {
        title: "The Undead Guard",
        description: `
You carefully push open the iron door.

A lone skeleton stands watch in the corridor, its empty eye sockets glowing with faint green fire.

Beside it, resting against the wall, you recognize a familiar weapon.

A familiar Holy Sword, confiscated from a fallen adventurer.

The guard turns toward you, drawing a rusted blade.

You have only a moment to act.

With a desperate burst of courage, you seize your weapon and strike.

The skeleton collapses into a pile of ancient bones.

Your sword is yours again.

Beyond the fallen guard, a staircase leads upward into the heart of the tower.

Somewhere above, the Lich continues his ritual.
    `,
        choices: [
            {
                text: "Continue toward the ritual chamber",
                nextScene: "ritual-entrance",
                recoverItem: "sword", setFlags: { swordMagic: true }
            }
        ]
    },

    "dungeon-tunnel": {
        ending: "victory",
        title: "Eyes in the Darkness",
        description: `
You follow the narrow tunnel, guided by a faint current of cold air.

The walls grow damp. The darkness thickens.

Then you hear it.

A wet, uneven breathing.

Two pale eyes open in the shadows ahead.

A monstrous ghoul emerges from the darkness, its claws scraping against the stone.

You turn to run, but the creature is already upon you.

Your cries echo through the forgotten tunnels.

Far above, the Lich's ritual continues undisturbed.

Your journey ends here.
    `,
        choices: []
    },

    "dungeon-staircase": {
        title: "The Broken Staircase",
        description: `
You place your foot upon the first wooden step.

It groans beneath your weight.

Slowly, you begin to climb.

Halfway up, a sharp crack splits the silence.

The staircase collapses.

You fall through rotten wood and strike the stone floor below.

For several moments, you can do nothing but struggle to breathe.

At last, you rise.

Bruised and trembling, you discover a narrow passage beyond the wreckage.

It leads upward.

Your escape has cost you dearly, but you are still alive.

You continue toward the ritual chamber.
    `,
        choices: [
            {
                text: "Continue toward the ritual chamber",
                nextScene: "ritual-entrance"
            }
        ]
    },


    "dungeon-taunt": {
        title: "The Lich's Wrath",
        description: `
You lift your head and meet the Lich's spectral gaze.

"You're not immortal. You're just a coward too afraid to die."

His smile vanishes.

For a moment, the dungeon is silent.

Then his voice shakes the very stones.

"You dare mock me?"

A terrible sound answers from beyond the cell.

Heavy footsteps.

Iron chains dragging across the floor.

"Guardian," the Lich commands. "End this fool."

The prison door explodes inward.

A towering undead creature steps through the wreckage, its massive hands stained with centuries of blood.

You have no time to hide.

The guardian charges.
    `,
        choices: [
            {
                text: "Fight the guardian with your bare hands",
                nextScene: "dungeon-guardian-defeat"
            },
            {
                text: "Drink the Invisibility Potion",
                nextScene: "dungeon-guardian-escape",
                requiredItem: "potion",
                consumeItem: "potion"
            },
            {
                text: "Cast the Enchantment",
                nextScene: "dungeon-guardian-enchantment",
                failureScene: "dungeon-guardian-defeat", chance: 0.65,
                requiredItem: "enchantment"
            }
        ]
    },

    "dungeon-guardian-defeat": {
        ending: "victory",
        title: "A Hopeless Battle",
        description: `
With nothing left to lose, you charge the guardian.

Your fists strike its ancient armor.

The creature does not move.

One enormous hand closes around your arm.

Before you can break free, the guardian lifts you from the ground and hurls you against the stone wall.

The impact steals the breath from your lungs.

As darkness closes around you, the creature returns to its post.

The Lich's ritual continues.

Your journey ends here.
    `,
        choices: []
    },

    "dungeon-guardian-escape": {
        title: "A Vanishing Hope",
        description: `
As the guardian charges, you uncork the Invisibility Potion.

You drink it in one desperate motion.

Your body begins to fade.

The creature skids to a halt, roaring in confusion.

Its massive fists strike the empty air where you stood only moments before.

Holding your breath, you slip past the guardian and disappear into the dungeon corridor.

The potion's magic slowly fades.

You are free.

But somewhere behind you, the guardian is still searching.

You hurry toward the upper levels of the tower.
    `,
        choices: [
            {
                text: "Continue toward the ritual chamber",
                nextScene: "ritual-entrance"
            }
        ]
    },

    "dungeon-guardian-enchantment": {
        title: "The Guardian's Will",
        description: `
You raise your hand and whisper the words of an ancient enchantment.

Golden light spreads across the dungeon.

The guardian freezes.

For a terrible moment, nothing moves.

Then the green fire in its eyes begins to fade.

Slowly, the creature turns away from you.

With a thunderous roar, it charges into the corridor and attacks the Lich's undead servants.

The dungeon erupts into chaos.

You seize the opportunity and escape.

The enchantment has served its purpose.

You make your way toward the ritual chamber.
    `,
        choices: [
            {
                text: "Continue toward the ritual chamber",
                nextScene: "ritual-entrance"
            }
        ]
    },


    "hidden-path": {
        title: "The Hidden Path",
        description: `Beneath the moonless sky, you circle the tower past broken statues and thorn-covered graves. A drainage arch lies concealed behind ivy. Through it, a passage descends into a chamber untouched by centuries.`,
        choices: [
            { text: "Enter the forgotten chamber", nextScene: "forgotten-chamber" },
            { text: "Return to the main gate", nextScene: "tower-gate" }
        ]
    },
    "zombie-hall": {
        title: "The Hall of the Restless",
        description: `The gate slams behind you. Armored corpses rise from the floor, their rusted blades dragging across the stone. Once they guarded this kingdom; now they guard the Lich's grief. Their hollow eyes fix upon you. Fighting could cost you the sword's sacred light. Running might leave the horde at your heels.`,
        choices: [
            { text: "Cut through the undead with the Holy Sword", requiredItem: "sword", setFlags: { swordMagic: false, zombieHorde: false }, nextScene: "zombie-sword" },
            { text: "Slip past with the Invisibility Potion", requiredItem: "potion", consumeItem: "potion", setFlags: { zombieHorde: true }, nextScene: "zombie-invisible" },
            { text: "Turn the undead against one another (65% chance)", requiredItem: "enchantment", chance: 0.65, nextScene: "zombie-spell-success", failureScene: "zombie-spell-failure" },
            { text: "Run deeper into the tower", setFlags: { zombieHorde: true }, nextScene: "zombie-flight" }
        ]
    },
    "zombie-sword": {
        title: "A Light Spent",
        description: `You raise the Holy Sword. Radiance floods the corridor; the dead fall like ash before the dawn. When the last skeleton crumbles, the light gutters out. The blade remains sharp, but its blessing is spent. You have won passage at a terrible cost.`,
        choices: [{ text: "Search the forgotten chamber", nextScene: "forgotten-chamber" }]
    },
    "zombie-invisible": {
        title: "Unseen, Not Unfollowed",
        description: `The potion erases your outline. You slip between grasping hands, but one corpse turns toward the sound of your footsteps. Others follow. You escape into a side chamber as their shuffling echoes grow louder behind you.`,
        choices: [{ text: "Search the forgotten chamber", nextScene: "forgotten-chamber" }]
    },
    "zombie-spell-success": {
        title: "The Dead Turn on the Dead",
        description: `Your enchantment catches in the old armor like sparks in dry grass. The undead turn their blades on each other. As the hall descends into chaos, you pass through unharmed.`,
        choices: [{ text: "Search the forgotten chamber", nextScene: "forgotten-chamber" }]
    },
    "zombie-spell-failure": {
        title: "The Spell Breaks",
        description: `Your whispered command echoes through the hall. The undead hesitate, then turn toward you together. The enchantment has failed. You barely escape through a narrow doorway, and the entire horde follows.`,
        choices: [{ text: "Barricade the passage and press on", nextScene: "forgotten-chamber" }]
    },
    "zombie-flight": {
        title: "Footsteps Behind You",
        description: `You sprint past the undead, throwing a rotten bench into their path. They tear through it without slowing. You reach an old study, but the noise of the pursuing horde follows you into the dark.`,
        choices: [{ text: "Search the forgotten chamber", nextScene: "forgotten-chamber" }]
    },
    "forgotten-chamber": {
        title: "The Forgotten Chamber",
        description: `The chamber feels less like a tomb than a home abandoned in haste. A woman's portrait hangs over the hearth. Beneath it, one word remains legible: ELARA.

On the desk rests a journal. Its author's name has been scraped from the cover. A black wax seal binds the final pages, and silver runes crawl across the wax. A cracked mirror reflects a staircase that does not exist.

Far above, a bell begins to toll. The ritual is approaching its end.`,
        choices: [
            { text: "Read the unsealed journal", discovery: "elara-secret", nextScene: "journal-discovery" },
            { text: "Examine the silver mirror", nextScene: "mirror-chamber" },
            { text: "Go directly to the ritual", nextScene: "ritual-entrance" }
        ]
    },
    "journal-discovery": {
        title: "The Pages He Could Not Burn",
        description: `The first pages speak of a healer, a woman named Elara, and a quiet life beneath apple trees. Then Elara fell ill. The healer exhausted every remedy, and grief turned his research toward forbidden magic.

One diagram shows a black jewel in Elara's wedding ring. Beside it: "Let my flesh perish. So long as this stone endures, my soul remains." You have discovered the Lich's phylactery.

But the author's true name is hidden beneath the wax seal. Silver letters form a warning: "BREAK THIS SEAL, AND THE MASTER WILL KNOW."

A footstep echoes outside the chamber. The final pages could give you something more powerful than a weapon—but reading them openly will reveal your presence.`,
        choices: [
            { text: "Break the seal; learn his name but alert him", discovery: "lich-name", setFlags: { lichAlerted: true, stealth: false }, nextScene: "journal-name-revealed" },
            { text: "Spend the Enchantment to silence the ward and learn his name", requiredItem: "enchantment", consumeItem: "enchantment", discovery: "lich-name", setFlags: { stealth: true }, nextScene: "journal-name-revealed" },
            { text: "Leave the pages sealed and approach unseen", setFlags: { stealth: true }, nextScene: "ritual-entrance" },
            { text: "Seek another route through the mirror", nextScene: "mirror-chamber" }
        ]
    },
    "journal-name-revealed": {
        title: "A Name Returned",
        description: `The final page survives in a steadier hand.

"My name is Aldren. If I ever become a thing that cannot remember mercy, let this name remind me that I was once a man."

Aldren.

The last line is addressed to Elara: "I would give anything to hear you laugh again. I fear I have already given too much."

You close the journal. The Lich's forgotten name is yours to speak—but whether he will listen remains uncertain.`,
        choices: [
            { text: "Carry the name to the ritual chamber", nextScene: "ritual-entrance" },
            { text: "Investigate the mirror first", nextScene: "mirror-chamber" }
        ]
    },
    "mirror-chamber": {
        title: "The Mirror of Sacrifice",
        description: `Your reflection moves before you do. A voice inside the silver frame whispers: "No passage without a price. Offer your strength, your magic, or your life." The glass opens onto a hidden stair leading to the ritual chamber.`,
        choices: [
            { text: "Sacrifice your strength (lose the Holy Sword)", requiredItem: "sword", consumeItem: "sword", nextScene: "mirror-passage" },
            { text: "Sacrifice your remaining magic (Potion and/or Enchantment)", requiredAnyItems: ["potion", "enchantment"], setFlags: { magicSacrificed: true }, nextScene: "mirror-passage" },
            { text: "Refuse the mirror's demand", nextScene: "ending-mirror" },
            { text: "Leave the mirror and take the ordinary corridor", nextScene: "ritual-entrance" }
        ]
    },
    "mirror-passage": {
        title: "The Price of Passage",
        description: `The mirror drinks your offering. Its surface parts like black water, revealing a hidden stair. Your sacrifice buys you a silent route into the chamber above, but the cost will follow you.`,
        choices: [{ text: "Enter the ritual chamber unseen", setFlags: { stealth: true }, nextScene: "ritual-entrance" }]
    },
    "ritual-entrance": {
        title: "The Ritual Chamber",
        description: `The heart of the tower is a cathedral built around a wound in the world.

A thousand candles burn upside down above a black abyss. Ancient runes creep across the floor. At the center, the princess kneels in chains, her life drawn away in silver threads each time a buried bell tolls.

Across the abyss stands the Lich. His staff gathers the stolen light. His other hand is closed tightly around something you cannot see.

"I have counted every winter," he tells the darkness. "Every spring that came without her. Tonight the counting ends."

The princess raises her head. "Please," she whispers.

The next decision could save a life—or end a kingdom.`,
        stealthDescription: `You remain concealed behind a broken pillar. The Lich has not noticed you. The princess is only a few steps away.`,
        exposedDescription: `The Lich lifts his gaze to you. There will be no quiet escape from the ritual circle now.`,
        secretDescription: `You recognize the wedding ring from the journal. Hidden inside its black jewel is the secret of the Lich's immortality.`,
        choices: [
            { text: "Slip forward and free the princess", requiredFlag: "stealth", requiredFalseFlag: "lichAlerted", nextScene: "princess-rescue" },
            { text: "Speak the Lich's forgotten name", requiredDiscovery: "lich-name", hideUntilDiscovered: true, nextScene: "lich-conversation" },
            { text: "Challenge the Lich and interrupt the ritual", nextScene: "final-confrontation" }
        ]
    },
    "princess-rescue": {
        title: "A Hand Through the Flames",
        description: `You creep beside the altar and break the circle's smallest rune. The princess stumbles into your arms. "Who are you?" she whispers.

"{heroName}. I'm getting you out."

"Please," she says, clutching your arm, "do not leave me here." A distant roar answers from the hall.`,
        choices: [
            { text: "Lead the princess to the hidden stairs", nextScene: "ending-horde", requiredFlag: "zombieHorde" },
            { text: "Escape with the princess", nextScene: "ending-escape", ending: "escape", requiredFalseFlag: "zombieHorde" },
            { text: "Hide her and face the Lich", setFlags: { princessSafe: true }, nextScene: "final-confrontation" }
        ]
    },
    "lich-conversation": {
        title: "The Name He Buried",
        description: `"Aldren."

The Lich's staff strikes the floor. Every candle stops burning.

"Who taught you that name?"

"You wrote it. Before you became this."

"That man died beside her grave."

"He was a healer. He saved children from the winter fever. He loved Elara beneath the apple trees."

His empty eyes turn toward the ring. "I remember the trees. I remember her hands. I cannot remember her voice."

The princess struggles against her chains. Another bell tolls.

"Do not ask me to lose her twice," Aldren whispers.

You have reached the man beneath the monster. What you say next may determine which of them answers.`,
        choices: [
            { text: "Remind him Elara would never demand an innocent life", requiredDiscovery: "elara-secret", weakenLich: true, nextScene: "final-confrontation" },
            { text: "Promise the ritual will truly restore Elara", nextScene: "ending-false-promise" },
            { text: "Condemn him for the lives he has stolen", nextScene: "ending-judgment" },
            { text: "Draw your weapon and end the conversation", nextScene: "final-confrontation" }
        ]
    },
    "final-confrontation": {
        title: "The Last Bell",
        description: `The final bell begins to toll.

The Lich drives his staff into the altar. A column of darkness tears through the roof. Across the distant kingdom, lights vanish one by one.

"You came to stop a miracle," he says. "You cannot imagine what it is to love beyond death."

The princess screams as the circle steals her breath. Somewhere within the ritual, a second heartbeat seems to answer the bell. You cannot see where it comes from.

If you have spent the Holy Sword's blessing, only its steel remains. If you left the undead alive, their footsteps are gathering outside the chamber.

You have only seconds, {heroName}. Every choice has a cost.`,
        secretDescription: `You remember the journal's drawing. The wedding ring in the Lich's closed fist holds the black jewel that binds his soul to this world. With the blessed sword, you know precisely what must be broken.`,
        choices: [
            { text: "Strike the Lich's heart with the Holy Sword", requiredItem: "sword", nextScene: "ending-immortal" },
            { text: "Shatter the soul-jewel with the blessed sword", requiredItem: "sword", requiredDiscovery: "elara-secret", hideUntilDiscovered: true, requiredFlag: "swordMagic", nextScene: "ending-defeat", ending: "defeat" },
            { text: "Disarm the Lich while the princess is hidden", requiredItem: "sword", requiredFlag: "princessSafe", nextScene: "ending-disarm", ending: "escape" },
            { text: "Give the princess the potion and stay behind to face the Lich", requiredItem: "potion", consumeItem: "potion", setFlags: { sacrificeMethod: "potion" }, nextScene: "ending-sacrifice" },
            { text: "Bind the Lich with an enchantment (30% chance)", requiredItem: "enchantment", chance: 0.30, setFlags: { sacrificeMethod: "enchantment" }, nextScene: "ending-sacrifice", failureScene: "ending-victory" },
            { text: "Appeal to the man behind the Lich", requiredDiscovery: "lich-name", hideUntilDiscovered: true, requiredWeakening: true, nextScene: "ending-redemption", ending: "redemption" },
            { text: "Charge into the ritual without a plan", nextScene: "ending-victory", ending: "victory" }
        ]
    },
    "ending-defeat": {
        title: "The Curse Is Broken",
        description: `You aim not for the Lich's body, but for the ring.

The Holy Sword blazes with its last sacred light. The Lich understands a heartbeat too late.

"No—"

The jewel breaks with a sound like a bell beneath the sea. The ritual collapses. Centuries of stolen magic tear through the altar.

The Lich falls to his knees. For a moment, he studies the empty ring as if searching for something lost long ago. Then he crumbles into dust.

You pull the princess from the dying circle as the tower begins to fall.

The curse is broken. The kingdom will see another dawn.

THE END — THE LICH'S DEFEAT`,
        ending: "defeat",
        choices: []
    },
    "ending-disarm": {
        title: "The Staff Falls",
        description: `With the princess safely hidden, you strike the Lich's staff from his hand. The circle fractures. You flee as the chamber fills with fire. The princess survives, but the Lich has not truly been destroyed. His shadow may rise again.

THE END — THE PRINCESS'S ESCAPE`,
        ending: "escape", choices: []
    },
    "ending-escape": {
        title: "The Princess's Escape",
        description: `You seize the princess's hand and run through collapsing corridors. Behind you, the Lich's furious cry shakes the stones. Dawn finds you beyond the tower's reach. The princess lives, but the Lich is still waiting in the dark. His power has not been broken.

THE END — THE PRINCESS'S ESCAPE`,
        ending: "escape", choices: []
    },
    "ending-redemption": {
        title: "The Lich's Redemption",
        description: `"Aldren," you say, refusing to raise your weapon. "You cannot remember Elara's voice. Would she recognize yours?"

"I could bring her back."

"You could bring something back. But she would wake in a world you emptied to reach her."

The Lich looks at the princess for the first time, instead of the ring.

"She was afraid of the dark," he whispers. "She left candles burning for strangers."

He lowers the staff.

The final bell strikes—and Aldren breaks the altar himself. The princess falls free. He closes his hand around the ring until the black jewel turns to dust.

"Forgive me, Elara."

Outside, the dead sink to rest. Dawn spills through the broken roof. The man who forgot his name has remembered how to let go.

THE END — THE LICH'S REDEMPTION`,
        ending: "redemption",
        choices: []
    },
    "ending-victory": {
        title: "The Lich's Victory",
        description: `You rush forward. The Lich does not even turn.

His fingers close, and the air becomes a fist. Your weapon falls beyond your reach. The princess calls out once; the final bell swallows her voice.

Darkness opens above the altar like an eye. Light fills the ritual circle.

"Elara?" the Lich whispers into the brilliance.

No answer comes.

Beyond the broken windows, the kingdom's lights go out. He has won the ritual—and lost the last thing that made victory matter.

THE END — THE LICH'S VICTORY`,
        ending: "victory",
        choices: []
    },
    "ending-immortal": {
        title: "A Heart That Cannot Die",
        description: `Your sword pierces the Lich's chest. He looks down, almost sadly. "Did you think death would frighten me?" The wound closes around the blade. Whatever keeps him alive is untouched by your blow. Darkness takes you before you can strike again.

THE END — THE LICH'S VICTORY`,
        ending: "victory", choices: []
    },
    "ending-horde": {
        title: "The Horde Returns",
        description: `You hurry toward the stairs with the princess, but the undead you left behind fill the passage. There is nowhere to run. As the last torch dies, you realize the tower remembers every choice.

THE END — THE HORDE'S VICTORY`,
        potionDescription: `You tear the last chain from the princess's wrist and press the Invisibility Potion into her hand.

"Run," you whisper. "Whatever happens, do not look back."

She drinks. Her outline vanishes. You step between the Lich and the empty doorway, drawing all of his fury upon yourself.

For a moment, the plan seems to work. The princess slips from the chamber unheard.

Then come the footsteps from below: the undead horde you failed to stop. Invisible does not mean silent. They hear her desperate breathing on the stairs.

You cannot leave your position. You hear her scream before the Lich strikes you down.

You gave everything to save her, but the dead remember the path you left open.

THE END — THE HORDE'S VICTORY`,
        ending: "victory", choices: []
    },
    "ending-judgment": {
        title: "A Wound Too Deep",
        description: `"You call this love?" you demand. "You have become the thing she would have feared."

The Lich goes still.

"You read a few pages," he says, "and believe you have lived my grief?"

"I know what you've done."

"Then you know nothing of what it cost."

He closes his fist. The circle ignites. Your words have found his shame, but not his mercy.

For one terrible moment, you glimpse the man you might have reached. Then the monster chooses for him.

THE END — THE LICH'S VICTORY`,
        ending: "victory",
        choices: []
    },
    "ending-false-promise": {
        title: "A Promise That Cannot Be Kept",
        description: `"Let the ritual finish," you tell him. "Perhaps Elara truly can return."

"You would give me hope?" the Lich asks.

You look at the chained princess and say nothing.

"Then witness my triumph."

The final bell sounds. The princess's light vanishes into the jewel. A woman's silhouette forms in the air, bright as dawn and thin as smoke.

"Elara?"

The shape opens its eyes. They are empty.

What answers him is not the woman he loved. And now no one remains to stop it.

THE END — THE FALSE PROMISE`,
        ending: "victory", choices: []
    },
    "ending-mirror": {
        title: "The Mirror's Price",
        description: `"Then your life will suffice," the reflection whispers. The glass reaches for you. The last thing you see is your own face, trapped on the other side.

THE END — LOST TO THE MIRROR`,
        ending: "victory", choices: []
    },
    "ending-sacrifice": {
        title: "The Hero's Sacrifice",
        description: `Against all odds, your enchantment holds. The Lich freezes as you break the princess's chains. You spend the last of your strength keeping him bound while she escapes. When the spell fails, you are still standing between him and the door.

The kingdom will never know your final words. The princess will never forget.

THE END — THE HERO'S SACRIFICE`,
        potionDescription: `You rush into the ritual circle as the Lich raises his staff. The ancient runes burn against your skin. You wrench the princess's chains apart and push the Invisibility Potion into her trembling hands.

"Drink it," you tell her. "Get out of this tower."

"What about you, {heroName}?"

You glance at the Lich, at the darkness gathering around his staff. "I'll keep him here."

The princess disappears before your eyes. You step into the Lich's path, knowing you cannot win. He sends a wave of cold fire toward the exit; you throw yourself into its path.

The last thing you hear is a door opening somewhere beyond the flames.

By dawn, the princess has reached the kingdom alive. She tells them the name of the hero who stayed behind.

THE END — THE HERO'S SACRIFICE`,
        ending: "sacrifice", choices: []
    }

};


// Game logic: scene data drives the story; state drives consequences.
function submitRiddle(event) {
    event.preventDefault();
    if (!player || player.currentScene !== "tower-riddle") return;
    const answer = riddleAnswer.value.trim().toLowerCase();
    if (answer === "time") {
        player.currentScene = "riddle-success";
    } else {
        player.swordConfiscated = player.equipment.includes("sword");
        player.equipment = player.equipment.filter(item => item !== "sword");
        player.currentScene = "riddle-failure";
    }
    riddleForm.reset();
    saveGame();
    renderScene();
}

function getSelectedEquipment() {
    return Array.from(equipmentCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}

function updateEquipmentCount() {
    const selected = getSelectedEquipment();
    equipmentCount.textContent = `${selected.length} of 2 items selected`;
    equipmentCheckboxes.forEach(checkbox => {
        checkbox.disabled = !checkbox.checked && selected.length >= 2;
    });
}

function saveGame() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch (error) {
        console.error(`Unable to save adventure:`, error);
    }
}

function loadGame() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const saved = JSON.parse(raw);
        if (!saved || typeof saved.name !== "string" ||
            !Array.isArray(saved.equipment) || !Array.isArray(saved.discoveries) ||
            !Object.hasOwn(scenes, saved.currentScene)) return null;
        // Support saves from earlier versions of the adventure.
        return {
            ...saved,
            swordMagic: saved.swordMagic ?? true,
            swordConfiscated: saved.swordConfiscated ?? false,
            zombieHorde: saved.zombieHorde ?? false,
            princessSafe: saved.princessSafe ?? false,
            stealth: saved.stealth ?? false,
            lichAlerted: saved.lichAlerted ?? false,
            magicSacrificed: saved.magicSacrificed ?? false,
            lichWeakened: saved.lichWeakened ?? false,
            sacrificeMethod: saved.sacrificeMethod ?? null,
            ending: scenes[saved.currentScene].ending ?? saved.ending ?? null
        };
    } catch (error) {
        console.error(`Unable to load adventure:`, error);
        return null;
    }
}

function checkSavedGame() {
    const saved = loadGame();
    if (!saved) return;
    characterCreation.hidden = true;
    savedAdventure.hidden = false;
    savedMessage.textContent = saved.ending
        ? `${saved.name}, your previous journey has ended. Review the ending or start again.`
        : `${saved.name}, your adventure is waiting. Continue where you left off.`;
    continueButton.textContent = saved.ending ? `Review Your Ending` : `Continue Adventure`;
}

function continueGame() {
    player = loadGame();
    if (!player) {
        savedAdventure.hidden = true;
        characterCreation.hidden = false;
        return;
    }
    savedAdventure.hidden = true;
    characterCreation.hidden = true;
    gameArea.hidden = false;
    renderScene();
}

function getLockReason(choice) {
    if (choice.requiredItem && !player.equipment.includes(choice.requiredItem)) {
        return `Requires: ${equipmentNames[choice.requiredItem]}`;
    }
    if (choice.requiredAnyItems &&
        !choice.requiredAnyItems.some(item => player.equipment.includes(item))) {
        return `Requires: an Invisibility Potion or Enchantment`;
    }
    if (choice.requiredDiscovery && !player.discoveries.includes(choice.requiredDiscovery)) {
        return `Requires: ${discoveryNames[choice.requiredDiscovery]}`;
    }
    if (choice.requiredWeakening && !player.lichWeakened) {
        return `Requires: The Lich's Humanity`;
    }
    if (choice.requiredFlag && !player[choice.requiredFlag]) {
        const reasons = { stealth: "a quiet entrance", swordMagic: "the sword's sacred power", princessSafe: "the princess safely hidden", zombieHorde: "the pursuing horde" };
        return `Requires: ${reasons[choice.requiredFlag] ?? choice.requiredFlag}`;
    }
    if (choice.requiredFalseFlag && player[choice.requiredFalseFlag]) {
        return `Blocked: ${choice.requiredFalseFlag === "zombieHorde" ? "the undead are pursuing you" : choice.requiredFalseFlag}`;
    }
    return ``;
}

function canChoose(choice) {
    return getLockReason(choice) === ``;
}

function updateGameStatus() {
    const equipment = player.equipment.map(item => equipmentNames[item] ?? item);
    const discoveries = player.discoveries.map(item => discoveryNames[item] ?? item);
    playerEquipment.textContent = equipment.length ? equipment.join(", ") : "None";
    playerDiscoveries.textContent = discoveries.length ? discoveries.join(", ") : "None";
    const flags = [];
    if (player.equipment.includes("sword")) flags.push(player.swordMagic ? "Holy Sword: blessed" : "Holy Sword: blessing spent");
    if (player.zombieHorde) flags.push("Undead horde: pursuing");
    if (player.princessSafe) flags.push("Princess: safe");
    if (player.lichWeakened) flags.push("The Lich: shaken by memories");
    gameConsequences.textContent = flags.length ? flags.join(" • ") : "No lasting consequences yet.";
}

function getSceneDescription(scene) {
    let description = player.sacrificeMethod === "potion" && scene.potionDescription
        ? scene.potionDescription
        : scene.description;

    if (scene.secretDescription && player.discoveries.includes("elara-secret")) {
        description = `${description}\n\n${scene.secretDescription}`;
    }
    if (scene.stealthDescription) {
        const approach = player.stealth && !player.lichAlerted
            ? scene.stealthDescription
            : scene.exposedDescription;
        description = `${description}\n\n${approach}`;
    }

    // Use a replacement callback so even names containing '$' remain literal.
    return description.trim().replaceAll("{heroName}", () => player.name);
}

function renderScene() {
    if (!player || !Object.hasOwn(scenes, player.currentScene)) return;
    const scene = scenes[player.currentScene];
    if (scene.ending) player.ending = scene.ending;
    sceneTitle.textContent = scene.title;
    sceneDescription.textContent = getSceneDescription(scene);
    riddleForm.hidden = player.currentScene !== "tower-riddle";
    sceneChoices.replaceChildren();
    scene.choices.forEach(choice => {
        if (choice.hideUntilDiscovered && !player.discoveries.includes(choice.requiredDiscovery)) return;
        const button = document.createElement("button");
        const available = canChoose(choice);
        button.type = "button";
        button.disabled = !available;
        button.textContent = available ? choice.text : `${choice.text} (${getLockReason(choice)})`;
        if (available) button.addEventListener("click", () => makeChoice(choice));
        sceneChoices.appendChild(button);
    });
    updateGameStatus();
    restartButton.hidden = !player.ending;
    saveGame();
}

function makeChoice(choice) {
    if (!player || player.ending || !canChoose(choice)) return;
    if (choice.consumeItem) {
        player.equipment = player.equipment.filter(item => item !== choice.consumeItem);
    }
    if (choice.discovery && !player.discoveries.includes(choice.discovery)) {
        player.discoveries.push(choice.discovery);
    }
    if (choice.weakenLich) player.lichWeakened = true;
    if (choice.setFlags) Object.assign(player, choice.setFlags);
    if (player.magicSacrificed) {
        player.equipment = player.equipment.filter(item => item !== "potion" && item !== "enchantment");
        player.magicSacrificed = false;
    }
    if (choice.recoverItem && !player.equipment.includes(choice.recoverItem)) {
        player.equipment.push(choice.recoverItem);
        player.swordConfiscated = false;
    }
    let destination = choice.nextScene;
    if (typeof choice.chance === "number" && Math.random() >= choice.chance) {
        destination = choice.failureScene;
        if (player.currentScene === "zombie-hall") player.zombieHorde = true;
    }
    if (choice.setFlags?.sacrificeMethod === "potion" && player.zombieHorde) {
        destination = "ending-horde";
    }
    player.currentScene = destination;
    player.ending = scenes[destination].ending ?? choice.ending ?? null;
    // Death scenes inherited from the earlier dungeon chapter.
    if (["dungeon-tunnel", "dungeon-guardian-defeat"].includes(destination)) player.ending = "victory";
    saveGame();
    renderScene();
}

function createCharacter(event) {
    event.preventDefault();
    const equipment = getSelectedEquipment();
    const name = heroName.value.trim();
    if (!name || equipment.length !== 2) {
        equipmentCount.textContent = `Please enter a name and select exactly two items.`;
        return;
    }
    player = {
        name, equipment, currentScene: "tower-gate", discoveries: [],
        lichWeakened: false, swordMagic: true, swordConfiscated: false,
        zombieHorde: false, princessSafe: false, stealth: false,
        lichAlerted: false, magicSacrificed: false,
        sacrificeMethod: null, ending: null
    };
    characterCreation.hidden = true;
    gameArea.hidden = false;
    saveGame();
    renderScene();
}

function restartGame() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (error) {
        console.error(`Unable to clear saved adventure:`, error);
    }
    player = null;
    characterForm.reset();
    riddleForm.reset();
    characterCreation.hidden = false;
    savedAdventure.hidden = true;
    gameArea.hidden = true;
    restartButton.hidden = true;
    updateEquipmentCount();
}

equipmentCheckboxes.forEach(checkbox => checkbox.addEventListener("change", updateEquipmentCount));
characterForm.addEventListener("submit", createCharacter);
restartButton.addEventListener("click", restartGame);
newGameButton.addEventListener("click", restartGame);
continueButton.addEventListener("click", continueGame);
riddleForm.addEventListener("submit", submitRiddle);
updateEquipmentCount();
checkSavedGame();
