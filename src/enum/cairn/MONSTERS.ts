export const MONSTERS = [
    {
      "name": "Bat, Vampire",
      "stats": "3 HP, 6 STR, 14 DEX,  bite (d8)",
      "description": "- Large, nocturnal mammals that feed on the blood of their victims. \n- Unaffected by darkness or blinding effects. Loud noises and holy rituals may frighten them.\n- **Critical Damage**: Recovers full STR and HP if the target has blood."
    },
    {
      "name": "Elf",
      "stats": "4 HP, 1 Armor, 8 STR, 14 DEX, 14 WIL, shortswords (d6+d6) or longbow (d8), a Spellbook (choose one: Charm or Detect Magic)",
      "description": "- Slender, long-lived, fey humanoids with pointed ears. Live in harmony with nature, adapting to it instead of conquering.\n- Highly resistant to charming and mind-controlling effects."
    },
    {
      "name": "Giant Chameleon",
      "stats": "6 HP, 14 STR, 12 WIL, bite (d8)",
      "description": "- 7' long lizards that camouflage by changing the color of their scales.\n- Use their camouflage to surprise victims.\n- Can attack further away targets by grabbing them with their elongated tongue. The victim must save STR or be pulled to the lizard's mouth and bitten."
    },
    {
      "name": "Frost Elf",
      "stats": "14 HP, 1 Armor, 8 STR, 13 DEX, 14 WIL, icicle dagger (d6), a Spellbook (Choose one: Sleep, Teleport, Detect Magic)",
      "description": "- Beautiful, amoral, and long-lived.\n- Resistant to most forms of magic."
    },
    {
      "name": "Banshee",
      "stats": "8 HP, 3 Armor, 6 STR, 12 DEX, 15 WIL, ghostly touch (d8)",
      "description": "- Incorporeal spirits that long after death to haunt the living.\n- Unharmed by cold, heat, or the elements.\n- **Wail**: Anyone in earshot must makes a WIL save or be fall unconscious."
    },
    {
      "name": "Boar",
      "stats": "3 HP, 12 STR, 6 WIL, tusks (d6)",
      "description": "- Omnivorous wild boars that dwell primarily in forests.\n- Not naturally aggressive, but dangerous if disturbed.\n- **Critical Damage**: Gores its victims, causing great loss of blood."
    },
    {
      "name": "Tyrannosaurus",
      "stats": "18 HP, 1 Armor, 18 STR, 12 DEX, bite (d10+d10), _detachment_",
      "description": "- Massive, two-legged, predatory reptiles with huge jaws.\n- Extremely rare, can only be found in large regions of untouched wilderness.\n- Only hunt large and dangerous prey, always attacking the most threatening foe first."
    },
    {
      "name": "Kobold",
      "stats": "3 HP, 8 STR, bite (d6)",
      "description": "- Small canine humanoids with hairless, scaly, red-brown skin. Can see perfectly in the dark, but are harmed by direct sunlight. \n- Fight dirty, ambushing their victims in cramped spaces and running away as soon as the tide turns. Try to ambush adventurers and take their possessions. \n- **Critical Damage**: The Kobold bites a off a chunk of flesh from the target."
    },
    {
      "name": "Blink Dog",
      "stats": "5 HP, 11 STR, 14 DEX, 5 WIL, bite (d6)",
      "description": "- Intelligent, wild dogs that travel in packs.\n- After each attack, they may teleport a safe distance away."
    },
    {
      "name": "Treant",
      "stats": "10 HP, 3 Armor, 15 STR, 3 DEX, 12 WIL, roots (d10+d8, blast)",
      "description": "- A human face made of bark on the trunk of a massive tree. Found in the center of thick forests where it spreads its massive roots.\n- Connected to all trees on its forest, can control their growth and move their branches.\n- It feeds by draining energy from fresh bodies, any amount can be used, but the mightier the creature the better."
    },
    {
      "name": "Beetle, Tiger",
      "stats": "3 HP, 6 STR, 12 DEX, 6 WIL, bite (d6)",
      "description": "- 4\u2019 long striped carnivorous insect with powerful mandibles. \n- Prefers smaller prey but will not shy from hunting the occasional humanoid."
    },
    {
      "name": "Giant Crab",
      "stats": "6 HP, 3 Armor, 14 STR, 3 DEX, 8 WIL, pincers (d12)",
      "description": "- Huge crustaceans that live in coastal areas and mindlessly attack anything that comes near.\n- Their pincers crush with enough strength to ignore any armor lesser than plate. \n- Their heavy carapace makes them notably hardy but equally slow."
    },
    {
      "name": "Elephant",
      "stats": "9 HP, 16 STR, 6 DEX, tusks (d10)",
      "description": "- Large tusked animals that dwell near hot forests.   Found both alone and in herds.\n- With enough open ground for a clear run, it will charge its victims, enhancing damage.\n- Its tusks can be sold for high amounts of gold if removed whole."
    },
    {
      "name": "Bear, Cave",
      "stats": "8 HP, 17 STR, 13 DEX, 8 WIL, claws (d10+d10), bite (d12)",
      "description": "- Ferocious, 15\u2019 tall carnivorous bears. Make their dens in caves. \n- Excellent trackers despite their poor eyesight, relying on their keen their sense of smell.\n- **Hug**: On **Critical Damage**, the target loses an additional d6 damage as they are squeezed into a pulp."
    },
    {
      "name": "Dog, War",
      "stats": "6 HP, 1 Armor, 13 STR, bite (d10)",
      "description": "- Large breeds selected by their bulk and strength.\n- Not scared by noise or battle.\n- Trained to fight until death if not ordered to stop."
    },
    {
      "name": "Triton",
      "stats": "6 HP, 12 STR, 12 DEX, 12 WIL, trident (d8)",
      "description": "- Aquatic humanoids with silvery skin, blue-green hair, and scaled legs ending in fins. Dwell in warm waters both at shallows and at great depths.\n- Extremely proud, consider themselves a better version of any other folk, going through great efforts to prove so.\n- Lair in beautiful castles sculpted from sea rocks and corals, guarded by other sea creatures under their command."
    },
    {
      "name": "Giant\u00a0Draco",
      "stats": "6 HP, 14 STR, 14 DEX, bite (d10)",
      "description": "- 6' long carnivorous lizards with skin flaps between legs that allow gliding.\n- Dwell mostly on the surface, but sometimes can be found underground.\n- Hunt by waiting atop tall places and gliding down to surprise targets."
    },
    {
      "name": "Nightmare",
      "stats": "8 HP, 15 STR, 12 DEX, 18 WIL, flaming hooves (d8+d6)",
      "description": "- Intelligent demonic horses with burning-red eyes, smoldering nostrils, and flaming hooves.\n- Constantly breathe a thick cloud of smoke, impairing damage dealt by anyone in melee with the nightmare.\n- Sometimes are used as steeds by other powerful demonic creatures."
    },
    {
      "name": "Purple Worm",
      "stats": "18 HP, 1 Armor, 18 STR, 8 DEX, 6 WIL, bite (d10+d10), _detachment_",
      "description": "- Gargantuan worms with bodies more than 100' long and 10' thick. Burrow in tunnels underground and surface to eat other creatures. Found in deserts and other drylands.\n- Victims that save against Critical Damage caused by the worm are swallowed whole. Anything inside the worm receives d12 acid damage each round.\n- **Critical Damage**: The target is devoured and crushed inside the worm."
    },
    {
      "name": "Elemental, Earth",
      "stats": "12 HP, 3 Armor, 16 STR, 6 DEX, fists (d12)",
      "description": "- Huge humanoid beings made of earth and stone.\n- Create constant earth tremors with their presence.\n- Can meld into the earth and move through it as if swimming."
    },
    {
      "name": "The Blue Dragon",
      "stats": "14 HP, 2 Armor, 14 STR, 16 DEX, 15 WIL, bite (d10), claws (d8+d8, blast), __detachment__",
      "description": "- A 100 ft long, centipede-like reptilian creature that dwells in deserts and rocky drylands, specially amidst sandstorms. Proud and vain, often keep victims as slaves. The more prestigious the person, the more the dragon would be interested in keeping it.\n- Builds it's lairs by tunneling deep into the earth, and use said tunnels to ambush nearby travelers walking on the surface. \n- **Thunder Clap**: The dragon releases the lightning coalesced in its mouth and claws in a large explosion centered on itself, dealing d12 blast damage and knocking prone any target hit. It needs a short rest before being able to do this again."
    },
    {
      "name": "Devil Swine",
      "stats": "9 HP, 16 STR, 8 DEX, gore (d6+d6)",
      "description": "- Corpulent humans who can change into massive swine. Lurk in isolated human settlements, hunting the people to eat their flesh.\n- Can only shape change at night, hunt in the dark, surprising victims.\n- **Critical Damage**: A human victim gets infected, becoming a lycanthrope of the same type after a couple of weeks."
    },
    {
      "name": "Dog, Hunting",
      "stats": "3 HP, 12 DEX, bite (d6)",
      "description": "- Bulky, domestic breeds with a ferocious nature.\n- Track by scent. Once started, very difficult to put off the trail.\n- Only attack at their owner\u2019s command."
    },
    {
      "name": "Dragon Turtle",
      "stats": "15 HP, 3 Armor, 18 STR, 6 DEX, 12 WIL, bite (d12+d12), _detachment_",
      "description": "- Gargantuan sea monsters with the shell of a turtle and draconic features. Lurk in deep oceans and can be mistaken for a small island when on the surface.\n- Attack ships, sinking them to add any treasure to their massive underwater hoards.\n- Breathes massive clouds of steam, clogging visions and damaging all inside for d10 damage."
    },
    {
      "name": "Vampire",
      "stats": "12 HP, 1 Armor, 14 STR, 12 DEX, 16 WIL, bite (d10)",
      "description": "- Charming, undead creatures that drink the blood of mortals. Act at night and sleep in a coffin during the day. Can change its form to the one of a bat.\n- **Regeneration**: A damaged vampire regains 6 HP when it bites a target that has blood. If killed, it becomes a cloud of gas and retreats to its coffin, reforming at the next nightfall. Can only be killed if exposed to sunlight or if the coffin is destroyed.\n- **Critical Damage**: The vampire drains the targets's essence, dealing d12 damage to WIL. If the target reaches 0 WIL this way, it dies and is raised as a thrall of the vampire"
    },
    {
      "name": "Lizard Man",
      "stats": "5 HP, 1 Armor, 14 STR, 12 DEX, bone spear (d8)",
      "description": "- Tribal amphibian humanoids with reptilian heads and tails. Dwell in jungles nearby large bodies of water.\n- Craft their armor and weapons from the bones of their prey.\n- Carnivorous, eat even the flesh of other humanoids as a display of power."
    },
    {
      "name": "Gnome",
      "stats": "4 HP, 8 STR, 12 DEX, 14 WIL, crossbow (d8, bulky)",
      "description": "- Short humanoids with long noses and ears.   Live underground or deep in forests.\n- Intelligent tinkers, love messing with any kind of mechanism. Can easily be convinced by the promise of something novel or uncommon.\n- Can understand and communicate with small mammals like moles or squirrels."
    },
    {
      "name": "Warper",
      "stats": "8 HP, 14 DEX, 12 WILL, tentacles (d8, blast)",
      "description": "- Large panther like predators with many edged tentacles growing out of their backs.\n- Can teleport short distances at will, which it uses to ambush prey.\n- Highly resistant to magical effects."
    },
    {
      "name": "Storm Giant",
      "stats": "18 HP, 2 Armor, 18 STR, 16 DEX, 18 WIL, greatsword (d12+d10), _detachment_",
      "description": "- 25\u2019 tall humanoids with bronze-hued skin and light-colored hair. Live in mountain peaks and sometimes rocky coastlines.\n- Unharmed by lightning, can summon storm clouds at their will.\n- Able to fly along the winds at a slower pace.\n- **Lightning Bolt**: The giant crashes a powerful lightining at a point within its reach, dealing d12 blast damage that ignores armor. It needs a short rest before being able to do it again."
    },
    {
      "name": "Giant Phase Spider",
      "stats": "6 HP, 14 DEX, 12 WIL, bite (d6)",
      "description": "- 8\u2019 long, black spiders that have the ability to become intangible. Dwell in web-filled lairs and sometimes prey on humans.\n- Can freely shift in and out of existence. When threatened, phases out and only phases in for a seceond when it attacks. \n- **Critical Damage**: The poison kills the target in a day if not treated."
    },
    {
      "name": "Metallic Dragon",
      "stats": "15 HP, 3 Armor, 18 STR, 13 DEX, 16 WIL, bite (d12+d10), _detachment_",
      "description": "- Majestic draconic beings with shiny metallic scales. Said to be created by a Red Dragon embraced by divine power. Feed on precious metals like gold, silver or copper, with its scales matching the metal it has eaten the most.\n- Master shapechangers, can take the form of any humanoid or animal.\n- **Gas Cloud**: Breathes a thick cloud of white hot smoke, dealing d12 damage to all caught and leaving them drowsy and slowed. It needs a short rest before being able to do this again."
    },
    {
      "name": "Killer Bees",
      "stats": "6 HP, 6 STR, 14 DEX, 8 WIL, sting (d6), _detachment_",
      "description": "- Oversized bees that build underground hives. Hyper aggressive, attack anything that comes near.\n- Produce special honey that can heal d6 HP once per day if consumed.\n- When the bees cause STR damage, the sting is lodged into the target, dealing d4 damage each round until removed."
    },
    {
      "name": "Giant Flame Lizard",
      "stats": "8 HP, 14 STR, 12 WIL, bite (d8+d6) or fire breath (d6,blast)",
      "description": "- 30' long grey and red lizards that are sometimes mistaken by dragons. \n- Lair underground where they sleep most of the day, but hunt on the surface.\n- Unharmed by flames and heat.\n- Their eggs can be sold for a high price."
    },
    {
      "name": "Manticore",
      "stats": "6 HP, 15 DEX, 12 WIL, claws (d4+d4) or tail spike (d6)",
      "description": "- Monstrosities with a human face, a lion body, bat wings, and a spiked tail. Dwell in mountainous regions.\n- Prey on humans, following them and attacking with the spikes when they see an opening.\n- Attack with their tails by throwing the spikes like darts. The spikes regrow after a few days."
    },
    {
      "name": "Bear, Polar",
      "stats": "7 HP, 16 STR, 12 DEX, 6 WIL, claws (d8+d8), bite (d10)",
      "description": "- 11\u2019 tall white-furred bears who live in cold regions, subsisting mostly from fish.\n- Excellent swimmers that also move effortlessly through both snow and ice."
    },
    {
      "name": "Snake Person",
      "stats": "6 HP, 1 Armor, 12 DEX, 14 WIL, bite (d6)",
      "description": "- Creatures with the body, tail, and head of a giant snake and scaled humanoid torso and arms. Capture other humanoids to be eaten or enslaved by their cruel masters. Dwell in hot jungles.\n- Highly resistant to magic effects.\n- Supposedly can breed with humans, creating hybrids that have the appearance of humans with reptilian eyes and forked tongues."
    },
    {
      "name": "Medusa",
      "stats": "10 HP, 8 STR, 12 DEX, 16 WIL, snake bites (d6+d4) or gaze (save)",
      "description": "- Magical creatures that look like women with snakes in place of hair.\n- Clever and proud, but reasonable. Will let adventurers go free if they somehow please its ego.\n- **Gaze**: Anyone who looks directly at the medusa's face must save WIL or be turned to stone. Averting eyes from the face prevents this effect, but impairs any damage dealt.\n- Targets turned into stone can be recovered by a willing kiss of the medusa, or by being bathed in its blood. The blood of a medusa is only enough to recover a single victim."
    },
    {
      "name": "Goblin",
      "stats": "4 HP, 8 STR, 12 DEX, 8 WIL, dagger (d6) or sling (d4)",
      "description": "- Small, grotesque humanoids with skin in earthly tones of green, brown, and grey.\n- Avoid combat, only attacking when in advantage, using hit-and-run tactics.\n- Sometimes are found using dire wolves as mounts."
    },
    {
      "name": "Ghoul",
      "stats": "6 HP, 14 STR, 3 WIL, elongated claws jagged teeth (d8+d6)",
      "description": "- Grey-skinned man-things wearing shredded clothes, hunkering over the ground.\n- Craves the flesh of the living, as it grows only more powerful with each victim.\n- **Critical Damage**: target is paralyzed. The wound turns fatal in a day if not treated by a priest or skilled healer. If not burned, the body will rise as a Ghoul."
    },
    {
      "name": "Gargoyle",
      "stats": "8 HP, 3 Armor, 14 STR, 6 DEX, 12 WIL, claws (d8+d6)",
      "description": "- Magical creatures that look like monstrous, horned, winged statues.\n- Guard places by standing still to pass like inanimate statues and attacking what comes near.\n- Cannot be charmed and put to sleep."
    },
    {
      "name": "Rust Eater",
      "stats": "5 HP, 12 DEX, 12 WIL, bite (d6)",
      "description": "- Armadillo-like creatures with long tails and two long antennae. Feed on rusted metal.\n- Any metal that touches its antennae instantly becomes rust. Relics are partially resistant to this effect.\n- Can smell metal from a long distance."
    },
    {
      "name": "Wyvern",
      "stats": "7 HP, 14 DEX, bite (d8+d8) or poisonous sting (d6)",
      "description": "- Winged, two-legged, reptilian monsters with a long tail tipped with a venomous sting. Dwell in any terrain, but favor dry cliffs.\n- Shy away from other creatures, but attacks anything that comes in the victiny of its nest.\n- **Critical Damage**: The deadly poison permanently debilitates the target, reducing its maximum STR to the current value."
    },
    {
      "name": "Beetle, Fire",
      "stats": "2 HP, 4 STR, 12 DEX, 6 WIL, bite(d4)",
      "description": "- 3\u2019 long beetles commonly found both deep underground and buried in thick brambles. \n- Produces a orange slime through the abdomen that lasts for several days. The productive organ is very valuable alchemists."
    },
    {
      "name": "Giant Mantis",
      "stats": "10 HP, 1 Armor, 14 DEX, 12 WIL, claws (d8+d6)",
      "description": "- 10' long insects with clawed forelimbs and slicing mandibles. Dwell in warm forests and jungles.\n- Hunt any prey, using their green coloration to camouflage in the foliage. Will not attack obviously stronger foes.\n- **Critical Damage**: Locks the victim in their claws, and bites their head off."
    },
    {
      "name": "Eye of Terror",
      "stats": "15 HP, 8 DEX, 18 WIL, bite (d8+d8)",
      "description": "- Floating spheres with a large maw, one big central eye, and several small eyes on stalks scattered through the body.   Scheming and greedy, lair deep underground.\n- Cancels any magic effect in a nearby range facing its central eye.\n- The eyestalks cast one of those spells each round randomly: (1-Charm, 2-Phobia, 3-Telekinesis, 4-Sleep, 5-Shuffle, 6-Vision)."
    },
    {
      "name": "Elemental, Air",
      "stats": "16 HP, 11 STR, 15 DEX, 8 WIL, wind blow (d10)",
      "description": "- Huge, living vortexes of whirling air.\n- Lighter creatures are swept away by its presence.\n- It's attacks ignore any worn armor."
    },
    {
      "name": "Shambling Mound",
      "stats": "9 HP, 15 STR, 6 DEX, 8 WIL, tendrils (d8+d8)",
      "description": "- Plant monsters with the rough shape of a 9' tall humanoid made of slimy vegetation. Dwell in dark swamps and damp undergrounds.\n- Damage received from weapons is _impaired_.\n- Grapples its targets and tries to drow them in water bodies."
    },
    {
      "name": "Zombie",
      "stats": "6 HP, 6 DEX, 3 WIL, rusted weapon (d6)",
      "description": "- Slow, mindless re-animated corpses. Created by wicked wizards to serve as guardians in hordes.\n- Simply attacks anything that comes nearby.\n- Cannot be affected by anything that targets the mind."
    },
    {
      "name": "Demonic Knight",
      "stats": "12 HP, 3 Armor, 16 STR, 8 DEX, 12 WIL, longsword (d10)",
      "description": "- Once holy warriors who fell to the temptation of dark powers that they now serve in undeath. Rides nightmarish steeds into battle.\n- Lesser undead creatures mindlessly follow their command.\n- Their evil aura frightens anyone who comes into melee range.\n- **Critical Damage**: Everyone who sees the knight landing the blow is driven into bloodthirsty hatred."
    },
    {
      "name": "Centaur",
      "stats": "6 HP, 1 Armor, 14 STR, 12 DEX, spear (d8) or short bow (d6)",
      "description": "- Creatures with the lower body and legs of a horse and the upper body, arms and head of a humanoid.\n- Uses their great speed to hunt for food in the forest and plains."
    },
    {
      "name": "Mummy",
      "stats": "6 HP, 12 STR, 8 DEX, 6 WIL, infected touch (d10)",
      "description": "- Undead humanoids wrapped in funerary bandages. Found in ruins of temples and tombs.\n- The first time anyone sees the mummy, it must save WIL or be paralyzed. The paralysis ends immediately if the mummy attacks or goes out of sight.\n- **Critical Damage**: The mummy inflicts a disease that rots open wounds, making them impossible to heal normally. Can only be removed by magic."
    },
    {
      "name": "Golem, Original",
      "stats": "16 HP, 2 Armor, 15 STR, 6 DEX, 2 WIL, cobblestone fists (d10)",
      "description": "- A hulking 9\u2019 tall statue made of clay, mud, and prayer.\n- Mindlessly follows whatever commands given by its master, even after their death.\n- Immune to mundane blades and missile weapons. Damage from fire is __enhanced__.\n- If destroyed, the Golem eventually reforms and carries out its previous orders."
    },
    {
      "name": "False Dragon",
      "stats": "4 HP, 8 STR, 14 DEX, 12 WIL, sting (d6)",
      "description": "- Tiny winged draconic creatures with a sting-tipped tail and reddish scales. Found in forests and caverns.\n- Capable of communicating telepathically with nearby creatures.\n- **Critical Damage**: The sting's poison leaves the victim in a comatose state for 1d6 days."
    },
    {
      "name": "Gnoll",
      "stats": "6 HP, 1 Armor, 12 STR, 8 WIL, spear (d8) or short bow (d6)",
      "description": "- Ferocious humanoid hyenas.   Legend says they were created in a wizard\u2019s experiments.\n- Attack in packs, intimidating its victims with numbers.\n- **Critical Damage**: the gnoll enters in a rampage after tasting blood, making another attack immediately."
    },
    {
      "name": "Chimera",
      "stats": "10 HP, 14 STR, bite and gore (d10+d10), fire breath (d12, _blast_)",
      "description": "- A three-headed flying aberration.A hybrid of lion, goat, and dragon.\n- Created through powerful magic, these creatures are can be bound to a master or roaming free."
    },
    {
      "name": "Lich",
      "stats": "18 HP, 1 Armor, 18 WIL, soul dagger (d8)",
      "description": "- Powerful wizards who refused death by turning themselves in soulless undead.\n- Able to cast virtually any spell without suffering consequences. Carries 2d6 random spellbooks with them.\n- **Critical Damage**: The target is paralyzed until it fully rests."
    },
    {
      "name": "Giant Scorpion",
      "stats": "8 HP, 2 Armor, 12 DEX, 8 MIND, claws (d10+d8) or sting (d8)",
      "description": "- Huge arachnids, the size of a horse, with pincers and poisonous stingers. Found in drylands and caverns. Highly aggressive, normally attack on sight.\n- Immobilizes its victims with the claws, and then attack with the sting.\n- **Critical Damage**: The sting\u2019s poison paralyzes  the target, killing it in one day if not treated."
    },
    {
      "name": "Ape, White",
      "stats": "5 HP, 14 STR, claws (d6+d6), rocks (d6, _blast_)",
      "description": "- Albino gorillas with nocturnal habits.\n- Defend their territory with threating gestures, followed by sudden violence."
    },
    {
      "name": "Dog, Wild",
      "stats": "3 HP, 12 DEX, bite (d6)",
      "description": "- Wild dogs that roam in forests in large packs.\n- A Wild dog automatically succeeds Morale saves while among its pack."
    },
    {
      "name": "Brigand",
      "stats": "4 HP, 1 Armor, 12 STR, 12 DEX, 9 WIL, shortsword (d6) or short bow (d6)",
      "description": "- Outlaws and mercenaries who raid settlements and ambush travelers. Travel in large groups of at least one _detachment_.\n- A detachment always travels with one leader wearing chainmail or similar (2 Armor) and a longsword (d8) or crossbow (d8).\n- When testing Morale, save using the leader's WIL (13). If the leader dies, the Brigands will flee."
    },
    {
      "name": "Dwarf",
      "stats": "4 HP, 2 Armor, 14 STR, hammer (d8)",
      "description": "- Short, bulky, humanoids with tough skin like earth and stone. Dwell in mountains and underground.\n- Do not rely on light, being able to see shapes and heat patterns in darkness.\n- Highly resistant to poison and disease."
    },
    {
      "name": "Satyr",
      "stats": "6 HP, 12 DEX, 16 WIL, horns (d6) or pipes (save)",
      "description": "- Magical humanoids with the legs and horns of a goat that love to dance and drink. Found in deep forests.\n- Highly resistant to magic effects.\n- **Pipes**: Anyone who hears the music from a satyr's pipes must save WIL or fall asleep, be charmed or frightened. The Satyr chooses which effect when playing the pipes."
    },
    {
      "name": "Bear, Grizzly",
      "stats": "6 HP, 15 STR, 13 DEX, 5 WIL, claws (d8+d8), bite (d10)",
      "description": "- Aggressive, 9\u2019 tall reddish-brown bears found in mountains, woodlands, and prairies. \n- They prefer to eat fish and meat, and are not opposed to attacking the rare unfortunate to cross their path."
    },
    {
      "name": "Mind Lasher",
      "stats": "12 HP, 8 STR, 12 DEX, 18 WIL, tentacles (d6+d4), or mind blast (save)",
      "description": "- Humanoid creatures with purple skin and an octopus-like head. Dwell deep underground, plotting to slave humanity. Feed on the brains of other humanoids.\n- **Mind Blast**: Emits a frequency that affects the brains of nearby creatures, all caught must save WIL or be paralyzed.\n- **Critical Damage**: The tentacle rips the victim's brain out of the skull, and the mind lasher eats it, gaining all of the victim's memories."
    },
    {
      "name": "Snake, Pit Viper",
      "stats": "3 HP, 12 DEX, bite (d6)",
      "description": "- 5' long snakes with greyish scales, found in caves and other dark places.\n- Does not rely on vision, instead, senses its victims by their body heat.\n- **Critical Damage**: The poison kills the target in a day if a antidote isn't applied."
    },
    {
      "name": "Dire Wolf",
      "stats": "8 HP, 14 STR, 12 DEX, bite (d10)",
      "description": "- Horse-sized, semi-intelligent wolves. Highly territorial, live in forests or mountains and ferouciously guard its surroudings.\n- Regular wolves are scared of them, but will fight alongside them against invaders.\n- Can be trained like dogs if captured young, but it's a extremely difficult challenging."
    },
    {
      "name": "Bugbear",
      "stats": "4 HP, 1 Armor, 14 STR, 12 DEX, 11 WIL, club (d8, bulky)",
      "description": "- Large, goblinoids covered in animal-like hair.\n- Prefers stealth and trickery to gain an advantage."
    },
    {
      "name": "Flesh Construct",
      "stats": "9 HP, 1 Armor, 15 STR, 8 DEX, 8 WIL, fists (d10+d10)",
      "description": "- 7\u2019 tall bloated humanoid abominations made of flesh stitched together.\n- Mundane attacks, fire, and cold attacks are _impaired_ against it.\n- **Absorb Lightning**: If the construct is ever hit by electricty, it fully recovers oth HP and STR, and its next attacks are _enhanced_."
    },
    {
      "name": "Titan",
      "stats": "18 HP, 2 Armor, 16 STR, 12 DEX, 18 WIL, sword (d12+d10)",
      "description": "- 20\u2019 tall humanoids of radiant beauty and athletic build. Beneficent of character, but prone to megalomania. Natives of other planes, but sometimes have strongholds in the mortal world.\n- Can levitate at will, with precise control of its movement.\n- Masters of spellcasting, carry 2d6 spellbooks and can always enchance spell effects without risk or need to prepare for it."
    },
    {
      "name": "Aranea",
      "stats": "6 HP, 12 DEX, 15 WIL, bite (d6), two random spellbooks",
      "description": "- 6\u2019 long, intelligent spiders of greenish-black coloration. Have an odd lump on the back, housing its large brain. Two front legs have digits, allowing an aranea to grasp tools. Dwell in web-filled lairs where they conduct magical research.\n- Scared of fire, avoid spells of such effect.\n- Creatures caught in its webs are entangled and unable to move. Breaking free requires an STR save."
    },
    {
      "name": "The Green Dragon",
      "stats": "12 HP, 2 Armor, 14 STR, 15 DEX, 18 WIL, bite (d12), venom spit (d8, blast), __detachment__",
      "description": "- 50 ft long serpentine creature with spiked scales. Dwell in dense forests, staying atop the trees to attack it's victims from above. \n- Trick victims to obey it's commands in exchange for their lives, only to devour them anyway when they're no longer useful.  \n- **Critical Damage**: The poison takes hold of the victim's body, killing it if an antidote isn't applied within one day."
    },
    {
      "name": "Gelatinous Cube",
      "stats": "8 HP, 15 STR, 6 DEX, 3 WIL, devouring touch (d8)",
      "description": "- Large cubes of transparent jelly, dwell in dungeons absorbing items and living creatures.\n- Difficult to be detected due to being transparent.\n- **Critical Damage**: The target is engulfed into the cube and keeps being absorbed."
    },
    {
      "name": "Black Pudding",
      "stats": "12 HP, 11 STR, 5 DEX, 3 WIL, devouring touch (d8)",
      "description": "- Giant, brainless blobs of black jelly driven only by their insatiable hunger.\n- Moves along walls and across ceilings. Squeeze through holes and cracks with ease.\n- Immune to mundane attacks, save fire. Normal attacks splits the Black Pudding. creating two Puddings that share HP and STR.   \n- **Dissolve**: On **Critical Damage**, armored targets lose 1 Armor point. STR loss to unarmored targets is _permanent_."
    },
    {
      "name": "Cat, Sabre-Toothed Tiger",
      "stats": "8 HP, STR 15, 14 DEX, 3 WIL, bite (d12), claws (d6+d6)",
      "description": "- Huge, primeval cats with enormous fangs.\n- Extremely rare, generally found in regions untouched by civilization."
    },
    {
      "name": "Cat, Tiger",
      "stats": "6 HP, 14 STR, 14 DEX, 6 WIL, bite (d8), claws (d6+d6)",
      "description": "- Striped, solitary felines. Lives in woodlands and in colder regions.\n- Uses camouflage and stealth to hunt and surprise their victims."
    },
    {
      "name": "Fire Giant",
      "stats": "13 HP, 3 Armor, 17 STR, 8 DEX, greatsword (d12+d10)",
      "description": "- 16\u2019 tall humanoids with red hair and charcoal skin. Wear heavy armor made of brass, bronze or copper. Lair in fortresses built near volcanoes.\n- Masters of craft and war, know how to forge the finest weaponry.\n- Immune to fire and heat."
    },
    {
      "name": "Invisible Stalker",
      "stats": "8 HP, 12 STR, 12 DEX, 15 WIL, unarmed blows (d6+d4)",
      "description": "- Intelligent beings coalesced from arcane energies into a humanoid shape. Summoned by powerful wizards to perform tasks for them.\n- Completely invisible and silent, detecting it is virtually impossible.\n- If killed, the energies disperse and can later be reformed by its summoner."
    },
    {
      "name": "Wolf",
      "stats": "6 HP, 12 STR, 14 DEX, bite (d8)",
      "description": "- Large canines that dwell primarily in wildlands, but occasionally lair in caves.\n- Can be trained like dogs if captured young.\n- When found in packs of at least 4, wolfs never fail morale saves."
    },
    {
      "name": "Cockatrice",
      "stats": "5 HP, 8 STR, 14 DEX, beak (d6)",
      "description": "- Small creatures resembling chickens with reptilian features.\n- Notably agile and hard to pin down, their greatest enemy is the weasel.\n- **Critical Damage**: the victim is turned to stone until the Cockatrice is killed."
    },
    {
      "name": "Buccaneer",
      "stats": "4 HP, 11 STR, 14 DEX, 12 WIL, scimitar (d6)",
      "description": "- Outlaw sailors who raid coastal settlements, as well as other ships.\n- Travel in large ship crews, only fighting in clear advantage (generally numerical)."
    },
    {
      "name": "Cave Locust",
      "stats": "2 HP, 6 STR, 12 DEX, 6 WIL, bite (d4)",
      "description": "- Giant, herbivorous crickets that dwell in caves. Blends into stone due to their natural coloration.\n- Emits loud shrieks when threatened that can be heard from very far away.\n- Immune to most types of poison."
    },
    {
      "name": "Harpy",
      "stats": "8 HP, 12 DEX, 14 WIL, claws (d6+d6) or song (save)",
      "description": "- Hideous monstrosities with the body of a giant eagle and a humanoid head.\n- Its movements and flight are clumsy due to its unproportional size. Rely on charmed victims to do anything of note. \n- **Charming Song**: Anyone who hears the song of a harpy must save WIL or be charmed, following the harpy and defending it from any threat. The charm is broken when the victim leaves the harpy's presence."
    },
    {
      "name": "Snake, Spitting Cobra",
      "stats": "3 HP, 14 DEX, acid spit (d6)",
      "description": "- 3' long snake with grey and white scales. Notably shy, live in places where they can blend in.\n- Attack from distance with their acidic spit, always aiming for the head of the target.\n- **Critical Damage**: The acid corrodes the target's face, permantly damaging its visage and senses."
    },
    {
      "name": "Foxwoman",
      "stats": "6 HP, 12 STR, 14 DEX, 11 WIL, teeth (d6), claws (d8+d8)",
      "description": "- Appears as a 7-foot tall with a human woman with the head of a fox.\n- Transforms into a fox at will."
    },
    {
      "name": "Troll",
      "stats": "6 HP, 1 Armor, 14 STR, 12 DEX, talons and bite (d10+d6)",
      "description": "- Wicked, 8\u2019 tall humanoids with rubbery bodies. Consume the flesh of other humanoids. Dwell underground, in the barren wilderness, and in the ruined homes of former victims.\n- Fire and acid damage received is _enhanced_, and stops a troll's regeneration. When attacked with either of those, the troll fails all morale checks.\n- Regains 3 HP per round, and even severed limbs are reattached. If killed, will regenerate and fight again in an hour."
    },
    {
      "name": "Draugr",
      "stats": "12 HP, 2 Armor, 15 STR, 9 DEX, 13 WIL, rusty broadsword (d8)",
      "description": "- Undead horror made of withered flesh. Rises from those killed in battle and left to rot.\n- **Critical Damage**: target is instantly killed, only to rise later as a Thrall."
    },
    {
      "name": "Centipede, Giant",
      "stats": "1 HP, 6 STR, 3 WIL, sting (d6)",
      "description": "- 2\u2019 long centipedes that live in damp, underground places.\n- Generally shy, but will attack if approached. \n- **Critical Damage**: the venom renders the target _deprived_ for up to 10 days (save STR once a day to recover)."
    },
    {
      "name": "Gorilla",
      "stats": "6 HP, 14 STR, fists (d6+d6)",
      "description": "- Large, muscular apes that dwell in hot jungles.\n- Mostly peaceful until provoked, but will impose itself on the presence of its young.\n- **Critical Damage**: Rends the victim for 1d4 extra STR damage."
    },
    {
      "name": "Green Slime",
      "stats": "3 HP, 18 STR, 6 DEX, 3 WIL, acidic touch (d10+d8)",
      "description": "- Large blobs of green slime that stick to walls and ceiling. Attack by dropping on top of their victims.\n- The acid corrodes both metal and wood along with the carrier, but cannot affect stone. Consumed flesh becomes more green slime.\n- Immune to all damage except fire. Once stuck on a victim, can only be removed if burned away."
    },
    {
      "name": "Boggart",
      "stats": "3 HP, 4 STR, 17 DEX, 13 WIL",
      "description": "- A wild, hairy trickster that takes pleasure in being a minor nuisance.\n- Prizes relics and shiny trinkets above all else but unwilling to trade for coin.\n- Boggarts have names that describe their true nature. Knowing their true name allows one to control a Boggart."
    },
    {
      "name": "Griffon",
      "stats": "7 HP, 14 STR, 15 DEX, beak (d8+d8) or claws (d6, blast)",
      "description": "- Ravenous hybrid predators, with the head and wings of an eagle and the lower body of a lion.\n- Fly and attack at astonishing speeds, being able to dive for an attack and fly away before the target can react.\n- Can be used as a mount if taken young and properly trained."
    },
    {
      "name": "Estrie",
      "stats": "10 HP, 11 STR, 15 DEX, 14 WIL, draining hair (1d8)",
      "description": "- Appears as a woman with long dark hair that extends all the way to her feet.\n- Can transform into owls, but only at night. Their shriek is ear-piercing.\n- Drinking blood gives them power, but they can obtain sustenance from eating bread and salt if taken from those they have wronged.\n- Binding their hair prevents their transformation. They can be killed, but their head must then be buried, the mouth stuffed with dirt.\n- **Critical Damage**: target falls unconscious for 1d4 days."
    },
    {
      "name": "Stone Giant",
      "stats": "12 HP, 2 Armor, 15 STR, 15 DEX, stone club (d8+d8) or rocks (d12)",
      "description": "- 14\u2019 tall slender humanoids with stone-like gray skin.   Dwell in caverns or build homes of stone in valleys.\n- Preffer attacking by throwing rocks from far away, only fighting on melee if cornered.\n- Can easily camouflage into stone, hiding to avoid direct confrontation."
    },
    {
      "name": "Ankheg",
      "stats": "7 HP, 1 Armor, 16 STR, 8 WIL, bite (d10), acid squirt (d8, _blast_)",
      "description": "- Huge insectoids with multiple legs and shiny black eyes. Subsists from dirt, roots, and flesh.\n- Burrows just beneath the surfaces to ambush unsuspecting creatures."
    },
    {
      "name": "Giant Octopus",
      "stats": "8 HP, 14 STR, 8 WIL, tentacles (d6, blast)",
      "description": "- Large, eight-armed saltwater creatures. Dwell nearby warm coasts.\n- Can attack up to 8 nearby creatures.\n- When threatened, spills a thick cloud of ink and quickly swims away."
    },
    {
      "name": "Cat, Lion",
      "stats": "5 HP, 12 STR, 12 DEX, 11 WIL, bite (d10), claws (d6+d6)",
      "description": "- Hunts in a pride of at least 4. Lives in the savannahs or other similarly dry lands.\n- Carnivorous. Only hunts humans if desperatly hungry or in clear advantage.\n- **Blood-sense**: Can follow bleeding prey over great distances."
    },
    {
      "name": "Bear, Black",
      "stats": "6 HP, 14 STR, 12 DEX, 6 WIL, claws (d6+d6), bite (d8)",
      "description": "- 4' tall bears (twice that much if standing) that subsist mostly on berries and roots. Drawn to campsites in search of food.  \n- Aggressive if cornered or feel that their young are threatened."
    },
    {
      "name": "Driver Ant",
      "stats": "3 HP, 12 DEX, bite (d6)",
      "description": "- Giant, omnivorous black ants that build their colonies deep underground.\n- When hungry, they will consume anything in their path.\n- Once in melee combat, it will not stop attacking its victim until dead."
    },
    {
      "name": "Berserker",
      "stats": "10 HP, 1 Armor, 14 STR, 13 DEX, 15 WIL, twin axes (d8+d8)",
      "description": "- Ruthless warriors that derive their power from the skins they wear: bears, wolves, boards, etc.\n- Ignores the **Morale** rule and is never treated as part of a _detachment_.\n- **Rage**: The Berserker enters a state of pure fury, their attacks gaining the __enhanced__ and _blast_ quality until they take STR damage."
    },
    {
      "name": "Unicorn",
      "stats": "6 HP, 12 DEX, 14 WIL, horn (d10, ignores armor)",
      "description": "- Magical horses with a single long horn on its foreheade. Timid, but proud and wilful, are seen as divine beings.\n- Its hairs are worth small fortunes due to its powerful healing properties.\n- Can teleport to any place in its sight once a day."
    },
    {
      "name": "Giant Weasel",
      "stats": "6 HP, 15 STR, 14 DEX, bite and claws (d12+d10)",
      "description": "- 6\u2019 long, predatory mammals with rich fur of brown, gold, or white. Dwell in subterranean tunnels, hunting alone or in small groups.\n- Vicious trackers, can smell blood at long distances. Prefer to stalk targets that are already wounded to finish them off.\n- After attacking, locks its powerful jaws on the target and keeps biting, only releasing if its sure the victim is dead."
    },
    {
      "name": "Red Cap",
      "stats": "6 HP, 12 DEX, 8 WIL, two sickles (d6+d6)",
      "description": "- Borne from blood left to rot in the fae. Hats colored by blood; they even bathe in blood.\n- Attack travelers, but will ignore those with little to live for, as there is no pleasure in it.\n- **Critical Damage**: eviscerate the target, showering in blood, restoring any lost STR & HP."
    },
    {
      "name": "Camel",
      "stats": "3 HP, 12 STR, 13 DEX, 4 WIL, bite (d6)",
      "description": "- Beasts of burden native to dry, arid lands.\n- Can survive without water for weeks at a time.\n- Moves through sand and broken ground without difficulty."
    },
    {
      "name": "Giant Hawk",
      "stats": "10 HP, 8 STR, 15 DEX, 8 WIL, talons and beak (d8+d6)",
      "description": "- Large birds of prey, the size of a wolf. Can carry animals up to their size.\n- Hunt animals that they can carry, but might attack humans or greater prey if despaired.\n- Surprise their victims by diving to attack from a great height.\n- Can supposedly be trained to be hunting companions."
    },
    {
      "name": "Phoenix",
      "stats": "18 HP, 12 STR, 18 DEX, 18 WIL, talons (d12+d10)",
      "description": "- Giant eagle-like birds made of pure flame, found in isolated regions and only attack in self-defense.\n- Posesses simple intelligence and watches travellers carefully to judge if they are a threat.\n- Its feathers are capable to heal any disease, but cannot be taken, only given by the phoenix.\n- Unharmed by fire and heat. Emits an aura of fire that does d8 damage to anyone that comes nearby.\n- If killed, disappears into a small sphere of flames. After a turn, it is reborn from its ashes and flees."
    },
    {
      "name": "Giant Crocodile",
      "stats": "15 HP, 3 Armor, 16 STR, 6 DEX, 5 WIL, bite (d12), _detachment_",
      "description": "- 60\u2019 long, extremely rare reptiles found on unexplored fluvial regions.\n- Attracted to the scent of blood or movement in the water.\n- Their crushing bite can tear ships (or armor) apart with ease."
    },
    {
      "name": "Crypt Guardian",
      "stats": "12 HP, 12 STR, 11 DEX, 14 WIL, ethereal claws (d8)",
      "description": "- An animated skeleton clothed in billowing robes. Its eye sockets are hypnotically red. Defends crypts & tombs, and will not attack if left undisturbed.\n- Non-magical attacks against it are _impaired_.\n- Can teleport any target in eyesight to a random room nearby."
    },
    {
      "name": "Shadow",
      "stats": "6 HP, 8 STR, 14 WIL, draining touch (d6, ignores armor)",
      "description": "- Incorporeal monsters that look like animated shadows.\n- Unharmed by mundane attacks, sleep or mind control.\n- **Critical Damage**: The target loses another d4 STR, if reduced to 0 STR, they become a shadow."
    },
    {
      "name": "Halfling",
      "stats": "4 HP, 8 STR, 14 DEX, 14 WIL, shortswords (d6+d6)",
      "description": "- Small humanoids with hairy feet live in small settlements called shires.\n- Highly resistant to fear effects.\n- Each shire is led by a stronger halfling called shire-riff, who has access to better equipment."
    },
    {
      "name": "Catoblepas",
      "stats": "7 HP, 1 Armor, 16 STR, 9 DEX, 13 WIL, tail(d8)",
      "description": "- A monstrous creature with the body of a Cape buffalo, scales on its back, and the head of a wild boar. Its enormous head always points towards te ground.\n- **Paralyze**: Its stare turns a single target to stone. Moonlight reverses the effect."
    },
    {
      "name": "Acolyte",
      "stats": "4 HP, 1 Armor, 14 WIL, mace (d8) or ceremonial dagger (d6), Holy Symbol (_Ward_ once per day)",
      "description": "- Holy men & women bound to a particular deity.\n- Normally travel in groups of 4+."
    },
    {
      "name": "Ettin",
      "stats": "10 HP, 16 STR, 6 WIL, club (d10)",
      "description": "- Two-headed giant kin of low intelligence and aggressive behavior.   Lay underground and only act in darkness.\n- One head is always vigilant, preventing being surprised."
    },
    {
      "name": "Bone Construct",
      "stats": "8 HP, 2 Armor, 15 STR, 8 WIL, sharpened arms (d8, blast)",
      "description": "- 6\u2019 tall humanoid constructs made of bone and sorcery. Four-armed, with sharpened ends spread around their torso.\n- Mindless guardians, they simply detect and attack any living creature besides their creator.\n- Mundane attacks are I_impaired__ against the construct."
    },
    {
      "name": "Cyclops",
      "stats": "9 HP, 18 STR, 8 DEX, 6 WIL, club (d10)",
      "description": "- Giant humanoids with a single large eye centered on the face. Dwell in caves and herd small animals.\n- Slow-witted, can easily be fooled by other intelligent beings."
    },
    {
      "name": "The Black Dragon",
      "stats": "16 HP, 1 Armor, 13 STR, 18 DEX, 14 WIL, bite (d12), claws (d10+d8), _detachment_",
      "description": "- A giant amphibious reptile with glossy black scales. Dwells in swamps and other hostile flooded environments.\n- Extremely cruel and violent, makes use of the dark, difficult environment and its surprising agility to separate its victims and kill them one by one.\n- Any critical damage saves provoked by the dragon's bite automatically fail, due to its powerful acidic saliva."
    },
    {
      "name": "Blood Elk",
      "stats": "4 HP, 12 STR, 13 DEX, 5 WIL, horns (d8)",
      "description": "- Born from a wound caused by a greedy or selfesh act that has been left to fester.\n- Attacks & kills to eat meat, but gains no sustenance.\n- **Critical Damage**: gores its victims by ripping out their entrails."
    },
    {
      "name": "Root Witch",
      "stats": "8 HP, 9 STR, 16 DEX, 14 WIL, tuber-fingers (d6)",
      "description": "- Excellent tunneler that hides underground near water. Wiggles tiny fronds into the air as lures.\n- Above-ground, appears vaguely humanoid with the face of a rotted tree stump.\n- Will exchange rare minerals for a \u201cfresh corpse\u201d of any kind."
    },
    {
      "name": "Frost Giant",
      "stats": "14 HP, 2 Armor, 18 STR, 12 WIL, greataxe (d12+d10) or longbow (d12)",
      "description": "- 18\u2019 tall humanoids with blue-ish skin and pale hair. Wear furs and iron Armor.\n- Unharmed by cold and ice.\n- Excellent trackers, hunt accompanied by dire wolves."
    },
    {
      "name": "Sea Hag",
      "stats": "6 HP, 12 STR, 14 WIL, knife (d6)",
      "description": "- Ghostly looking, green-skinned hags that dwell in seaweed forests and warm shallow waters. Crave eating human flesh.\n- Highly resistant to magic effects.\n- **Hideous Gaze**: Everyone facing the Hag must save WIL or drop to 0 HP, each target can only be affected once per encounter."
    },
    {
      "name": "Ghost",
      "stats": "8 HP, 15 WIL, cold touch (d4)",
      "description": "- Incorporeal spirits of the restless dead. Avoids direct confrontation, instead it quietly posesses a target and acts through them when possible.\n- Immune to most forms of damage, only suscetible to magic and holy water. \n- **Posession**: One target must save WIL or be posessed, being controlled by the ghost until it's somehow driven off."
    },
    {
      "name": "Hydra",
      "stats": "18 HP, 2 Armor, 15 STR, 12 WIL, bite (d12, blast)",
      "description": "- A arge reptilian creature with nine serpentine heads. Can attack a number of targets equal to the number of heads.\n- Each time it takes damage to STR, loses one head. Severed heads regrow after one turn, recovering 1d4 HP for each head regrown.\n- Fire damage received is _enhanced_, and stops head regrowth for a turn."
    },
    {
      "name": "Ogre",
      "stats": "6 HP, 1 Armor, 16 STR, 8 DEX, 6 WIL, club (d10)",
      "description": "- 10' tall brute humanoids dressed in animal hides. Mostly live in caves.\n- Mostly antisocial, drive away any other beings from nearby its lair.\n- Easily impressed by shiny materials, carry sacks full of coins with them."
    },
    {
      "name": "Minotaur",
      "stats": "12 HP, 1 Armor, 16 STR, 8 WIL, axe (d10) or horns (d6+d6)",
      "description": "- A large, muscular humanoid with the head of a bull. Generally lair in a maze or dungeon, making the whole place it's territory.\n- Notably strong, is able to easily break stone, which it uses to alter the enviromment and separate its foes to kill then one by one.\n- If the minotaur suceeds in a Critical Damage save, it is driven into a bloodthirsty state, enhancing all its attacks and impairing all attacks agaisnt it. Only stops when killed or if it no longers sees any foe."
    },
    {
      "name": "Elemental, Fire",
      "stats": "16 HP, 12 DEX, 14 WIL, flare (d10, blast)",
      "description": "- Living columns of pure flame that burn everything in their path.\n- Highly vulnerable to being touched by water or rain.\n- Can scatter their flames, freely changing its form."
    },
    {
      "name": "Werewolf",
      "stats": "8 HP, 15 STR, 14 DEX, 6 WIL, claws (d6+d6) or bite (d8)",
      "description": "- Ferocious humanoid and wolf hybrids that hunt with abandon. Created by a curse being placed in a human or a wolf.\n- Its piercing howls can be heard for miles away, and are capable of calling regular wolves to its aid.\n- Mundane attacks are _impaired_ against the werewolf, but weapons made of silver are _enhanced_.\n- **Critical Damage**: The target becomes infected, transforming into a werewolf by the next full moon."
    },
    {
      "name": "Black Hag",
      "stats": "10 HP, 12 STR, 16 WIL, talons (d8+d6)",
      "description": "- Hideous, 8' tall creatures that reassemble female humans of old age with blue-black skin. Their talons and teeth are hard like iron.\n- Dwell in dead forests and swamps, crave eating human flesh.\n- Can cloak their true appearance with an illusory form, and can see through any illusion.\n- Avid magic users, each Hag carries 1d4 random spellbooks."
    },
    {
      "name": "The Red Dragon",
      "stats": "18 HP, 3 Armor, 18 STR, 12 DEX, 16 WIL, bite (d12), claws (d10+d8), _detachment_",
      "description": "- A gargantuan flaming creature, it's wingspan over a hundred feet. Arrogant and greedy, sees everything as its possession and everyone as its servant. Lairs within mountains with high volcanic activity.\n- Made of pure fire, is completely unharmed by any form of heat. Any cold vanishes within its presence.\n- **Fire Breath**: The dragon breathes a massive cone of pure flame dealing 12 damage (no roll) to all caught, the flame ignores and destroys any mundane armor. It needs a short rest before being able to do this again."
    },
    {
      "name": "Pixie",
      "stats": "6 HP, 3 STR, 18 DEX, 15 WIL, dagger (d6)",
      "description": "- Tiny humanoids with insectoid wings. Close relatives of fairies.\n- Extremely agile, it's impossible to simply attack one with a weapon.\n- Naturally invisible, can reveal itself if it chooses to.\n- Its mall wings only allow it to fly for short periods of time before needing to rest."
    },
    {
      "name": "Flail Snail",
      "stats": "4 HP, 2 Armor, 14 STR, 6 DEX, tentacles (d8+d8)",
      "description": "- Giant snails with heavy, club-like tentacles and a colorful shell.   Dwell underground.\n- Its colorful shell can deflect magic, possibly annulling it or reflecting it to its caster."
    },
    {
      "name": "Dryad",
      "stats": "4 HP, 14 WIL, unarmed (d4)",
      "description": "- Shy, peaceful tree spirits whose manifest in a beautiful female form.\n- Spiritually bound with a tree, may disappear by joining with the tree again. Can\u2019t go too far away from it and dies if the tree is destroyed.\n- Charm strangers that come near. Charmed creatures mindlessly walk into the tree, disappearing forever if not rescued quickly."
    },
    {
      "name": "Pegasus",
      "stats": "6 HP, 12 STR, 15 DEX, 15 WIL. hooves (d6+d6)",
      "description": "- A intelligent winged horse, wilful and proud. Seen as a symbol of beauty and nobility.\n- Have a rigid sense of morality and can feel if a person has broken it.\n- Will offer to help adventurers as a mount if it judges the person's cause as noble and just."
    },
    {
      "name": "Sphinx",
      "stats": "12 HP, 12 STR, 15 WIL, claws (d8+d6) or roar (save)",
      "description": "- Large monsters with bird wings, the body of a lion, and a human face. Collect puzzles, riddles, and obscure knowledge. Might pose riddles to those they meet, attacking and consuming any who cannot give the correct answer.\n- **Roar**: Anyone who hears the sphinx's roar must save WIL or flee in fear.\n- Carry 1d4 spellbooks with them, prefering magic related to knowledge or communication, but taking any."
    },
    {
      "name": "Cat, Panther",
      "stats": "4 HP, 11 STR, 14 DEX, 5 WIL, bite (d8), claws (d6+d6)",
      "description": "- Dark furred cats that live on forests and plains.\n- Hunts medium or small-sized animals, using their extreme speed and night vision to their advantage."
    },
    {
      "name": "Hooded Men",
      "stats": "12 HP, 9 STR, 12 DEX, 14 WIL, leystaff (d8), a Spellbook (Choose one: _Charm, Hypnotize, Push/Pull, Shield_)",
      "description": "- The Watchers of the Wood; a cult that derive their power from leylines, rune stones, and the like.\n- Critical damage: leech a part of the victim's soul (1d4 WIL damage)."
    },
    {
      "name": "Great White Shark",
      "stats": "8 HP. 14 STR, 14 DEX, 6 WIL, bite (d10+d10)",
      "description": "- 30' long aggressive fish of a grey coloration. Dwell deep salt water, and sometimes attack smaller boats.\n- Can detect the smell of blood from many miles away.\n- Once moves to attack, doesn't stop until death."
    },
    {
      "name": "Giant Piranha",
      "stats": "7 HP, 15 DEX, bite (d10)",
      "description": "- 5\u2019 long piranhas with colorful scales.   Live in rivers and attack anything in the water.\n- Dwell in groups and overwhelm victims by swarming them.\n- Once it smells blood, it will not stop attacking."
    },
    {
      "name": "Spider, Giant Aquatic",
      "stats": "4 HP, 12 DEX, bite (d6)",
      "description": "- 4\u2019 long spiders that dwell in large bodies of freshwater. Build air-filled nests in aquatic vegetation.\n- Are able to hold breath for long periods of time, and lurk just below the water's surface to surprise its victims.\n- **Critical Damage**: The poison paralyzes the victim (d8 DEX damage), the spider drags paralyzed victims to its lair to eat them."
    },
    {
      "name": "Wood Troll",
      "stats": "10 HP, 15 STR, 12 DEX, 7 WIL, claws and bite (d8+d8, blast)",
      "description": "- Large humanoid beings with alongated arms. Live in forests, sharing a deep connection with the vegetation around it.\n- As an action the troll can eat a handful of moss to fully recover its HP.\n- **Critical Damage**: Moss and twigs begin growing out of target's wounds."
    },
    {
      "name": "The White Dragon",
      "stats": "16 HP, 1 Armor, 16 STR, 16 DEX, 12 WIL, bite (d12), claws (d8+d8), _detachment_",
      "description": "- A massive winged creature of frost, it appears as if the winter itself coalesced into life. Wanders in the coldest regions, along with harsh snowstorms.\n- Extremely ferocious, is at the same time a clever hunter and a bestial predator. Tracks everything that lives, as if it was trying to satiate a endless hunger.\n- It's always surrounded by a storm of ice and cold wind, dealing d6 blast damage every round to everything nearby, in addition to its normal attacks."
    },
    {
      "name": "Hobgoblin",
      "stats": "6 HP, 2 Armor, 14 STR, 8 DEX, mace (d8)",
      "description": "- Large and burly relatives of goblins. Dwell in underground fortresses, but frequently march in aboveground campaigns.\n- Strongly lawful and militarized culture, follow orders without question.\n- Automatically succeed in Morale Saves if a commander is present. \n- Trained to fight together, damage dealt is _enhanced_ if an ally is also engaged with the same enemy."
    },
    {
      "name": "Bandit",
      "stats": "4 HP, 11 STR, 14 DEX, 12 WIL, dagger (d6)",
      "description": "- Thieves who value wealth over all else.\n- Use disguises, stealth, and trickery to surprise victims."
    },
    {
      "name": "Mimic",
      "stats": "9 HP, 2 Armor, 13 STR, 12 WIL, bite (d12)",
      "description": "- Monstrous shape-shifters that take on the form of inanimate objects made of wood and stone. Found only underground.\n- Remain motionless (generally in the form of chests or doors), devouring anything that touches it.\n- The mimic's saliva is extremely sticky, taking great strength to remove something from its mouth once glued."
    },
    {
      "name": "Skeleton",
      "stats": "5 HP, 1 Armor, 13 DEX, rusty sword (d6)",
      "description": "- If a skeleton is killed and its bones are not scattered, it reforms."
    },
    {
      "name": "Djinn",
      "stats": "10 HP, 1 Armor, 15 DEX, fists (d10+d8)",
      "description": "- Tall, cloudy humanoids from the plane of air. Highly intelligent, use invisibility and illusions to trick other beings.\n- May transform into a whirlwind, sweeping everything on its path.\n- Capable of granting a wish per person, the result always is distorted based on the wording of the wish."
    },
    {
      "name": "Cloud Giant",
      "stats": "14 HP, 1 Armor, 16 STR, 12 DEX, 18 WIL, mace (d10+d10), __detachment__",
      "description": "- 20\u2019 tall humanoids with hair and skin in tones of grey and white. House in castles built atop the highest mountains or floating in cloud banks.\n- Cannot be surprised due to its keen sight and smell.\n- Strong winds constantly surround it, Impairing projectile attacks."
    },
    {
      "name": "Iron Construct",
      "stats": "18 HP, 3 Armor, 18 STR, 8 WIL, sword (d12+d12)",
      "description": "- 12\u2019 humanoid statues forged of metal, fire, and magic. Wield massive swords of iron.\n- Immune to mundane attacks, electricity, and cold. Fire damage is absorbed, and heals any lost STR.\n- **Poison Gas**: Releases a cloud of poisonous gas (d4 STR damage to all nearby). Anyone breathing the gas must also pass a STR save or die of toxic death."
    },
    {
      "name": "Bronze Construct",
      "stats": "15 HP, 3 Armor, 18 STR, 6 DEX, fists (d10+d10), _detachment_",
      "description": "- Towering humanoid constructs made of pure bronze. Resemble old men with long beards and hair, and emanate a strong heat.\n- Immune to fire and heat. Mundane attacks are __impaired__.\n- If it takes **Critical Damage** from bladed weapons it spurts a burning liquid, doing d12 _blast_ damage."
    },
    {
      "name": "Giant Rockfish",
      "stats": "5 HP, 1 Armor, 12 STR, spine (d6)",
      "description": "- Spiny fish with rock-like scales. Live in saltwater. Normally passive, but attacks if disturbed.\n- Camouflages in rocks and coral formations.\n- **Critical Damage**: The spines release a highly lethal venom (d8 extra STR damage)."
    },
    {
      "name": "Ifrit",
      "stats": "10 HP, 15 STR, 14 WIL, flaming sword (d10+d8, bulky)",
      "description": "- Clever, treacherous beings from the elemental plane of fire. Manifest as huge men with terrifying faces and an aura of heat and smoke.\n- Might be summoned by powerful magic and ordered to complete tasks, but will subvert commands while following them to the letter.\n- **Pillar of Flame**: The Ifrit transforms into a tall, 30' wide collum of flame, torching everything touched for d12 damage. It needs a short rest before being able to do it again."
    },
    {
      "name": "Root Goblin",
      "stats": "4 HP, 8 STR, 14 DEX, 8 WIL, spear (d6)",
      "description": "- Avoid combat unless they have the advantage (such as greater numbers).\n- Guard their stolen goods to the death.\n- Prize Spellbooks; willing to trade."
    },
    {
      "name": "Basilisk",
      "stats": "10 HP, 1 Armor, 12 STR, 13 DEX, 13 WIL, bite (d10)",
      "description": "- Long, serpentine lizards that nest deep below the earth or in brambles just underfoot. \n- **Gaze**: A PC meeting the Basilisk's gaze must make a WIL save or turn instantly to stone. Its reflection is harmless.\n- Fighting a **Basilisk** without meeting its gaze is difficult (direct attacks are __impaired__)."
    },
    {
      "name": "Owl Bear",
      "stats": "9 HP, 16 STR, beak (d10) or claws (d8+d6)",
      "description": "- Huge, carnivorous bear-like creatures with the face of an owl. Found in dense forests.\n- Excellent trackers, can detect even the slighest signs of prey.\n- Highly territorial, attack anything that comes too close.\n- **Critical Damage**: Maul the target, crushing armor and tearing a limb apart."
    },
    {
      "name": "Cobblehounds",
      "stats": "12 HP, 2 Armor, 14 STR, 1 DEX, 8 WIL, bite (d10)",
      "description": "- Immobile constructs typically used as guardians to great tombs or artifacts.\n- Unaffected by mundane persuasion techniques, but does love a good bone."
    },
    {
      "name": "Roc",
      "stats": "18 HP, 18 STR, 14 DEX, 12 WIL, claws (d8+d8, blast) or bite (d10+d10), _detachment_",
      "description": "- Gargantuan birds of prey that nest atop the highest peaks and attack anything that approaches their nests. Considered myths by most people.\n- Surprise victims by swooping down from above.\n- Legend says that if someone steals a egg and nurses until it hatches, the bird will whisper powerful knowledge to the caretaker before flying away."
    },
    {
      "name": "Hellhound",
      "stats": "8 HP, 12 STR, 15 DEX, bite (d8+d6) or fire breath (d8)",
      "description": "- Monstrous, intelligent dogs with the size of a large wolf. Dwell near volcanoes and sometimes accompany other fire-related creatures.\n- Immune to fire and heat, its insides are hot enough to melt iron if it is swallowed.\n- Don't rely on sight to find its foes, due to its keen sense of smell."
    },
    {
      "name": "Deep One",
      "stats": "6 HP, 12 WIL, spear (d8)",
      "description": "- Amphibious, fish-like humanoids with webbed fingers. Live in deep seas and are able to see in the darkness.\n- Highly resistant to magical effects.\n- Occasionally surface to trade with coastal settlements, frequently requesting union between one of them and a human."
    },
    {
      "name": "Couatl",
      "stats": "9 HP, 6 STR, 12 DEX, 15 WIL, bite (d6)",
      "description": "- Long, feathered serpents with colorful wings. Live in hot jungles, and are considered divine by some civilizations.\n- Highly intelligent and magical, they are capable of speaking any language.\n- Can shapechange into the form of a person or small animal."
    },
    {
      "name": "Elemental, Water",
      "stats": "12 HP, 2 Armor, 15 STR, blow (d8)",
      "description": "- Huge waves of flowing water.\n- Must stay near a body of water.\n- Envelop victims inside their forms to drown then."
    },
    {
      "name": "Lamia",
      "stats": "9 HP, 14 STR, 14 WIL, claws and bite (d8+d6)",
      "description": "- Centaur-like monsters with the head and upper body of a woman and the lower body of a scaled beast. Prey on humanoids, drinking their blood and eating their flesh.\n- Can disguise their true form with illusions, appearing as a human woman.\n- Critical Damage: The lamia saps the victim's wisdom (d6 WIL damage). A victim who reaches 0 WIL this way mindlessly obeys the lamia's commands."
    }
]